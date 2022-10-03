# [Choice] Node.js version: 14, 12, 10
ARG VARIANT=14
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# bind your app to the gateway IP
ENV HOST=0.0.0.0

RUN su node -c "umask 0002 && npm install -g npm && npm install -g http-server @vue/cli @vue/cli-service-global"

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--"]    

# Install puppeteer so it's available in the container.
RUN sudo apt-get update \
    && apt-get -y install curl \
    && sudo apt-get install -yq \
          libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
          libexpat1 libfontconfig1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libx11-xcb1 libxtst6 \
          libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libxcb1 libxcomposite1 libxcursor1 \
          libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 ca-certificates \
          fonts-liberation libnss3 lsb-release xdg-utils wget \
  && npm i -g puppeteer 

WORKDIR /app/frontend

EXPOSE 8080

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
