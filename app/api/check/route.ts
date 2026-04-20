export async function POST(req) {
  const { sentence } = await req.json();

  const prompt = `
You are a Spanish tutor.

User sentence:
"${sentence}"

Return:
1. Corrected sentence
2. Short explanation

Respond in JSON:
{
  "correction": "...",
  "explanation": "..."
}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  try {
    return Response.json(JSON.parse(text));
  } catch {
    return Response.json({ correction: text, explanation: "" });
  }
}