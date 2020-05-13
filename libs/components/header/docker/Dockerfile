FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www

WORKDIR /www
COPY . .
RUN chown -R 1000:1000 .

# Bootstrap yarn workspaces.
RUN yarn install --silent

# Build libraries.
RUN yarn workspace @vroom-web/ui build

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/header-components", "storybook"]