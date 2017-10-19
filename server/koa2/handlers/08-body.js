const koaBody = require('koa-body');

exports.init = app=>app.use(koaBody())
