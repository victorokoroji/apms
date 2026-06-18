# Migrate UI from src/app/(secured)/ui -> src/components/ui
# For each STUB file (one that re-exports from (secured)/ui), replace it with the real source.
# Then copy any (secured)/ui file that doesn't exist in components/ui (e.g. dialog.tsx).

$source = 'src/app/(secured)/ui'
$dest = 'src/components/ui'

Get-ChildItem -Path $source -Filter *.tsx | ForEach-Object {
  $srcFile = $_.FullName
  $name = $_.Name
  $dstFile = Join-Path $dest $name

  if (Test-Path $dstFile) {
    $content = Get-Content $dstFile -Raw
    if ($content -match 'app/\(secured\)/ui') {
      Copy-Item -LiteralPath $srcFile -Destination $dstFile -Force
      Write-Output ("REPLACED STUB: " + $name)
    } else {
      Write-Output ("KEEP REAL:    " + $name)
    }
  } else {
    Copy-Item -LiteralPath $srcFile -Destination $dstFile -Force
    Write-Output ("COPIED NEW:   " + $name)
  }
}
