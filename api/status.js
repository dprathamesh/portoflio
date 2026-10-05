// GET /api/status -> { online: boolean, provider: 'cohere', detail?: string }
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.COHERE_API_KEY) {
    return res.status(200).json({ online: false, provider: 'cohere', detail: 'COHERE_API_KEY not set' });
  }
  try {
    const r = await fetch('https://api.cohere.com/v1/check-api-key', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.COHERE_API_KEY}` },
    });
    const data = await r.json().catch(() => ({}));
    return res.status(200).json({ online: r.ok && data.valid !== false, provider: 'cohere' });
  } catch (err) {
    return res.status(200).json({ online: false, provider: 'cohere', detail: err.message });
  }
};
