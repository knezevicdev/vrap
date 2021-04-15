FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git

RUN mkdir -p /www/apps/checkout && chown -R 1000:1000 /www/apps/checkout

WORKDIR /www/apps/checkout

USER 1000

COPY ./apps/checkout/package.json ./apps/checkout/package-lock.json ./apps/checkout/.npmrc /www/apps/checkout/

RUN npm ci

COPY ./.git /www/.git

COPY ./apps/checkout /www/apps/checkout/

RUN npm run build

RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
