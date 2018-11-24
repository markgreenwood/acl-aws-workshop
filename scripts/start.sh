#!/usr/bin/env bash

source version.sh

INDEX=${1:-0}
HOSTPORT=${2:-9000}
CONTAINER_NAME="$NAME-$INDEX"
CIDFILE="/tmp/container.$CONTAINER_NAME.id"

echo "Starting $CONTAINER_NAME ($CIDFILE)..."

docker run -d \
    --restart=always \
    -e "NODE_ENV=$NODE_ENV" \
    --name $CONTAINER_NAME \
    --cidfile=/tmp/container.$CONTAINER_NAME.id \
    -v /tmp/container.$CONTAINER_NAME.id:/tmp/container.id \
    -p $HOSTPORT:9000 \
    --log-driver=json-file \
    --log-opt max-size=5m \
    --log-opt max-file=2 \
    $NAME:$VERSION
