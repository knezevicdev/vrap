FROM node:erbium-alpine

WORKDIR /www
COPY . .

RUN ls
RUN npm install -g sonarqube-scanner
RUN \
  # Install git so editor git commands work
  apk --no-cache add git &&\
  # Bootstrap yarn workspaces.
  yarn install --silent &&\
  # Build the main app.
  yarn test:cc

ENV SONAR_SCANNER_VERSION 4.4.0.2170
ENV JAVA_HOME /usr/lib/jvm/default-jvm
ENV PATH $PATH:/sonar-scanner/bin

ADD "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip" /

RUN set -x \
	&& apk add --no-cache unzip openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
  && unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip \
	&& ln -s /sonar-scanner-${SONAR_SCANNER_VERSION} /sonar-scanner \
  && rm -f sonar-scanner-cli-*.zip \
  && mkdir -p /data \
  && sonar-scanner