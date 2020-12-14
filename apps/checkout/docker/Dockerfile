FROM node:erbium-alpine
WORKDIR /www
COPY . . 

#remove all availables apps
RUN rm -rf apps 

#copy only the current app
COPY apps/checkout apps/checkout


RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  #remove unnecessary dep.
  rm -rf libs/networking/inv-search &&\
  rm -rf libs/networking/inv-service &&\ 
  rm -rf libs/whitelabel &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\ 
  # Build the main app.
  yarn workspace @vroom-web/checkout build &&\ 
  chown -R 1000:1000 .

EXPOSE 8080

USER 1000

CMD ["yarn", "workspace", "@vroom-web/checkout", "start", "--port", "8080"]