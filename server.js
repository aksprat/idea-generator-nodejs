require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

app.post('/generate', async (req, res) => {
    const { domain, context } = req.body;
    const agentEndpoint = process.env.AGENT_ENDPOINT;
    const chatbotId = process.env.CHATBOT_ID;

    const prompt = `Generate innovative ideas for the ${domain} domain, considering the following context: ${context}.`; // Modify this prompt to fit your agent's capabilities.

    try {
        const response = await fetch(agentEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatbot_id: chatbotId,
                messages: [{ role: "user", content: prompt }]
            }),
        });

        const data = await response.json();
        console.log('Agent Response:', JSON.stringify(data, null, 2)); // Debugging
        const agentResponse = data.response.content; // Adjust this based on your agent's response structure.
        res.json({ response: agentResponse });
    } catch (error) {
        console.error('Error calling agent:', error);
        res.status(500).json({ error: 'Failed to generate ideas.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
