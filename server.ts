import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Initialization
  const genAI = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  // API Routes
  app.post('/api/gemini/generate-news', async (req, res) => {
    try {
      const { topic } = req.body;
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short school news article about: ${topic}. 
        Keep it professional and suitable for Rangpur Govt. Girls' High School.
        Include a catchy title and a 3-sentence summary.`
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error('Gemini error:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
