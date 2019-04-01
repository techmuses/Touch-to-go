const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/all_attend_tbl', { target: 'http://localhost:3000/' }));
  app.use(proxy('/attend_name_empid', { target: 'http://localhost:3000/' }));

  
};