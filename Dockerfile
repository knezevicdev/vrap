# syntax = docker/dockerfile:experimental

FROM 743956360704.dkr.ecr.us-west-2.amazonaws.com/base/node:14-alpine

RUN apk --no-cache add git

RUN mkdir -p /run/secrets && touch /run/secrets/auto-devops-build-secrets

ARG CI_JOB_TOKEN
 
ENV CI_JOB_TOKEN=${CI_JOB_TOKEN}

RUN mkdir /app 

COPY . /app

WORKDIR /app

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm ci

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm run build

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm prune

USER 1000

CMD ["./node_modules/.bin/next","start","-p","8080"]
