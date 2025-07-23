// Test this in your browser console or create /api/test-groq.js

export default async function handler(req, res) {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
        return res.json({ error: 'No API key found in environment' });
    }
    
    try {
        const response = await fetch('https://api.groq.com/openai/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        res.json({
            status: response.status,
            success: response.ok,
            hasModels: result.data ? result.data.length : 0,
            error: result.error || null,
            keyValid: response.status !== 401
        });
        
    } catch (error) {
        res.json({
            error: error.message,
            keyValid: false
        });
    }
}
