# [Choice] Node.js version: 14, 12, 10
ARG VARIANT=18
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

# bind your app to the gateway IP
ENV HOST=0.0.0.0



RUN npm install -g http-server @vue/cli @vue/cli-service-global

WORKDIR /app/frontend

EXPOSE 8080