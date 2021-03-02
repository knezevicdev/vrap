FROM node:erbium-alpine

ARG CI_JOB_TOKEN

WORKDIR /www
COPY .git ./.git
COPY .vscode ./.vscode
COPY ./apps/logistics ./apps/logistics

WORKDIR /www/apps/logistics

# Install git so editor git commands work
RUN apk --no-cache add git

RUN npm install

CMD ["npm", "run", "start", "--port", "8080"]