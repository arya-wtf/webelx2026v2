# start-codex.ps1
# Jalankan script ini untuk start Codex dengan API key dari .env
# Cara pakai: .\start-codex.ps1

$envFile = Join-Path $PSScriptRoot ".env"

if (!(Test-Path $envFile)) {
    Write-Error "File .env tidak ditemukan di $PSScriptRoot"
    exit 1
}

# Baca dan set semua env var dari .env
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and !$line.StartsWith("#")) {
        $parts = $line -split "=", 2
        if ($parts.Length -eq 2) {
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

Write-Host "✅ API key loaded dari .env" -ForegroundColor Green
Write-Host "🚀 Menjalankan Codex..." -ForegroundColor Cyan

codex
