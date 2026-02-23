FROM node:22-alpine AS base

# ─── 1. Builder: turbo prune으로 frontend에 필요한 파일만 추출 ───
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
RUN npm install -g turbo

COPY . .
RUN turbo prune frontend --docker


# ─── 2. Install ───
FROM base AS install
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
RUN npm install -g turbo

# 의존성 명세 먼저 복사 → 레이어 캐시 활용
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# 소스코드 복사
COPY --from=builder /app/out/full/ .


# ─── 3. Build ───
FROM install AS build

# 프로덕션 환경변수 주입
COPY apps/frontend/.env.production ./apps/frontend/.env.production

RUN turbo run build --filter=frontend


# ─── 4. Runner: serve로 정적 파일 서빙 ───
FROM node:22-alpine AS runner

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/apps/frontend/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]