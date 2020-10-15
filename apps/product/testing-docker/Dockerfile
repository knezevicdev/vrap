FROM node:erbium-alpine
FROM sonarsource/sonar-scanner-cli

WORKDIR /www
COPY . .
RUN \
  apk --no-cache add git yarn &&\
  yarn install --silent &&\
  yarn workspace @vroom-web/product test:cc &&\
  cd apps/product &&\
  sonar-scanner
  #-Dsonar.host.url=https://sonarcloud.io -Dsonar.projectKey=vroom-web:Product -Dsonar.organization=tdalabs-1 -Dsonar.login=c58901283094080bbeb3af613744d497907dbea1


