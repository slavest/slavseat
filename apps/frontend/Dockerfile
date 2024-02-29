FROM node:18-alpine AS base
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer

WORKDIR /app
RUN corepack enable
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/turbo.json ./turbo.json
RUN pnpm install --frozen-lockfile


FROM node:18-alpine AS sourcer
WORKDIR /app
RUN corepack enable
COPY --from=installer /app/ .
COPY --from=base /app/out/full/ .
COPY ./apps/frontend/dist ./apps/frontend/dist
COPY --fron=base /app/apps/packages/types/dist ./apps/packages/types/dist

FROM nginx:alpine as runner
WORKDIR /app

RUN rm -rf /etc/nginx/conf.d

COPY --from=sourcer /app/ .

COPY --from=base /app/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=sourcer /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
