@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0set-lock.ps1" -Lock false
