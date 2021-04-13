FROM node:fermium-alpine as BUILD_IMAGE

ARG CI_JOB_TOKEN

RUN apk --no-cache add git
RUN mkdir -p /www/apps/product

WORKDIR /www/apps/product

COPY ./apps/product/package.json ./apps/product/package-lock.json ./apps/product/.npmrc /www/apps/product/

RUN npm ci

COPY ./.git /www/.git
COPY ./apps/product /www/apps/product/

RUN npm run build
RUN npm prune --production

RUN chown -R 1000:1000 /www/apps/product
USER 1000

ARG PORT=8080
ENV PORT=$PORT

EXPOSE $PORT

CMD ./node_modules/.bin/next start -p $PORT