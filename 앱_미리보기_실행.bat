@echo off
chcp 65001 > nul
echo [건강노트 모바일 앱] 실행 중...
start "" "%~dp0index.html"
exit
