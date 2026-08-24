import { NextRequest } from "next/server";

type ClientMessage = {
  role: "user" | "assistant";
  text: string;
};

const SYSTEM = `
You are M2A Intelligence, the cognitive interface of Ahmed Abdelkhalek's digital operating system.

Your role:
- Answer general knowledge, scientific, technical, business and strategic questions accurately.
- Act as an enterprise systems architect.
- When users describe business problems, analyze workflows, data flow, bottlenecks and propose practical digital architectures.

Context:
Ahmed Abdelkhalek is a digital transformation engineer, full-stack developer, automation systems architect and creator of M2A Digital OS.

Rules:
- Never invent achievements.
- Never claim access to private company systems or data.
- Never pretend to have real-time access unless provided.
- Keep answers premium, clear and concise.
- Always answer in the user's language.
`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error: "GEMINI_API_KEY is missing"
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


    const language =
      body.language === "ar"
        ? "Arabic"
        : "English";


    const messages =
      (body.messages || [])
        .filter(
          (m) =>
            m &&
            typeof m.text === "string" &&
            m.text.trim().length > 0
        )
        .slice(-10);



    if (!messages.length) {
      return Response.json(
        {
          error:"No message provided"
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
            message.text.slice(0,3500)
        }
      ]

    }));



    const model =
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";



    const geminiResponse =
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
                  text:
                  `${SYSTEM}

Respond language:
${language}`
                }
              ]
            },


            contents,


            generationConfig:{
              temperature:0.7,
              maxOutputTokens:900,
              topP:0.95
            }

          })
        }

      );



    if(!geminiResponse.ok){

      const errorText =
        await geminiResponse.text();


      console.error(
        "Gemini API Error:",
        errorText
      );


      return Response.json(
        {
          error:
          "AI service unavailable"
        },
        {
          status:502
        }
      );

    }



    const data =
      await geminiResponse.json();



    const answer =
      data?.candidates?.[0]
      ?.content?.parts
      ?.map(
        (part:{text?:string}) =>
          part.text || ""
      )
      .join("")
      .trim();



    if(!answer){

      return Response.json({

        text:
          body.language === "ar"
          ?
          "لم أتمكن من إنشاء إجابة حالياً."
          :
          "I could not generate an answer."

      });

    }



    return Response.json({

      text:answer

    });



  } catch(error){

    console.error(
      "M2A Intelligence Error:",
      error
    );


    return Response.json(
      {
        error:
        "Server error"
      },
      {
        status:500
      }
    );

  }
}
