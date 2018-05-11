FROM node:slim

RUN mkdir -p /app
ADD .        /app
WORKDIR      /app

# ssh
RUN mkdir /var/run/sshd -p
EXPOSE 22

ENV PORT=8000
CMD ["node", "/app/index.js"]
