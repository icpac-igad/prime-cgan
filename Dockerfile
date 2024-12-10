FROM node:20-alpine AS builder

ARG VITE_API_URL="http://172.17.0.1:8000"
ARG APP_DIR=/opt/app

RUN mkdir -p ${APP_DIR}
COPY ./ ${APP_DIR}/

ENV VITE_API_URL=${VITE_API_URL}
WORKDIR ${APP_DIR}
RUN yarn install && yarn run build

RUN apk update && \
    apk add --update --no-cache -f curl git && \
    git clone https://github.com/jaysnm/nginx-errors.git /opt/share


FROM nginx:alpine AS runner

ARG ERROR_PAGES=/usr/share/nginx/error-pages
ARG APP_DIR=/opt/app
ARG APP_HOME=/opt/www

RUN mkdir -p ${APP_HOME} ${ERROR_PAGES}
WORKDIR ${APP_HOME}

COPY --from=builder ${APP_DIR}/dist ${APP_HOME}
COPY --from=builder /opt/share ${ERROR_PAGES}
COPY ./nginx/default.conf /etc/nginx/sites-enabled
