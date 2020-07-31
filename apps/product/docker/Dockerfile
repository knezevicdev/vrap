FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  # Install git so editor git commands work inside dev container
  # (This could be removed if the image already has git installed.)
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build the main app.
  yarn workspace @vroom-web/product build &&\
  # Change user for created files
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/product", "start", "--port", "8080"]