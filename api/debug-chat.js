export default async function handler(req, res) {
    const apiKey = process.env.GROQ_API_KEY;
    
    console.log('Testing Groq API Key with chat endpoint...');
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) : 'none');
    
    if (!apiKey) {
        return res.json({ error: 'No API key found' });
    }
    
    try {
        // Test 1: List models (this works)
        const modelsResponse = await fetch('https://api.groq.com/openai/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        const modelsResult = await modelsResponse.json();
        console.log('Models endpoint response:', modelsResponse.status);
        
        // Test 2: Try chat completions with minimal request
        const chatResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Try a different model
                messages: [
                    {
                        role: "user",
                        content: "Hello"
                    }
                ],
                max_tokens: 10
            })
        });
        
        const chatResult = await chatResponse.json();
        console.log('Chat endpoint response:', chatResponse.status);
        console.log('Chat result:', JSON.stringify(chatResult, null, 2));
        
        // Test 3: Try with different model
        const chat2Response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768", // Different model
                messages: [
                    {
                        role: "user",
                        content: "Hello"
                    }
                ],
                max_tokens: 10
            })
        });
        
        const chat2Result = await chat2Response.json();
        console.log('Chat endpoint 2 response:', chat2Response.status);
        
        return res.json({
            tests: {
                models: {
                    status: modelsResponse.status,
                    success: modelsResponse.ok,
                    hasModels: modelsResult.data ? modelsResult.data.length : 0,
                    availableModels: modelsResult.data ? modelsResult.data.map(m => m.id).slice(0, 5) : []
                },
                chat_llama3: {
                    status: chatResponse.status,
                    success: chatResponse.ok,
                    error: chatResult.error || null,
                    hasResponse: !!chatResult.choices
                },
                chat_mixtral: {
                    status: chat2Response.status,
                    success: chat2Response.ok,
                    error: chat2Result.error || null,
                    hasResponse: !!chat2Result.choices
                }
            },
            apiKey: {
                length: apiKey.length,
                prefix: apiKey.substring(0, 10),
                startsWithGsk: apiKey.startsWith('gsk_')
            }
        });
        
    } catch (error) {
        console.error('Debug error:', error);
        return res.json({
            error: error.message,
            stack: error.stack
        });
    }
}
