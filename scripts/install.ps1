$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot '..\skills\scrooge'
$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE '.codex' }
$skillsDirectory = Join-Path $codexHome 'skills'

if (-not (Test-Path -LiteralPath $source -PathType Container)) {
  throw "Scrooge skill not found: $source"
}

New-Item -ItemType Directory -Path $skillsDirectory -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $skillsDirectory -Recurse -Force
Write-Output "Installed Scrooge to $(Join-Path $skillsDirectory 'scrooge')"
