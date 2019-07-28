FROM node:10-alpine AS builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY frontend/package*.json ./
USER node
RUN npm install
COPY --chown=node:node ./frontend .
RUN npm run build

FROM node:10-alpine
USER node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=builder /home/node/app/build ./build

COPY backend/package*.json ./

RUN npm install

EXPOSE 8080

COPY --chown=node:node ./backend .
RUN mkdir store
RUN mkdir public/images

CMD ["npm", "start"]
