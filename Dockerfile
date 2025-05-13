FROM grafana/k6:latest

# Salin semua script ke dalam container
COPY . /scripts

# Set working directory
WORKDIR /scripts

# Perintah default, bisa override via `docker run`
ENTRYPOINT ["k6", "run"]
