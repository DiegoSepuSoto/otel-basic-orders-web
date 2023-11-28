run r:
	@OTEL_TRACES_EXPORTER=otlp \
    OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 \
    OTEL_RESOURCE_ATTRIBUTES=service.name=basic-orders-web,service.version=1.0,deployment.environment=local \
    npm run dev

.PHONY: run r