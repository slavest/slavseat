FROM node:20-alpine AS base
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer

WORKDIR /app
RUN npm i -g pnpm@9.0.6
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/turbo.json ./turbo.json
RUN pnpm install --production --frozen-lockfile


FROM node:20-alpine AS sourcer
WORKDIR /app
RUN npm i -g pnpm@9.0.6
COPY --from=installer /app/ .
COPY --from=base /app/out/full/ .
COPY ./apps/backend/dist ./apps/backend/dist
COPY --from=base /app/packages/types/dist ./apps/packages/types/dist


FROM node:20-alpine as runner
WORKDIR /app
RUN npm i -g pnpm@9.0.6
COPY --from=sourcer /app/ .

WORKDIR /app/apps/backend
CMD ["pnpm", "start"]
