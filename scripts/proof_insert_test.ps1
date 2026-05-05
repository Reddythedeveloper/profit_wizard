$url='https://vgojdzbdwegwknzikqvh.supabase.co/rest/v1/jobs'
$body=@{
  service_type='Automated Test'
  invoiced_amount=123.45
  date_completed=(Get-Date -Format yyyy-MM-dd)
  customer_note='Inserted by automated Phase 1 test'
} | ConvertTo-Json -Depth 5

$headers = @{
  'apikey' = 'sb_publishable_1OpvCViKd7O94sJ5N8BfzA_pJMJmzRb'
  'Authorization' = 'Bearer sb_publishable_1OpvCViKd7O94sJ5N8BfzA_pJMJmzRb'
  'Prefer' = 'return=representation'
}

try {
  $resp = Invoke-RestMethod -Method Post -Uri $url -Headers $headers -Body $body -ContentType 'application/json'
  Write-Output "Insert response:"
  $resp | ConvertTo-Json -Depth 5 | Write-Output
} catch {
  Write-Output "Error during insert: $($_.Exception.Message)"
  if ($_.Exception.Response) { $_.Exception.Response.GetResponseStream() | ForEach-Object { $_ | Out-String } | Write-Output }
  exit 1
}

try {
  $queryUrl = "$url?select=*&order=created_at.desc&limit=5"
  $list = Invoke-RestMethod -Method Get -Uri $queryUrl -Headers $headers
  Write-Output "Latest jobs:"
  $list | ConvertTo-Json -Depth 5 | Write-Output
} catch {
  Write-Output "Error during fetch: $($_.Exception.Message)"
  exit 1
}
