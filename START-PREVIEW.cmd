@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js LTS from https://nodejs.org/ then reopen this file.
  pause
  exit /b 1
)
node scripts\preview-local.mjs
if errorlevel 1 (
  echo Preview could not start. Read the message above and keep it for support.
  pause
  exit /b 1
)
