ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.7.0

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml ./

COPY tsconfig.json tsconfig.build.json .swcrc ./
COPY src ./src

RUN pnpm build

RUN pnpm deploy --legacy --prod /prod

FROM base AS production

WORKDIR /app

COPY --from=builder /prod ./

EXPOSE 3333

CMD ["node", "dist/src/main.js"]

FROM base AS dev

RUN apk add --no-cache curl

WORKDIR /app

CMD ["sh", "-c", "pnpm start:dev"]
