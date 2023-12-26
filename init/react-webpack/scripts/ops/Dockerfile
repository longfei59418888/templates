FROM node:20.9.0-slim as base
WORKDIR /app
COPY . .
RUN yarn config set registry https://registry.npmmirror.com/
RUN yarn install --prefer-offline

# npm run test
FROM base as test
RUN yarn run test

FROM base as build
ARG ENV
RUN yarn run build:$ENV

FROM  nginx as prod
COPY ./scripts/ops/app.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /opt/dist/
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
