const http=require('http');

const route=require('./route')

//console.log(route.handler);
const server=http.createServer(route.handler);

server.listen(4000);