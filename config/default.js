module.exports = {
    "RabbitMQ":
        {
            "ip": "",
            "port": 5672,
            "user": "",
            "password": "",
            "vhost":'/'
        },
    "Host":
        {
            "subToAmqp": "false",
            "amqpQueueName": "EMAILOUT",
            "vdomain": "localhost",
            "domain": "localhost",
            "port": "3653",
            "version": "1.0.0"
        },
    "Services" :
        {
            "eventCallbackUrl": "http://localhost:2223/resourceselection/executeHash"
        }
}
