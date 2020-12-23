FROM node:erbium-alpine

ENV PORT=8080

WORKDIR /www
COPY .git ./.git
COPY .vscode ./.vscode
COPY ./apps/checkout ./apps/checkout

WORKDIR /www/apps/checkout
RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  npm install &&\
  npm run build

WORKDIR /www
RUN \
  chown -R 1000:1000 .

WORKDIR /www/apps/checkout

EXPOSE $PORT

USER 1000

CMD ["./node_modules/.bin/next", "start", "-p", $PORT]
