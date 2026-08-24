import { NextRequest } from "next/server";

type ClientMessage = {
  role: "user" | "assistant";
  text: string;
};

const SYSTEM = `
You are M2A Intelligence, the cognitive interface of Ahmed Abdelkhalek's digital operating system.

You are a capable general-purpose AI:
- Answer factual, scientific, technical, strategic and everyday questions accurately.
- Act as an enterprise systems architect.
- When a visitor describes an organizational problem, diagnose workflows, data bottlenecks and propose implementable architecture.

Ahmed Abdelkhalek is a digital transformation engineer, full-stack developer, automation systems architect and creator of M2A Digital OS.

Never invent achievements.
Never claim access to private company data.
Be clear, premium, concise, and reply in the user's language.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json() as {
      messages?: ClientMessage[];
      language?: "ar" | "en";
    };

    const messages = (body.messages || [])
      .slice(-12)
      .filter(
        (m) =>
          m &&
          typeof m.text === "string" &&
          m.text.trim()
      );

    if (!messages.length) {
      return Response.json(
        { error: "A message is required" },
        { status: 400 }
      );
    }


    const contents = messages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.text.slice(0, 4000),
        },
      ],
    }));


    const model =
      process.env.GEMINI_MODEL || "gemini-2.5-flash";


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          systemInstruction:{
            parts:[
              {
                text:SYSTEM
              }
            ]
          },

          contents,

          generationConfig:{
            maxOutputTokens:700,
            temperature:0.7
          }
        })
      }
    );


    if(!response.ok){

      const error = await response.text();

      console.error(
        "Gemini Error:",
        response.status,
        error
      );

      return Response.json(
        {
          error:"The intelligence core could not answer right now"
        },
        {
          status:502
        }
      );
    }


    const result = await response.json();


    const text =
      result?.candidates?.[0]?.content?.parts
      ?.map((p:{text?:string})=>p.text || "")
      .join("")
      .trim();


    return Response.json({
      text:
        text ||
        (
          body.language === "ar"
          ? "لم أتمكن من تكوين إجابة الآن."
          : "I could not synthesize an answer right now."
        )
    });


  } catch(error){

    console.error(
      "M2A Intelligence Server Error",
      error
    );

    return Response.json(
      {
        error:"Internal server error"
      },
      {
        status:500
      }
    );
  }
}
