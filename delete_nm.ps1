$targets = @(
    "C:\my.ai.web\lecture1\men-fashion\node_modules",
    "C:\my.ai.web\lecture1\my-community\node_modules",
    "C:\my.ai.web\lecture1\my-portfolio\node_modules",
    "C:\my.ai.web\lecture1\ui_test\node_modules",
    "C:\my.ai.web\lecture1\_template_settings\node_modules"
)

foreach ($target in $targets) {
    if (Test-Path $target) {
        Write-Host "삭제 시작: $target"
        Get-ChildItem -Path $target -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
            $_.Attributes = 'Normal'
        }
        Remove-Item -Path $target -Recurse -Force -ErrorAction SilentlyContinue
        if (Test-Path $target) {
            Write-Host "경고: 완전 삭제 실패 - $target"
        } else {
            Write-Host "완료: $target"
        }
    }
}
Write-Host "스크립트 완료"
