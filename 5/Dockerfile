FROM node:slim

RUN mkdir -p /app
ADD .        /app
WORKDIR      /app

# npm install
RUN npm install

ENV PORT=8000
CMD ["node", "/app/index.js"]
