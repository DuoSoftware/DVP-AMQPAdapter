module.exports = {
    "RabbitMQ":
        {
            "ip": "SYS_RABBITMQ_HOST",
            "port": "SYS_RABBITMQ_PORT",
            "user": "SYS_RABBITMQ_USER",
            "password": "SYS_RABBITMQ_PASSWORD",
            "vhost":"SYS_RABBITMQ_VHOST"
        },
    "Host":
        {
            "subToAmqp": "AMQP_ADAPTER_SUB_TO_AMQP",
            "amqpQueueName": "AMQP_QUEUE_NAME",
            "vdomain": "LB_FRONTEND",
            "domain": "HOST_NAME",
            "port": "HOST_INTERACTIONS_PORT",
            "version": "HOST_VERSION"
        },
    "Services" :
        {
            "eventCallbackUrl": "AMQP_ADAPTER_CALLBACK_URL"
        }
}