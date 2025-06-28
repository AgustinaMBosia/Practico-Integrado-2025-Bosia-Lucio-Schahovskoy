FROM golang:1.24.2

WORKDIR /app

COPY . .

RUN go build -o backend-app .

EXPOSE 8080

CMD ["./backend-app"]
