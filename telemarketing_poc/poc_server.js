require('dotenv').config();
const express = require('express');
const { VoiceResponse } = require('twilio').twiml;
const { VertexAI } = require('@google-cloud/vertexai');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();
app.use(express.urlencoded({ extended: true }));

// --- Initialize Google Clients ---
// Vertex AI Client
const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: process.env.GCP_LOCATION,
});
const geminiModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-flash-001', // Specify a valid Vertex AI model
});

// Google Cloud Text-to-Speech Client
const ttsClient = new TextToSpeechClient();

// --- System Configuration ---
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
app.use('/public', express.static(publicDir));


/**
 * Calls the Vertex AI Gemini API with a retry mechanism.
 * @param {string} userSpeech The user's transcribed speech.
 * @param {number} maxRetry The maximum number of retries.
 * @returns {Promise<string>} The generated text response from Gemini.
 */
async function callVertexAIGeminiWithRetry(userSpeech, maxRetry = 3) {
  const prompt = `あなたは、日本の特定商取引法を遵守する、礼儀正しく優秀なAIアシスタントです。
  ユーザーの発言に対して、自然で簡潔な応答を返してください。
  
  ユーザーの発言: "${userSpeech}"`;

  const request = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  };

  for (let i = 0; i < maxRetry; i++) {
    try {
      const result = await geminiModel.generateContent(request);
      // Assuming the response structure provides a direct text() method or similar
      // This might need adjustment based on the actual Vertex AI SDK response object
      const responseText = result.response.candidates[0].content.parts[0].text;
      return responseText;
    } catch (e) {
      // Error handling might need to be adapted for Vertex AI's specific error codes
      const isServiceUnavailable = e.message.includes('503') || e.code === 14; // 14 is UNAVAILABLE in gRPC
      if (isServiceUnavailable && i < maxRetry - 1) {
        console.log(`Vertex AI API is unavailable, retrying... (${i + 1}/${maxRetry})`);
        await new Promise(r => setTimeout(r, 2000)); // 2-second wait
      } else {
        console.error('Error calling Vertex AI API:', e);
        throw e;
      }
    }
  }
}

/**
 * Entry point for incoming Twilio calls.
 */
app.post('/voice', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.play(`${process.env.BASE_URL}/public/greeting.mp3`);
  twiml.gather({
    input: 'speech',
    action: '/handle-response',
    speechTimeout: 'auto',
    language: 'ja-JP',
  });
  res.type('text/xml').send(twiml.toString());
});

/**
 * Handles the user's spoken response.
 */
app.post('/handle-response', async (req, res) => {
  const userSpeech = req.body.SpeechResult;
  const twiml = new VoiceResponse();

  try {
    if (!userSpeech) {
      twiml.say({ language: 'ja-JP' }, '音声が聞き取れませんでした。もう一度お話しください。');
      twiml.gather({ input: 'speech', action: '/handle-response', speechTimeout: 'auto', language: 'ja-JP' });
      return res.type('text/xml').send(twiml.toString());
    }

    const aiResponseText = await callVertexAIGeminiWithRetry(userSpeech);
    console.log(`User: "${userSpeech}" -> AI: "${aiResponseText}"`);

    const ttsRequest = {
      input: { text: aiResponseText },
      voice: { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-C' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);

    const audioFileName = `response_${Date.now()}.mp3`;
    const audioFilePath = path.join(publicDir, audioFileName);
    await util.promisify(fs.writeFile)(audioFilePath, ttsResponse.audioContent, 'binary');
    
    const publicUrl = `${process.env.BASE_URL}/public/${audioFileName}`;
    twiml.play(publicUrl);

    twiml.gather({
      input: 'speech',
      action: '/handle-response',
      speechTimeout: 'auto',
      language: 'ja-JP',
    });

    res.type('text/xml').send(twiml.toString());

  } catch (error) {
    console.error('An error occurred in /handle-response:', error);
    twiml.say({ language: 'ja-JP' }, '申し訳ありません��システムエラーが発生しました。');
    res.type('text/xml').send(twiml.toString());
  }
});

/**
 * Pre-generates the initial greeting audio file.
 */
async function generateGreeting() {
    const greetingText = "こんにちは。こちらは株式会社テストより、AIアシスタントのサクラがご連絡いたしました。";
    const greetingPath = path.join(publicDir, 'greeting.mp3');

    if (fs.existsSync(greetingPath)) {
        console.log('Greeting file already exists.');
        return;
    }
    try {
        console.log('Generating greeting audio file...');
        const request = {
            input: { text: greetingText },
            voice: { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-D' },
            audioConfig: { audioEncoding: 'MP3' },
        };
        const [response] = await ttsClient.synthesizeSpeech(request);
        fs.writeFileSync(greetingPath, response.audioContent, 'binary');
        console.log(`Greeting audio file saved to ${greetingPath}`);
    } catch (error) {
        console.error('Failed to generate greeting audio:', error);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await generateGreeting();
  console.log('---');
  console.log('System using Vertex AI is ready.');
  console.log('1. Create/configure your .env file with GCP_PROJECT_ID and GCP_LOCATION.');
  console.log('2. Ensure Google Cloud authentication is set up (GOOGLE_APPLICATION_CREDENTIALS).');
  console.log('3. Use ngrok to expose this server.');
  console.log('4. Configure your Twilio webhook.');
  console.log('---');
});
