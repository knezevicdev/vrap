FROM node:erbium-alpine

ARG CI_JOB_TOKEN

WORKDIR /www
COPY .git ./.git
COPY .vscode ./.vscode
COPY ./apps/landing ./apps/landing


WORKDIR /www/apps/landing
RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  npm install &&\
  npm run build

EXPOSE 8080

CMD ["npm", "run", "start", "--port", "8080"]