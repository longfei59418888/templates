# 手动构建线上环境
FROM node:23.9.0-alpine as base
WORKDIR /app
COPY . .


FROM node:23.9.0-alpine as run
WORKDIR /app
COPY --from=base  /app/public ./public
COPY --from=base  /app/.next/standalone ./
COPY --from=base  /app/.next/static ./.next/static

ENV PORT 80
EXPOSE 80
CMD ["node", "server.js"]
