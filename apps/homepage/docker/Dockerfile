FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build the main app.
  yarn workspace @vroom-web/homepage build &&\
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/homepage", "start", "--port", "8080"]