FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www
WORKDIR /www

COPY --chown=1000:1000 . .
RUN yarn install
RUN yarn build

EXPOSE 8080

USER 1000

CMD ["yarn", "start"]