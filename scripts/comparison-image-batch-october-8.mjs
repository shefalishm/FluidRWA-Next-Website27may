// Condensed observations from the corresponding dated, sourced article tables.
export default [
  {
    slug: 'pinecone-vs-weaviate-vs-qdrant-rag-vector-databases',
    title: 'RAG Vector Databases',
    vendors: ['Pinecone', 'Weaviate', 'Qdrant'],
    rows: [
      ['Core model', 'Keyword and semantic combination', 'BM25 and vector fusion', 'Hybrid and multi-stage queries'],
      ['Design choice', 'Index and combination pattern', 'Weighting and fusion strategy', 'Prefetch and ranking stages'],
      ['Test first', 'Relevance and filtering', 'Exact terms versus semantic matches', 'Candidate selection across stages']
    ]
  },
  {
    slug: 'unstructured-vs-llamaparse-vs-reducto-document-ingestion',
    title: 'AI Document Ingestion',
    vendors: ['Unstructured', 'LlamaParse', 'Reducto'],
    rows: [
      ['Core model', 'Connector-based processing workflows', 'Layout-aware document parsing', 'Parsing and structured extraction'],
      ['Buyer focus', 'Source to destination pipeline', 'Complex content representation', 'Content and schema-based fields'],
      ['Test first', 'Connectors and job lifecycle', 'Tables and reading order', 'Field grounding and schema']
    ]
  },
  {
    slug: 'langfuse-vs-langsmith-vs-arize-phoenix-ai-observability',
    title: 'AI Observability',
    vendors: ['Langfuse', 'LangSmith', 'Arize Phoenix'],
    rows: [
      ['Core model', 'Tracing, prompts and evaluation', 'Application observability', 'Tracing and evaluation'],
      ['Evidence', 'SDKs and OpenTelemetry', 'SDK and framework integrations', 'OpenTelemetry and OpenInference'],
      ['Test first', 'Trace to prompt and evaluation', 'Reconstruct a failed run', 'Spans and evaluation evidence']
    ]
  },
  {
    slug: 'temporal-vs-inngest-vs-trigger-dev-workflow-orchestration',
    title: 'Workflow Orchestration',
    vendors: ['Temporal', 'Inngest', 'Trigger.dev'],
    rows: [
      ['Core model', 'Workflows and Activities', 'Durable steps and primitives', 'Background tasks'],
      ['Recovery', 'Event history and replay', 'Saved results reused on retry', 'Configurable task retries'],
      ['Test first', 'Replay and code changes', 'Stable IDs and resumed progress', 'Retry boundaries and concurrency']
    ]
  },
  {
    slug: 'infisical-vs-doppler-vs-hashicorp-vault-secrets-management',
    title: 'Application Secrets Management',
    vendors: ['Infisical', 'Doppler', 'HashiCorp Vault'],
    rows: [
      ['Evidence', 'Dynamic-secret templates', 'Secret delivery and syncs', 'Dynamic secrets and leases'],
      ['Design choice', 'Backend and credential scope', 'Delivery destinations', 'Issue, renew and revoke'],
      ['Test first', 'Credential expiry and refresh', 'Consumer update and revocation', 'Lease expiry and revocation']
    ]
  }
];
