# syntax = docker/dockerfile:experimental
# This enabled the feature to load the secrets in the RUN step

FROM node:18-alpine
# Using local images to build from removes the dependency on docker hub - but the images recent releases by the same name

RUN apk update && apk --no-cache add git
# add git to the image for NextJS build

RUN mkdir -p /run/secrets && touch /run/secrets/auto-devops-build-secrets
# this step creates the file that will be overwriten by the secrets when building Gitlab allowing local builds to run

ARG CI_JOB_TOKEN
# when running locally, you will need to pass in your token to the build - see note 1

ENV CI_JOB_TOKEN=${CI_JOB_TOKEN}
# the token is mapped to the build environment

RUN mkdir /app
# create a directory to hold the application

COPY . /app
# copy everything over - see note 2

WORKDIR /app
# change directory for the build

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm ci
# load the secrets from Gitlab, source the secrets file, then install defined versions of dependnencies

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm run build
# load and source again, build the deployable artifacts

RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && npm prune
# load and source again, prune to remove all of the dev dependencies

USER 1000
# change to another user

RUN git config --global --add safe.directory /app

CMD ["./node_modules/.bin/next","start","-p","8080"]
# specificlally run the next command with no shell - see note 3
