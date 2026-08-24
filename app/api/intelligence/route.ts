import { NextRequest } from "next/server";

type ClientMessage = { role: "user" | "assistant"; text: string };

const SYSTEM = `You are M2A Intelligence, the cognitive interface of Ahmed Abdelkhalek's digital operating system.
You are a capable general-purpose AI: answer factual, scientific, technical, strategic and everyday questions directly and accurately.
You are also an enterprise systems architect. When a visitor describes an organizational problem, diagnose the workflow, identify data and decision bottlenecks, and propose a concise implementable system architecture.
Ahmed Abdelkhalek is a digital transformation engineer, full-stack developer, automation systems architect and creator of M2A Digital OS. His work connects websites, apps, AI agents, CRM, APIs, messaging, data and event-driven automation.
Never pretend to have live access to private company data. Never invent Ahmed's achievements. Be clear, premium, concise, and reply in the user's language.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error:"OPENAI_API_KEY is not configured" }, { status:503 });
  const body = await request.json() as { messages?: ClientMessage[]; language?: "ar" | "en" };
  const messages = (body.messages || []).slice(-12).filter(message => message && typeof message.text === "string" && message.text.trim()).map(message => ({ role:message.role, content:message.text.slice(0,4000) }));
  if (!messages.length) return Response.json({ error:"A message is required" }, { status:400 });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method:"POST",
    headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
    body:JSON.stringify({ model:process.env.OPENAI_MODEL || "gpt-5.6", instructions:SYSTEM, input:messages, max_output_tokens:700 })
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("M2A Intelligence API error", response.status, detail.slice(0,500));
    return Response.json({ error:"The intelligence core could not answer right now" }, { status:502 });
  }
  const result = await response.json();
  const text = result.output_text || result.output?.flatMap((item:{content?:Array<{type:string;text?:string}>})=>item.content||[]).find((item:{type:string;text?:string})=>item.type==="output_text")?.text;
  return Response.json({ text:text || (body.language==="ar"?"لم أتمكن من تكوين إجابة الآن.":"I could not synthesize an answer right now.") });
}
