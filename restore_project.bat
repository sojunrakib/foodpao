@echo off
title FoodPao - 1-Click Restore Tool
color 0A
echo ========================================================
echo          FoodPao Project - 1-Click Recovery Tool
echo ========================================================
echo.
echo  This tool will restore all FoodPao files (HTML, CSS, JS, Images)
echo  back to the clean, stable saved checkpoint.
echo.
echo  Any corrupted, reverted, or broken edits will be fixed instantly!
echo.
set /p confirm="Do you want to proceed with restore? (Y/N): "
if /i "%confirm%" neq "Y" (
    echo.
    echo [INFO] Operation cancelled.
    pause
    exit /b
)

echo.
echo Restoring project files...
git checkout -f master
git restore .
git clean -fd

echo.
echo ========================================================
echo  [SUCCESS] Project restored to the stable state!
echo ========================================================
echo.
echo You can now refresh your browser (Ctrl + F5) or Live Server.
echo.
pause
