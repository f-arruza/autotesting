#!/usr/bin/env bash
set -xeuo pipefail

chmod +x ./gradlew

./gradlew clean
./gradlew assembleRelease
