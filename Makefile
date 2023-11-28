start:
	@docker run --platform linux/amd64 \
    	-d \
    	-p 3000:80 \
    	--name otel-basic-orders-web \
    	-e REACT_APP_ORDER_BFF_HOST=http://host.docker.internal:8082 \
    	-e OTEL_TRACES_EXPORTER=otlp \
    	-e OTEL_EXPORTER_OTLP_ENDPOINT=http://host.docker.internal:4317 \
    	-e OTEL_RESOURCE_ATTRIBUTES=service.name=basic-orders-web,service.version=1.0,deployment.environment=local \
    	diegosepusoto/otel-basic-orders-web:local

build:
	@docker build . -t diegosepusoto/otel-basic-orders-web:local

stop:
	@docker rm -f otel-basic-orders-web

.PHONY: start build stop