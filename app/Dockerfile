FROM node:6.9.5

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install -g nodemon

RUN cnpm install -g redis

RUN cnpm install geoip-lite

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN cd /app && cnpm install

EXPOSE 3000

CMD ["nodemon", "/app/server.js"]