@echo off
cd /d "%~dp0"
echo.
echo  📡 Trend Radar — http://localhost:8080/dashboard/
echo  Press Ctrl+C to stop.
echo.
start http://localhost:8080/dashboard/
python -m http.server 8080
