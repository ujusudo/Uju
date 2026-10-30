import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client if API key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health and AI status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'NESYRINGE AI',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Comprehensive AI Medical Tutor endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const {
      message,
      history = [],
      mode = 'standard', // 'standard' | 'simple' | 'clinical' | 'mnemonic' | 'exam'
      studentLevel = 'Medical Sciences (100L - Final Year)',
      university = 'Nigerian University',
      subject = 'General Medical Sciences',
      topic = '',
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY || !ai) {
      // Clear and informative error with fallback signal
      return res.status(503).json({
        error: 'API_KEY_REQUIRED',
        message:
          'GEMINI_API_KEY is not configured on the server. Please attach a Gemini API Key in AI Studio Secrets.',
      });
    }

    const systemInstruction = `
You are NESYRINGE AI — an elite, compassionate medical and health-science tutor and study companion designed specifically for Nigerian university students across all medical schools (from 100L through 600L / Final Year).
Your motto: "Understand Medicine. Master Science. Save Lives."

Current Student Context:
- Discipline & Level: ${studentLevel}
- University: ${university}
- Subject: ${subject}
${topic ? `- Specific Topic: ${topic}` : ''}
- Learning Mode: ${mode}

Pedagogical Directives:
1. Medical Accuracy & Responsible Teaching:
   - Always adhere to verified standard medical physiology, anatomy, pharmacology, pathology, and clinical science.
   - Clarify high-yield concepts clearly so 100L to Final Year medical students understand both the fundamentals and clinical nuances.
   - Include realistic Nigerian epidemiological context where relevant (e.g., Sickle Cell Anemia / HbSS, Malaria, Typhoid, Hypertension, Maternal & Child health in West Africa, Tuberculosis, Tropical infectious diseases).

2. Structural Format for Answers:
   - **Executive Summary / Quick Concept**: Explain it in simple, intuitive language first.
   - **Step-by-Step Mechanism / Detailed Breakdown**: Clear physiological, anatomical, biochemical or pharmacological pathways.
   - **High-Yield Clinical Vignette or Example**: Real-world clinical presentation or hospital ward application.
   - **High-Yield Mnemonic or Memory Anchor**: Memorable acronym or clinical cue for exams (e.g., 2nd MB, in-course exams, Final MB viva).
   - **Text-based Summary Table / Flowchart**: Format clean Markdown tables or ASCII flow diagrams when comparing mechanisms or drug classes.
   - **Revision Check (2-3 Rapid Exam Questions)**: 2 multiple-choice or short-answer review questions with concise rationale for self-testing.
   - **Educational Reminder**: Brief disclaimer advising verification with current Nigerian faculty syllabus and standard textbooks (e.g., Guyton & Hall, Snell's Clinical Anatomy, Robbins Pathology, Katzung Pharmacology).

Tone: Encouraging, authoritative, intellectually rigorous yet easily accessible, professional Nigerian medical educator style.
`;

    // Build contents from history and current prompt
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'ai' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    // Add current user prompt with mode instruction
    let userPromptWithContext = message;
    if (mode === 'simple') {
      userPromptWithContext = `[MODE: Simple & Beginner-Friendly]: ${message}`;
    } else if (mode === 'clinical') {
      userPromptWithContext = `[MODE: Deep Clinical & Ward Rounds]: ${message}`;
    } else if (mode === 'mnemonic') {
      userPromptWithContext = `[MODE: Mnemonics & High-Yield Memory Anchors]: ${message}`;
    } else if (mode === 'exam') {
      userPromptWithContext = `[MODE: Exam Practice & Viva Prep]: ${message}`;
    }

    contents.push({ role: 'user', parts: [{ text: userPromptWithContext }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Unable to generate response at this time.';

    return res.json({
      text: reply,
      model: 'gemini-3.8-flash',
      source: 'live_ai',
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: error?.message || 'An error occurred while communicating with the AI service.',
    });
  }
});

// Configure Vite middleware in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NESYRINGE AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
