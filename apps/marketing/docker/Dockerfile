FROM node:erbium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git

RUN mkdir -p /www/apps/marketing && chown -R 1000:1000 /www/apps/marketing

WORKDIR /www/apps/marketing

USER 1000

COPY ./apps/marketing/package.json ./apps/marketing/package-lock.json ./apps/marketing/.npmrc /www/apps/marketing/

RUN npm ci

COPY ./.git /www/.git

COPY ./apps/marketing /www/apps/marketing/

RUN npm run build

RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
