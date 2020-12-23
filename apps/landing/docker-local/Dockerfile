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
  # Bootstrap yarn workspaces.
  npm install &&\
  # Build the main app.
  npm run build

WORKDIR /www
RUN chown -R 1000:1000 .

EXPOSE 8080

USER 1000

WORKDIR /www/apps/landing

CMD ["npm", "run", "start", "--port", "8080"]