FROM node:10

RUN apt-get update

ARG APPDIR

ADD . ${APPDIR}
WORKDIR ${APPDIR}

RUN npm install -q --production

EXPOSE 9000

CMD ["node", "server.js"]
