import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a helpful customer support agent for a fictional e-commerce store.

Store policies:
- Shipping: Worldwide shipping. USA delivery in 5–7 business days.
- Returns: 30-day return and refund policy.
- Support hours: Monday to Friday, 9am–6pm IST.

Answer clearly and concisely.
`;

export async function generateReply(
    history: { sender: string; text: string }[],
    userMessage: string
): Promise<string> {
    try {
        const messages = [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            ...history.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
            })),
            { role: 'user', parts: [{ text: userMessage }] },
        ];

        const res = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: messages,
        });

        return res.text || 'Sorry, I could not generate a response.';
    } catch (err) {
        console.error('LLM error:', err);
        return 'Sorry, something went wrong. Please try again later.';
    }
}
