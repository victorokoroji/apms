Get-ChildItem -Path 'src/components/ui' -Filter *.tsx | ForEach-Object {
  $content = Get-Content $_.FullName -Raw
  if ($content -match 'app/\(secured\)/ui') {
    Write-Output ('STUB: ' + $_.Name)
  } else {
    Write-Output ('REAL: ' + $_.Name)
  }
}
