FROM node:erbium-alpine

# Install git so editor git commands work
RUN apk --no-cache add git

RUN mkdir -p /www/.git
RUN mkdir -p /www/libs/ui

WORKDIR /www

COPY package.json .
COPY yarn.lock .
COPY .git .git
COPY .gitignore .
COPY .eslintignore .
COPY .eslintrc.js .
COPY .prettierrc.js .

COPY libs/ui ./libs/ui

RUN chown -R 1000:1000 .

RUN yarn install

EXPOSE 8080

USER 1000

CMD ["yarn", "--cwd", "./libs/ui", "storybook"]