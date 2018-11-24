#!/usr/bin/env bash
source version.sh

INDEX=${1:-0}
CONTAINER_NAME="$NAME-$INDEX"
CIDFILE="/tmp/container.$CONTAINER_NAME.id"

echo "Stopping $CONTAINER_NAME..."

docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

echo "Removing $CIDFILE..."

rm $CIDFILE
