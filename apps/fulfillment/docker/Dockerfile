FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build libraries.
  # yarn workspace @vroom-web/ui build &&\
  # Build the main app.
  yarn workspace @vroom-web/fulfillment build &&\
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/fulfillment", "start", "--port", "8080"]