var amqp = require('amqp');
var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var request = require('request');

var ips = [];
if(config.RabbitMQ.ip) {
    ips = config.RabbitMQ.ip.split(",");
}


var queueConnection = amqp.createConnection({
    host: ips,
    port: config.RabbitMQ.port,
    login: config.RabbitMQ.user,
    password: config.RabbitMQ.password,
    vhost: config.RabbitMQ.vhost,
    noDelay: true,
    heartbeat:10
}, {
    reconnect: true,
    reconnectBackoffStrategy: 'linear',
    reconnectExponentialLimit: 120000,
    reconnectBackoffTime: 1000
});

queueConnection.on('ready', function () {

    logger.info("Confection with the amqp is OK");

    if(config.Host.subToAmqp === "true"){
        queueConnection.queue(config.Host.amqpQueueName, {durable: true, autoDelete: false}, function (q) {
            logger.info("Subscribe to amqp worker queue is OK");

            q.bind('#');

            // Receive messages
            q.subscribe(function (message) {
                logger.info("%s: receive message:: %s", config.Host.amqpQueueName, message);

                var options = {
                    url: config.Services.eventCallbackUrl,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    data: message
                };

                try {
                    request.post(options, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            logger.error('upload eventCallbackUrl failed: %j', err);
                        }
                        logger.info('Server accept eventCallbackUrl: %j', body);
                    });
                }catch (ex){
                    logger.error('upload eventCallbackUrl failed: %j', ex);
                }

            });

        });
    }

});


queueConnection.on('error', function (error) {

    logger.error("Issue in amqp", error);

});


var amqpPublish = function (messageObj) {
    try {
        queueConnection.publish(config.Host.amqpQueueName, messageObj, {
            contentType: 'application/json'
        });
        logger.info("%s: Success amqpPublish : %j", config.Host.amqpQueueName, messageObj);
    }catch(ex){
        logger.error("%s: Issue in amqpPublish", config.Host.amqpQueueName, ex);
    }
};

module.exports.AmqpPublish = amqpPublish;