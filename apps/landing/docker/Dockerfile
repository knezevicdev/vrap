FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git
RUN mkdir -p /www/apps/landing && chown -R 1000:1000 /www/apps/landing

WORKDIR /www/apps/landing

USER 1000

COPY ./apps/landing/package.json ./apps/landing/package-lock.json ./apps/landing/.npmrc /www/apps/landing/

RUN npm ci

COPY ./.git /www/.git
COPY ./apps/landing /www/apps/landing/

RUN npm run build
RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
