@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js LTS from https://nodejs.org/ then reopen this file.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js LTS, then reopen this file.
  pause
  exit /b 1
)
echo GVK Decor - private preview on this computer only.
echo No files will be uploaded. No website will be published.
if not exist "node_modules\.package-lock.json" (
  echo Installing dependencies. Internet access is required for this step.
  call npm ci
  if errorlevel 1 (
    echo Installation failed. Copy the error shown above for help.
    pause
    exit /b 1
  )
)
echo When Vite says ready, open Chrome at http://127.0.0.1:5173
echo Keep this window open. Press Ctrl+C here to stop the preview.
call npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
if errorlevel 1 (
  echo Preview did not start. Check the message above. Port 5173 may already be in use.
  pause
  exit /b 1
)
