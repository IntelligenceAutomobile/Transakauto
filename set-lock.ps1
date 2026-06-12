# ============================================================
#  TransakAuto — bascule le verrou du site puis redéploie.
#  Appelé par « Cacher le site.cmd » / « Afficher le site.cmd ».
#  Argument : true (cacher) ou false (afficher).
# ============================================================
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("true", "false")]
  [string]$Lock
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root
$file = Join-Path $root "src\lib\site-lock.ts"

$action = if ($Lock -eq "true") { "CACHER le site (login requis)" } else { "AFFICHER le site (public)" }
Write-Host "`n==================================================" -ForegroundColor Magenta
Write-Host "   $action" -ForegroundColor Magenta
Write-Host "==================================================`n" -ForegroundColor Magenta

# 1. Modifier la valeur SITE_LOCKED
$content = [System.IO.File]::ReadAllText($file)
$updated = [System.Text.RegularExpressions.Regex]::Replace(
  $content, 'SITE_LOCKED\s*=\s*(true|false)', "SITE_LOCKED = $Lock"
)
[System.IO.File]::WriteAllText($file, $updated)

# 2. Commit + push (déclenche le redéploiement Vercel)
git add "src/lib/site-lock.ts" | Out-Null
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "Le site est deja dans cet etat, rien a changer.`n" -ForegroundColor Yellow
  Read-Host "Appuie sur Entree pour fermer"
  exit 0
}

git commit -m "site: lock=$Lock" | Out-Null
Write-Host "Envoi vers GitHub..." -ForegroundColor Cyan
git push
if ($LASTEXITCODE -ne 0) {
  Write-Host "`nEchec de l'envoi (git push). Verifie ta connexion / tes acces GitHub.`n" -ForegroundColor Red
  Read-Host "Appuie sur Entree pour fermer"
  exit 1
}

Write-Host "`n--------------------------------------------------" -ForegroundColor Green
if ($Lock -eq "true") {
  Write-Host "  Site CACHE. Il faudra se connecter pour le voir." -ForegroundColor Green
} else {
  Write-Host "  Site VISIBLE par tout le monde." -ForegroundColor Green
}
Write-Host "  Vercel redeploie : effectif dans ~1-2 minutes." -ForegroundColor Green
Write-Host "--------------------------------------------------`n" -ForegroundColor Green
Start-Sleep -Seconds 3
