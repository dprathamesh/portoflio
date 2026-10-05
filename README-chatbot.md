# Portfolio chatbot (Cohere RAG)

## Files
- `api/chat.js`   – POST { question } → { answer, sources }. Rerank → Chat.
- `api/status.js` – GET → { online }. Used by the status dot.
- `lib/knowledge.js` – the facts the bot can answer from. Edit this when the resume changes.
- `vercel.json`   – gives the functions a 30s timeout.

## Deploy
1. Delete the old Groq files: `api/chat.js` (old), `api/test-groq.js`, and the `GROQ_API_KEY` env var.
2. Vercel project → Settings → Environment Variables → add `COHERE_API_KEY` (Production + Preview).
3. Optional overrides: `COHERE_CHAT_MODEL` (default `command-a-03-2025`), `COHERE_RERANK_MODEL` (default `rerank-v3.5`).
4. Push / redeploy. Open the site: the status dot should read "AI Assistant: Online".

## Local test
    vercel dev
    curl -X POST localhost:3000/api/chat -H 'Content-Type: application/json' -d '{"question":"What is his GPA?"}'

## Adding facts
Add a new object to `KNOWLEDGE` in `lib/knowledge.js` with a unique `id`, a short `title`, and 1-3 sentences of `text`.
Keep each chunk about one thing; the reranker works best with narrow, specific chunks.
