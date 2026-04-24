# build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# production stage
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app ./

ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]