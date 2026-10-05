@echo off
title FoodPao - Create New Backup Point
color 0B
echo ========================================================
echo       FoodPao - Save New Checkpoint (Backup)
echo ========================================================
echo.
echo  Enter a note describing your changes (e.g. "Changed button color"):
echo.
set /p note="Note: "
if "%note%"=="" set note=Manual backup checkpoint

git add .
git commit -m "%note%"

echo.
echo ========================================================
echo  [SUCCESS] New checkpoint saved to Git successfully!
echo ========================================================
echo.
pause
