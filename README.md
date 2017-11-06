# TinyURL

This project uses the MEAN stack:

- [Mongoose.js](http://mongoosejs.com/): database
- [Express.js](http://expressjs.com/): backend framework
- [Angular](https://angularjs.org/): frontend framework
- [Node.js](https://nodejs.org/en/): runtime environment


Other tools and technologies used:
- [Bootstrap](http://getbootstrap.com/): layout and styles
- [angular-chart.js](http://jtblin.github.io/angular-chart.js/): visualization
- [docker](https://www.docker.com/):deployment
- [redis](https://redis.io/): cache

## Description
1. A full-stack web application by using MEAN stack (MongoDB, Express, Angular, Node.js) to provide  URL Shortener Service
2. Deployed the application by using Docker, Redis as the cache layer and Nginx for high-performance
3. Using the third-party library angular-chart.js to visualize the user distribution information (country, platform, browser) and click rates of specific URLs 

## Prerequisites

1. Install Docker
2. Filling the mongoose username and password in the tinyurl/app/server.js
```shell
mongoose.connect("mongodb://<username>:<password>@<host:database>", {useMongoClient: true});

```
## Run

```shell
git clone https://github.com/Tivcrmn/tinyurl.git
cd tinyurl/app && docker build -t <image-name>
cd ..
docker-compose up --build 
```
