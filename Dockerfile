FROM hub.artifactory.gcp.anz/node:alpine3.14

# Setup proxy
RUN sed -i -e 's~http\(s\)\{0,1\}://dl-cdn.alpinelinux.org~https://artifactory.gcp.anz/artifactory/alpinelinux~g' /etc/apk/repositories && \
    echo "@community https://artifactory.gcp.anz/artifactory/alpinelinux/alpine/edge/community" >> /etc/apk/repositories

ADD ./docs /app/docs
ADD data.csv package.json yarn.lock .yarnrc /app/

WORKDIR /app
RUN yarn config set "strict-ssl" false -g
RUN yarn install
CMD ["yarn", "start"]
