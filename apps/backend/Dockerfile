FROM node:22-alpine AS base

# ─── 1. Builder: turbo prune으로 backend에 필요한 파일만 추출 ───
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
RUN npm install -g turbo

COPY . .
RUN turbo prune backend --docker


# ─── 2. Install ───
FROM base AS install
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

# 의존성 명세 먼저 복사 → 레이어 캐시 활용
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

# 소스코드 복사
COPY --from=builder /app/out/full/ .


# ─── 3. Runner ───
# Express는 별도 빌드 스텝 없이 바로 실행
FROM base AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=install /app .

EXPOSE 8080

CMD ["node", "apps/backend/app.js"]
