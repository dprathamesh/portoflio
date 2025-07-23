export default function handler(req, res) {
    // Check if API key exists
    const apiKey = process.env.GROQ_API_KEY;
    
    res.json({
        hasApiKey: !!apiKey,
        keyLength: apiKey ? apiKey.length : 0,
        keyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'Not found',
        keySuffix: apiKey ? '...' + apiKey.substring(apiKey.length - 8) : 'Not found',
        startsWithGsk: apiKey ? apiKey.startsWith('gsk_') : false,
        allEnvVars: Object.keys(process.env).filter(key => key.includes('GROQ'))
    });
}
