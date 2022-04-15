FROM alpine:latest

EXPOSE 3000/tcp

RUN echo "Setting up 123arol user and it's home directory within the container"
RUN adduser -h /home/123arol -s /bin/bash -D 123arol 123arol
RUN apk add --progress --upgrade bash nodejs npm
#haproxy

# Configure and start haproxy
#COPY config/haproxy.cfg /etc/haproxy
#RUN haproxy -q -f /etc/haproxy/haproxy.cfg -m 100 &

# Prefare the app itself
RUN mkdir /home/123arol/123arol.app
WORKDIR /home/123arol/123arol.app
RUN echo "Copying the sources to the container"
COPY . .

RUN echo "Building the 123arol app from the sources"
RUN npm install
RUN chown -R 123arol:123arol .

USER 123arol

ENTRYPOINT ["npm", "start"]
#, "&&", "haproxy", "-f", "/etc/haproxy/haproxy.cfg", "-m", "100"]
