FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www

WORKDIR /www
COPY . .
RUN chown -R 1000:1000 .

# Bootstrap yarn workspaces.
RUN yarn install --silent &&\
  # Build libraries.
  yarn workspace @vroom-web/analytics-integration build &&\
  yarn workspace @vroom-web/deals-v2-networking build &&\
  yarn workspace @vroom-web/inv-search-networking build &&\
  yarn workspace @vroom-web/ui build &&\
  yarn workspace @vroom-web/header-components build &&\
  yarn workspace @vroom-web/footer-components build &&\
  # Build the main app.
  yarn workspace @vroom-web/catalog build

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/catalog", "start", "--port", "8080"]