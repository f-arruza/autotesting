#!/bin/sh

# Generar mutantes
export MAIN_CLASS="it.feio.android.omninotes"
docker-compose -f docker-compose.mobile.yml run --rm mdroidplus

# Se crea enlace simbólico a carpeta de Set de Pruebas de Calabash
ln -s $(pwd $PATH)/src/calabash/features/ $(pwd $PATH)

for folder in $(pwd $PATH)/src/mdroidplus/mutants/*
do
  if [ -d $folder ]
  then
      FOLDER_NAME=`basename $folder`
      mkdir -p $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/
      mkdir -p $(pwd $PATH)/src/results/screenshots/calabash/$FOLDER_NAME/

      # Se crea enlace simbólico a la carpeta del mutante X
      ln -s $folder $(pwd $PATH)/src/android-builder

      # Se compila y genera el APK del mutante X
      docker-compose -f docker-compose.mobile.yml run --rm android-builder

      find $(pwd $PATH)/src/android-builder/ -type f -name '*.apk' -exec cp {} $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/ \;

      # Firmar APK
      find $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/ -type f -name '*.apk' -exec calabash-android resign {} \;

      # Ejecutar Set de pruebas BDT
      export SCREENSHOT_PATH="$(pwd $PATH)/src/results/screenshots/calabash/$FOLDER_NAME/"
      find $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/ -type f -name '*.apk' -exec calabash-android run {} --format html --out $(pwd $PATH)/src/results/screenshots/calabash/$FOLDER_NAME/output.html \;

      # Se elimina enlace simbólico a la carpeta del mutante X
      rm $(pwd $PATH)/src/android-builder
      echo $FOLDER_NAME
  fi
done

# Se elimina enlace simbólico a carpeta de Set de Pruebas de Calabash
rm $(pwd $PATH)/features
