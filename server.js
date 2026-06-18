import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve your static frontend directory pages if deployed together
app.use(express.static(path.join(__dirname, '../')));

// ============================================================================
// --- SECURE CONFIG EXPORT ROUTE FOR FRONTEND WEB PORTAL INITIALIZATION ---
// ============================================================================
app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
});

app.listen(PORT, () => {
    console.log(`[Core Server] WorldConnect backend active on port ${PORT}`);
});