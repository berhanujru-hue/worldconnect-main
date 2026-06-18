import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { message } = req.body;
        if (!message) return res.status(200).json({ reply: "⚠️ Prompt payload received empty." });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(200).json({ 
                reply: "⚠️ Key Configuration Missing: 'GEMINI_API_KEY' is not defined in your Vercel Environment Variables yet." 
            });
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-preview',
            contents: message
        });

        return res.status(200).json({ reply: response.text });

    } catch (error) {
        console.error("[Backend Crash Log]:", error);
        return res.status(200).json({ 
            reply: `⚠️ Backend SDK Error: ${error.message}. Please double-check your API key or installation.` 
        });
    }
}