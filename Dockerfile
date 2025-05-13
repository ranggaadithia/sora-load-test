FROM grafana/k6:latest

COPY . /scripts

WORKDIR /scripts

ENTRYPOINT ["k6", "run"]
