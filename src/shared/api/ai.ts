const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GroqChoice {
  message: { content: string }
}

interface GroqResponse {
  choices: GroqChoice[]
}

async function groqRequest(messages: GroqMessage[], apiKey: string, temperature = 0.3): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: MODEL, messages, temperature }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq API error ${res.status}: ${err.slice(0, 200)}`)
  }

  const data: GroqResponse = await res.json()
  return data.choices[0].message.content.trim()
}

export async function improveText(text: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You help improve task descriptions. Make the text clearer, more structured, and more professional. Preserve the original meaning. Reply only with the improved text, no extra commentary.' },
    { role: 'user', content: text },
  ], apiKey, 0.3)
}

export async function makeStructured(text: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You restructure text as a clear bullet-point list. Each point on a new line starting with "-". Preserve all key information. Reply only with the list.' },
    { role: 'user', content: text },
  ], apiKey, 0.3)
}

export async function describeImage(dataUrlOrName: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You suggest a brief description for an image based on its filename or context. Provide 2-3 sentences describing what the image might contain. Be creative but plausible.' },
    { role: 'user', content: `Image context: ${dataUrlOrName}` },
  ], apiKey, 0.3)
}

export async function suggestCaption(dataUrlOrName: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You suggest a short, engaging caption for an image (1 sentence). Make it descriptive and appealing.' },
    { role: 'user', content: `Image context: ${dataUrlOrName}` },
  ], apiKey, 0.3)
}

export async function improveTableStructure(jsonData: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You are a data formatting assistant. Given a table as a JSON array of rows (arrays of strings), suggest a better structure: clearer column order, better row grouping, improved formatting. Reply ONLY with a JSON array of rows — no explanations.' },
    { role: 'user', content: jsonData },
  ], apiKey, 0.3)
}

export async function explainTableData(jsonData: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You explain table data in simple plain language (3-5 sentences). Describe what the data shows, highlight patterns, and summarize key insights. Avoid jargon.' },
    { role: 'user', content: jsonData },
  ], apiKey, 0.3)
}

export async function describeDrawing(drawingContext: string | undefined, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'Describe a simple drawing or sketch in 2-3 sentences. If the drawing has content, analyze it. If blank, suggest 2-3 simple things someone could draw to get started.' },
    { role: 'user', content: drawingContext || 'blank canvas' },
  ], apiKey, 0.3)
}

export async function suggestImprovements(concept: string, apiKey: string): Promise<string> {
  return groqRequest([
    { role: 'system', content: 'You give creative but practical suggestions. Given a concept or theme, suggest 2-3 specific ways to improve, expand, or refine it. Reply in 3-5 sentences.' },
    { role: 'user', content: concept || 'a simple sketch' },
  ], apiKey, 0.4)
}

export async function splitIntoSubtasks(context: string, apiKey: string): Promise<string[]> {
  const response = await groqRequest([
    { role: 'system', content: 'Break down the given task into 4-7 specific subtasks. Reply ONLY with a valid JSON array of strings. Example: ["Subtask 1", "Subtask 2", "Subtask 3"]' },
    { role: 'user', content: context },
  ], apiKey, 0.5)

  try {
    const parsed = JSON.parse(response)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((s: string) => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
    }
  } catch {
    const lines = response.split('\n')
      .map(s => s.replace(/^\d+[.)]\s*/, '').replace(/^[-•*]\s*/, '').trim())
      .filter(s => s.length > 0)
    if (lines.length > 0) return lines
  }

  return ['Could not parse subtasks']
}
