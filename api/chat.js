export default async function handler(req, res) {
    console.log('API Key:', process.env.GROQ_API_KEY);
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const { question } = req.body;
    
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are Prathamesh Damle's AI assistant. Prathamesh is a Python Lead and Data Scientist currently pursuing MS in Computer Science at SUNY Buffalo. He has 3+ years of experience at Capgemini India, founded Teraluna Tech Ventures, and works on machine learning projects."
                    },
                    {
                        role: "user", 
                        content: question
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });
        
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'API call failed' });
    }
}
