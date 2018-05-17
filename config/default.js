module.exports = {
    "RabbitMQ":
        {
            "ip": "138.197.90.92,162.243.81.39",
            "port": 5672,
            "user": "admin",
            "password": "admin",
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