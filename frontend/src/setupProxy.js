const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/images', { target: 'http://localhost:3001/' }));
  app.use(proxy('/fixed', { target: 'http://localhost:3001/' }));
};
