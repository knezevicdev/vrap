FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www

WORKDIR /www
COPY . .
RUN chown -R 1000:1000 .

# Placeholders
ENV CDN_URL=
ENV INVSEARCH_V3_URL=

# Bootstrap yarn workspaces.
RUN yarn install --silent

# Build libraries.
RUN yarn workspace @vroom-web/analytics-integration build
RUN yarn workspace @vroom-web/inv-search-networking build
RUN yarn workspace @vroom-web/ui build
RUN yarn workspace @vroom-web/header-components build
RUN yarn workspace @vroom-web/footer-components build

# Build the main app.
RUN yarn workspace @vroom-web/homepage build

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/homepage", "start", "--port", "8080"]