ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.7.0

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/container-service/package.json services/container-service/

RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=deps /app/services/container-service/package.json services/container-service/

COPY services/container-service/ services/container-service/

WORKDIR /app/services/container-service

RUN pnpm prisma generate
RUN pnpm build

WORKDIR /app

RUN pnpm deploy --legacy --filter container-service --prod /prod

FROM base AS production

WORKDIR /app

COPY --from=builder /prod ./

EXPOSE 3333

CMD ["node", "dist/src/main.js"]

FROM node:${NODE_VERSION}-alpine AS dev

RUN apk add --no-cache curl

RUN corepack enable && corepack prepare pnpm@11.7.0

RUN pnpm config set store-dir /tmp/.pnpm-store

WORKDIR /app

CMD ["sh", "-c", "pnpm install && pnpm --filter container-service start:dev"]
