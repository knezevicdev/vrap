FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www
RUN mkdir -p /www/apps/homepage
RUN mkdir -p /www/libs/components/material-ui-confirm/dist

WORKDIR /www

COPY package.json .
COPY apps/homepage ./apps/homepage
COPY libs/components/material-ui-confirm ./libs/components/material-ui-confirm

RUN chown -R 1000:1000 .

RUN ./apps/homepage/docker/setup.sh

EXPOSE 8080

USER 1000

CMD ["yarn", "--cwd", "./apps/homepage", "start", "--port", "8080"]