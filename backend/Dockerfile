FROM node:20-slim

WORKDIR /usr/src/app

EXPOSE 9000

CMD if [ ! -d "node_modules" ]; then npm install; fi && npm run dev