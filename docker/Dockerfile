
FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git

RUN mkdir -p /www && chown -R 1000:1000 /www

WORKDIR /www

USER 1000

COPY ./package.json ./package-lock.json ./.npmrc /www/

RUN npm ci

COPY ./.git /www/.git

COPY . .

RUN npm run build

RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
