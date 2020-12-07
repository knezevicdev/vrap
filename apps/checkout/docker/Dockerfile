FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build the main app.
  cd apps/checkout &&\
  yarn build &&\
  cd ../.. &&\
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["cd", "apps/checkout", "&&", "yarn", "start", "--port", "8080"]
