# stage 1 - build app
FROM node:16 as build

ENV NODE_ENV production
ENV NODE_PATH .
ARG SERVICE_HOST
ENV REACT_APP_SERVICE_HOST $SERVICE_HOST
ENV DISABLE_ESLINT_PLUGIN true
ENV TSC_COMPILE_ON_ERROR true
ENV ESLINT_NO_DEV_ERRORS true

WORKDIR /app
COPY package.json .
RUN yarn install --production

COPY . .
RUN yarn build

# stage 2 - build image
FROM nginx:1.21
COPY --from=build /app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d
