# Production image for Node on-chain service
FROM node:20-alpine
WORKDIR /app
COPY node-backend/package.json ./package.json
RUN npm install --only=production
COPY node-backend/ ./
EXPOSE 5003
ENV NODE_ENV=production
CMD ["node", "app.js"]