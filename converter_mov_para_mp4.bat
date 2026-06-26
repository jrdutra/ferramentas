@echo off
setlocal EnableExtensions EnableDelayedExpansion

rem Converts every .mov file in a folder to compressed Full HD .mp4 files.
rem The output keeps the same base name as the input.
rem Video is re-encoded to H.264 at up to 1920x1080.
rem Audio is copied without re-encoding.
rem
rem Usage:
rem   converter_mov_para_mp4.bat
rem   converter_mov_para_mp4.bat "C:\path\to\videos"

set "WIDTH=1920"
set "HEIGHT=1080"
set "CRF=23"
set "PRESET=medium"

where ffmpeg >NUL 2>NUL
if errorlevel 1 (
  echo ERROR: ffmpeg was not found in PATH.
  exit /b 1
)

if "%~1"=="" (
  set "VIDEO_DIR=%CD%"
) else (
  set "VIDEO_DIR=%~f1"
)

if not exist "%VIDEO_DIR%\" (
  echo ERROR: folder not found: "%VIDEO_DIR%"
  exit /b 1
)

pushd "%VIDEO_DIR%" >NUL
if errorlevel 1 (
  echo ERROR: could not open folder: "%VIDEO_DIR%"
  exit /b 1
)

if not exist "*.mov" (
  echo No .mov files found in "%CD%".
  popd >NUL
  exit /b 0
)

set /a TOTAL=0
set /a DONE=0
set /a FAILED=0
set "VF=scale=%WIDTH%:%HEIGHT%:force_original_aspect_ratio=decrease"

echo Folder: "%CD%"
echo Video: H.264, Full HD max %WIDTH%x%HEIGHT%, CRF %CRF%, preset %PRESET%
echo Audio: copied without re-encoding
echo.

for %%F in (*.mov) do (
  set /a TOTAL+=1
  echo ------------------------------------------------------------
  echo Input:  "%%~fF"
  echo Output: "%%~dpnF.mp4"

  ffmpeg -y -i "%%~fF" -map 0:v:0 -map 0:a? -map_metadata 0 -vf "%VF%" -c:v libx264 -preset %PRESET% -crf %CRF% -pix_fmt yuv420p -c:a copy -movflags +faststart "%%~dpnF.mp4"

  if errorlevel 1 (
    echo ERROR: failed to convert "%%~nxF"
    echo If the audio codec is not accepted by MP4, change -c:a copy to -c:a aac -b:a 320k.
    set /a FAILED+=1
  ) else (
    echo Done: "%%~dpnF.mp4"
    set /a DONE+=1
  )

  echo.
)

popd >NUL

echo Finished. Converted: %DONE%  Failed: %FAILED%  Total: %TOTAL%
if %FAILED% GTR 0 exit /b 1
exit /b 0
