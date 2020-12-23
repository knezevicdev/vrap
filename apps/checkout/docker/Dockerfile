FROM node:erbium-alpine

ARG CI_JOB_TOKEN

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

EXPOSE 8080

USER 1000

CMD ["./node_modules/.bin/next", "--port", "8080"]
