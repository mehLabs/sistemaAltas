FROM node:18 AS builder
WORKDIR /app/backend
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18 AS server
WORKDIR /app/backend
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/backend/dist ./public
EXPOSE 8000
CMD ["node", "public/server/index.js"]
