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
    
    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
        console.error('GROQ_API_KEY environment variable is not set');
        res.status(500).json({ 
            error: 'API key not configured',
            message: 'Please configure GROQ_API_KEY in environment variables'
        });
        return;
    }
    
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
                        content: `You are Prathamesh Damle's AI assistant. You help visitors learn about Prathamesh's professional background.

ABOUT PRATHAMESH:
- Current: MS in Computer Science at SUNY Buffalo (Jan 2025 - Present), Teaching Assistant for SQL
- Experience: 3+ years as Python Lead at Capgemini India (2021-2024)
- Founder: Teraluna Tech Ventures (2018-2021) - recruitment technology startup
- Skills: Python (Expert), SQL (Advanced), Machine Learning, Data Science, NLP, SAP BO/BODS, AWS, Tableau
- Projects: Fall Detection using Active Learning, Transportation Data Science, Smart Attendance System
- Volunteer: Manager at Vardhan NGO, teaches underprivileged children 8hrs/week
- Education: BE in Electronics & Telecommunication from Pillai College of Engineering (2017-2021)

Keep responses concise, professional, and helpful. Focus on his technical expertise and professional achievements.`
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
        
        // Check if the response contains an error
        if (result.error) {
            console.error('Groq API Error:', result.error);
            res.status(400).json({ 
                error: 'API Error',
                message: result.error.message || 'Unknown API error',
                details: result.error
            });
            return;
        }
        
        // Check if response has expected structure
        if (!result.choices || !result.choices[0] || !result.choices[0].message) {
            console.error('Unexpected API response structure:', result);
            res.status(500).json({ 
                error: 'Invalid response format',
                message: 'API returned unexpected response structure'
            });
            return;
        }
        
        res.json(result);
        
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).json({ 
            error: 'Network error',
            message: 'Failed to connect to AI service'
        });
    }
}
