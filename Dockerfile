
FROM node:9.9.0
ARG VERSION_TAG
RUN git clone -b $VERSION_TAG https://github.com/DuoSoftware/DVP-AMQPAdapter.git /usr/local/src/amqpadapter
RUN cd /usr/local/src/amqpadapter;
WORKDIR /usr/local/src/amqpadapter
RUN npm install
EXPOSE 8828
CMD [ "node", "/usr/local/src/amqpadapter/app.js" ]
