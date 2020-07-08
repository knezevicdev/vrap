FROM node:erbium-alpine

WORKDIR /www
COPY . .
RUN \
  apk --no-cache add git &&\
  yarn install --silent &&\
  yarn workspace @vroom-web/ui build &&\
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/footer-components", "storybook"]