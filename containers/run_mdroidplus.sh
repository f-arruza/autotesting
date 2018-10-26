#!/bin/sh

# Generar mutantes
# docker-compose run --rm mdroidplus

for folder in $(pwd $PATH)/src/mdroidplus/mutants/*
do
  if [ -d $folder ]
  then
      FOLDER_NAME=`basename $folder`
      mkdir -p $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/

      # Se crea enlace simbólico a la carpeta del mutante X
      ln -s $folder $(pwd $PATH)/src/android-builder

      # Se compila y genera el APK del mutante X
      # docker-compose run --rm android-builder

      find $(pwd $PATH)/src/android-builder/ -type f -name '*.apk' -exec cp {} $(pwd $PATH)/src/mdroidplus/apks/$FOLDER_NAME/ \;

      # Se elimina enlace simbólico a la carpeta del mutante X
      rm $(pwd $PATH)/src/android-builder
      echo $FOLDER_NAME
  fi
done
