ARG NODE_VERSION=22.18.0

FROM node:${NODE_VERSION}-alpine AS base

RUN npm i -g pnpm

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma/

RUN pnpm install

FROM base AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml ./
COPY --from=deps /app/prisma ./prisma/

RUN pnpm prisma generate

RUN pnpm build

FROM base AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm prune --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infrastructure/database/prisma/generated ./src/infrastructure/database/prisma/generated

EXPOSE 3333

CMD ["node", "dist/src/main.js"]
