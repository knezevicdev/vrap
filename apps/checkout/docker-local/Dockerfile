FROM node:fermium-alpine

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

ARG PORT=8080
ENV PORT=$PORT
EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
