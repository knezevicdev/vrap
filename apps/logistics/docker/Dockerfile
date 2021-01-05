FROM node:erbium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git
RUN mkdir -p /www/apps/logistics && chown -R 1000:1000 /www/apps/logistics

WORKDIR /www/apps/logistics

USER 1000

COPY ./apps/logistics/package.json ./apps/logistics/package-lock.json ./apps/logistics/.npmrc /www/apps/logistics/

RUN npm ci

COPY ./.git /www/.git
COPY ./apps/logistics /www/apps/logistics/

RUN npm run build
RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
