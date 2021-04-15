FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git
RUN mkdir -p /www/apps/home

WORKDIR /www/apps/home

COPY ./apps/home/package.json ./apps/home/package-lock.json ./apps/home/.npmrc /www/apps/home/

RUN npm ci

COPY ./.git /www/.git

COPY ./apps/home /www/apps/home/

RUN npm run build

RUN npm prune --production

RUN chown -R 1000:1000 /www/apps/home
USER 1000

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
