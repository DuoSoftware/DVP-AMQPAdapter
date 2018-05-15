var restify = require('restify');
var config = require('config');
var amqpHandler = require('./amqpHandler');

const server = restify.createServer({
    name: 'amqp_adapter',
    version: config.Host.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/DVP/API/:version/amqpPublish', function (req, res, next) {
    amqpHandler.AmqpPublish(req.body)
    res.end(req.params);
    return next();
});

server.listen(config.Host.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});