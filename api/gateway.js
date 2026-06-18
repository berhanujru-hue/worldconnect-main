import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the correct SDK instance
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/gateway', async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "⚠️ Key Configuration Missing: 'GEMINI_API_KEY' is not defined." });
    }

    // Direct, standard SDK execution
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: message,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gateway Processing Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default app;