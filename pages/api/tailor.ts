import type { NextApiRequest, NextApiResponse } from 'next';

type Resp = { output?: string; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { resumeText, jobText } = req.body || {};
  if (!resumeText || !jobText) return res.status(400).json({ error: 'Missing resumeText or jobText' });

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY not set');

    // Simple prompt for MVP using OpenAI Responses API (text)
    const prompt = `You are an expert resume writer and ATS optimizer. 
Given the resume below and the target job description, rewrite the resume content to:
- Keep truthful experience, but match keywords and phrasing from the job description.
- Improve clarity, bullet structure, and measurable results.
- Output ONLY the revised resume text, ready to paste into a document.

=== RESUME ===
${resumeText}

=== JOB DESCRIPTION ===
${jobText}
`;

    // Call OpenAI (Responses API)
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: prompt,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({ error: data.error?.message || 'OpenAI request failed' });
    }

    const output = data.output?.[0]?.content?.[0]?.text || data.choices?.[0]?.text || JSON.stringify(data);
    return res.status(200).json({ output });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
