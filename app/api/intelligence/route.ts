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

Rules:
- Never invent achievements.
- Never claim access to private company data.
- Be clear, premium, concise.
- Reply in the user's language.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log(
      "Gemini Key Loaded:",
      Boolean(apiKey)
    );

    if (!apiKey) {
      return Response.json(
        {
          error: "GEMINI_API_KEY is missing on server"
        },
        {
          status: 503
        }
      );
    }


    const body = await request.json() as {
      messages?: ClientMessage[];
      language?: "ar" | "en";
    };


    const messages =
      (body.messages || [])
      .filter(
        (message) =>
          message &&
          typeof message.text === "string" &&
          message.text.trim()
      )
      .slice(-12);



    if (!messages.length) {
      return Response.json(
        {
          error: "Message required"
        },
        {
          status:400
        }
      );
    }



    const contents = messages.map((message)=>({

      role:
        message.role === "assistant"
        ? "model"
        : "user",

      parts:[
        {
          text:
          message.text.slice(0,4000)
        }
      ]

    }));



    const model =
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";



    const gemini =
      await fetch(

        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,

        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          cache:"no-store",

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
              temperature:0.7,
              maxOutputTokens:900
            }

          })
        }

      );



    const raw =
      await gemini.text();



    if(!gemini.ok){

      console.error(
        "Gemini Response Error:",
        raw
      );


      return Response.json(
        {
          error:raw
        },
        {
          status:502
        }
      );
    }



    const result =
      JSON.parse(raw);



    const text =
      result
      ?.candidates?.[0]
      ?.content?.parts
      ?.map(
        (part:{text?:string}) =>
        part.text || ""
      )
      .join("")
      .trim();



    return Response.json(
      {
        text:
          text ||
          (
            body.language === "ar"
            ?
            "لم يتم إنشاء رد."
            :
            "No response generated."
          )
      },
      {
        headers:{
          "Cache-Control":"no-store"
        }
      }
    );



  } catch(error){

    console.error(
      "M2A Intelligence Error:",
      error
    );


    return Response.json(
      {
        error:
        error instanceof Error
        ? error.message
        : "Unknown server error"
      },
      {
        status:500
      }
    );

  }
}
