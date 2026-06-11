# ============================================================
#  TransakAuto — Partage de la démo
#  Démarre le site en local et crée un lien public temporaire
#  (Cloudflare Tunnel). Le lien fonctionne tant que cette
#  fenêtre reste ouverte.
# ============================================================

$ErrorActionPreference = "Stop"
$projet = $PSScriptRoot
Set-Location $projet
$port = 3100

# --- Localiser cloudflared -----------------------------------
$cloudflared = "C:\Program Files (x86)\cloudflared\cloudflared.exe"
if (-not (Test-Path $cloudflared)) {
  $cmd = Get-Command cloudflared -ErrorAction SilentlyContinue
  if ($cmd) { $cloudflared = $cmd.Source }
}
if (-not (Test-Path $cloudflared)) {
  Write-Host "`n  cloudflared est introuvable." -ForegroundColor Yellow
  Write-Host "  Installe-le une fois pour toutes avec cette commande :`n"
  Write-Host "    winget install Cloudflare.cloudflared`n"
  Read-Host "Appuie sur Entrée pour fermer"
  exit 1
}

$script:server = $null
$script:tunnel = $null

function Stop-All {
  if ($script:tunnel) { taskkill /T /F /PID $script:tunnel.Id 2>$null | Out-Null }
  if ($script:server) { taskkill /T /F /PID $script:server.Id 2>$null | Out-Null }
}

try {
  Write-Host "`n=================================================="  -ForegroundColor Magenta
  Write-Host "   TransakAuto - Partage de la demo"                  -ForegroundColor Magenta
  Write-Host "==================================================`n"  -ForegroundColor Magenta

  Write-Host "[1/3] Preparation du site (peut prendre ~1 minute)..." -ForegroundColor Cyan
  npm run build *>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "La preparation du site a echoue (build)." }

  Write-Host "[2/3] Demarrage du serveur local..." -ForegroundColor Cyan
  $script:server = Start-Process -FilePath "npm.cmd" `
    -ArgumentList "run","start","--","-p","$port" `
    -WindowStyle Hidden -PassThru

  $ready = $false
  for ($i = 0; $i -lt 60; $i++) {
    try {
      Invoke-WebRequest "http://localhost:$port" -UseBasicParsing -TimeoutSec 3 | Out-Null
      $ready = $true; break
    } catch { Start-Sleep -Milliseconds 700 }
  }
  if (-not $ready) { throw "Le serveur local n'a pas demarre." }

  Write-Host "[3/3] Creation du lien public..." -ForegroundColor Cyan
  $log = Join-Path $env:TEMP "transak-tunnel.log"
  Remove-Item $log -ErrorAction SilentlyContinue
  $script:tunnel = Start-Process -FilePath $cloudflared `
    -ArgumentList "tunnel","--url","http://localhost:$port","--logfile",$log `
    -WindowStyle Hidden -PassThru

  $url = $null
  for ($i = 0; $i -lt 60; $i++) {
    if (Test-Path $log) {
      $m = Select-String -Path $log -Pattern "https://[a-z0-9-]+\.trycloudflare\.com" -ErrorAction SilentlyContinue | Select-Object -First 1
      if ($m) { $url = $m.Matches[0].Value; break }
    }
    Start-Sleep -Milliseconds 700
  }
  if (-not $url) { throw "Le lien public n'a pas pu etre cree." }

  # Laisser le temps au lien de devenir accessible (propagation DNS)
  Write-Host "      Verification de l'acces au lien..." -ForegroundColor Cyan
  for ($i = 0; $i -lt 20; $i++) {
    try { Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 5 | Out-Null; break }
    catch { Start-Sleep -Milliseconds 1000 }
  }

  Set-Clipboard -Value $url
  Write-Host "`n=================================================="  -ForegroundColor Green
  Write-Host "   LIEN A PARTAGER (deja copie dans le presse-papier) :" -ForegroundColor Green
  Write-Host ""
  Write-Host "   $url" -ForegroundColor White
  Write-Host ""
  Write-Host "==================================================`n"  -ForegroundColor Green
  Write-Host "Laisse cette fenetre OUVERTE pendant la demo." -ForegroundColor Yellow
  Write-Host "Le lien cesse de fonctionner des que tu la fermes.`n"
  Read-Host "Appuie sur Entree pour ARRETER et fermer le lien"
}
catch {
  Write-Host "`nErreur : $($_.Exception.Message)`n" -ForegroundColor Red
  Read-Host "Appuie sur Entree pour fermer"
}
finally {
  Write-Host "Arret en cours..." -ForegroundColor Cyan
  Stop-All
}
