# backend/file-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

# Ensure directories exist
RUN mkdir -p /tmp/uploads /data/uploads

EXPOSE 4004
CMD ["node", "src/index.js"]
