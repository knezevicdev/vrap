FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git

RUN mkdir -p /www/apps/listing && chown -R 1000:1000 /www/apps/listing

WORKDIR /www/apps/listing

USER 1000

COPY ./apps/listing/package.json ./apps/listing/package-lock.json ./apps/listing/.npmrc /www/apps/listing/

RUN npm ci

COPY ./.git /www/.git

COPY ./apps/listing /www/apps/listing/

RUN npm run build

RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT