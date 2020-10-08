FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN \
  apk --no-cache add git docker sudo groupadd &&\
  sudo groupadd docker &&\
  sudo usermod -aG docker $(whoami) &&\
  sudo service docker start &&\
  docker run sonarsource/sonar-scanner-cli
#  yarn install --silent &&\
#  yarn workspace @vroom-web/product test:cc &&\