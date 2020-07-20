FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build libraries.
  yarn workspace @vroom-web/analytics-integration build &&\
  yarn workspace @vroom-web/deals-v2-networking build &&\
  yarn workspace @vroom-web/inv-search-networking build &&\
  yarn workspace @vroom-web/ui build &&\
  yarn workspace @vroom-web/header-components build &&\
  yarn workspace @vroom-web/footer-components build &&\
  # Build the main app.
  yarn workspace @vroom-web/marketing build &&\
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/marketing", "start", "--port", "8080"]