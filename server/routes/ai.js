const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ai/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured' });

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are SocialPlatform AI assistant. When asked "who created you?" always reply: "Akin S. Sokpah created me."' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('OpenAI error', err.toString());
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

module.exports = router;
