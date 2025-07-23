export default async function handler(req, res) {
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
    const apiKey = process.env.GROQ_API_KEY;
    
    console.log('=== GROQ API DEBUG ===');
    console.log('Question:', question);
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key starts with gsk_:', apiKey ? apiKey.startsWith('gsk_') : false);
    
    if (!apiKey) {
        return res.status(500).json({ 
            error: 'GROQ_API_KEY environment variable not set' 
        });
    }
    
    // List of models to try in order
    const modelsToTry = [
        "llama3-8b-8192",
        "mixtral-8x7b-32768", 
        "llama3-70b-8192",
        "gemma2-9b-it"
    ];
    
    for (const model of modelsToTry) {
        try {
            console.log(`Trying model: ${model}`);
            
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "system",
                            content: "You are Prathamesh Damle's AI assistant. Answer questions about his professional background, skills, and experience. Keep responses concise and professional."
                        },
                        {
                            role: "user", 
                            content: question
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });
            
            const result = await response.json();
            
            console.log(`Model ${model} - Status:`, response.status);
            console.log(`Model ${model} - Response:`, JSON.stringify(result, null, 2));
            
            if (response.ok && result.choices && result.choices[0]) {
                console.log(`SUCCESS with model: ${model}`);
                return res.json(result);
            } else if (result.error) {
                console.log(`Model ${model} failed:`, result.error.message);
                // Continue to next model
                continue;
            }
            
        } catch (error) {
            console.error(`Model ${model} threw error:`, error.message);
            continue;
        }
    }
    
    // If all models failed
    console.log('ALL MODELS FAILED');
    return res.status(500).json({
        error: 'All available models failed',
        message: 'Please check your Groq API key and account status',
        modelsAttempted: modelsToTry
    });
}
