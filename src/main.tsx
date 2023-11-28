import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
    CompositePropagator,
    W3CBaggagePropagator,
    W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { SimpleSpanProcessor, TracerConfig, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { ZoneContextManager } from '@opentelemetry/context-zone';
import {FetchInstrumentation} from "@opentelemetry/instrumentation-fetch";

const providerConfig: TracerConfig = {
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'basic-orders-web',
    }),
};

const provider = new WebTracerProvider(providerConfig);
provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()));
provider.register({
    contextManager: new ZoneContextManager(),
    propagator: new CompositePropagator({
        propagators: [
            new W3CBaggagePropagator(),
            new W3CTraceContextPropagator(),
        ],
    }),
});

registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
        new FetchInstrumentation({
            propagateTraceHeaderCorsUrls: /.*/,
            clearTimingResources: true,
            applyCustomAttributesOnSpan(span) {
                span.setAttribute('app.synthetic_request', 'false');
            },
        })
    ],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
