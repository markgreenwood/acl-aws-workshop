#!/usr/bin/env bash

source version.sh

docker build --no-cache --build-arg APPDIR=/var/sites/$NAME -t $NAME:$VERSION ..
