FROM node:20-alpine AS builder

ARG VITE_API_URL="http://172.17.0.1:8000"
ARG APP_DIR=/opt/app


RUN mkdir -p ${APP_DIR}
COPY ./ ${APP_DIR}/

ENV VITE_API_URL=${VITE_API_URL}
WORKDIR ${APP_DIR}
RUN yarn install && yarn run build

FROM alpine AS source

ARG DHPARAM_DIR=/var/srv/dhparam.cert

RUN apk update && \
    apk add --update --no-cache -f curl git openssl libressl && \
    git clone https://github.com/jaysnm/nginx-errors.git /opt/share && \
    mkdir -p ${DHPARAM_DIR} && \
    openssl dhparam -dsaparam -out ${DHPARAM_DIR}/dhparams.pem 4096

FROM nginx:alpine AS runner

ARG ERROR_PAGES=/usr/share/nginx/error-pages
ARG APP_DIR=/opt/app
ARG APP_HOME=/opt/www
ARG DHPARAM_DIR=/var/srv/dhparam.cert

RUN mkdir -p ${APP_HOME} ${ERROR_PAGES} ${DHPARAM_DIR}
WORKDIR ${APP_HOME}

COPY --from=builder ${APP_DIR}/dist ${APP_HOME}
COPY --from=source /opt/share ${ERROR_PAGES}
COPY --from=source ${DHPARAM_DIR}/dhparams.pem ${DHPARAM_DIR}/dhparams.pem
COPY ./nginx/security.conf ./nginx/ssl-options.conf /etc/nginx/
