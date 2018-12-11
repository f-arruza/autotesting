#!/bin/sh

PLAN_ID=2
echo 'Iniciando emulador...'
/Users/farruza/Library/Android/sdk/tools/emulator -avd Nexus_5_API_26_Oreo -netdelay none -netspeed full &
sleep 10

# Se crea enlace simbólico a carpeta de Set de Pruebas de Calabash
ln -s $(pwd $PATH)/src/calabash/features/ $(pwd $PATH)

# Firmar APK
find $(pwd $PATH)/apk/ -type f -name '*.apk' -exec calabash-android resign {} \;

# Ejecutar Set de pruebas BDT
export SCREENSHOT_PATH="$(pwd $PATH)/src/results/screenshots/${PLAN_ID}/calabash/"
mkdir -p ${SCREENSHOT_PATH}
find $(pwd $PATH)/apk/ -type f -name '*.apk' -exec calabash-android run {} --format html --out ${SCREENSHOT_PATH}output.html \;
