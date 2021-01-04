
FROM node:erbium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git

RUN mkdir -p /www/apps/appraisal && chown -R 1000:1000 /www/apps/appraisal

WORKDIR /www/apps/appraisal

USER 1000

COPY ./apps/appraisal/package.json ./apps/appraisal/package-lock.json ./apps/appraisal/.npmrc /www/apps/appraisal/

RUN npm ci

COPY ./.git /www/.git

COPY ./apps/appraisal /www/apps/appraisal/

RUN npm run build

RUN npm prune --production

ARG PORT=8080

ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT
