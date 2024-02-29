FROM node:18-alpine AS base
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer

WORKDIR /app
RUN corepack enable
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=base /app/turbo.json ./turbo.json
RUN pnpm install --production --frozen-lockfile


FROM node:18-alpine AS sourcer
WORKDIR /app
RUN corepack enable
COPY --from=installer /app/ .
COPY --from=base /app/out/full/ .
COPY ./apps/backend/dist ./apps/backend/dist
COPY --from=base /app/apps/packages/types/dist ./apps/packages/types/dist

FROM node:18-alpine as runner
WORKDIR /app
RUN corepack enable
COPY --from=sourcer /app/ .

WORKDIR /app/apps/backend
CMD ["pnpm", "start"]
