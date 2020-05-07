FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www

WORKDIR /www
COPY . .
RUN chown -R 1000:1000 .

RUN yarn install --silent
RUN yarn workspace @vroom-web/ui build

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/footer-components", "storybook"]