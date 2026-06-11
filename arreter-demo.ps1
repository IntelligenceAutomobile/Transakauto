# ============================================================
#  TransakAuto — Arrêt de secours
#  À lancer si tu as fermé la fenêtre de partage avec la croix
#  et que le lien / le serveur tournent encore en arrière-plan.
# ============================================================

$port = 3100

Get-Process cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

$pids = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique
foreach ($procId in $pids) { Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue }

Write-Host "`nDemo arretee. Le lien ne fonctionne plus.`n" -ForegroundColor Green
Start-Sleep -Seconds 2
