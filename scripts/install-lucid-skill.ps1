$ErrorActionPreference = 'Stop'

$source = Join-Path (Split-Path -Parent $PSScriptRoot) 'skills\lucid'
$profile = [Environment]::GetFolderPath('UserProfile')
$destination = Join-Path $profile '.agents\skills'

if (-not (Test-Path -LiteralPath (Join-Path $source 'SKILL.md') -PathType Leaf)) {
    throw "Lucid skill not found: $source"
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
Write-Output "Installed: $(Join-Path $destination 'lucid')"
