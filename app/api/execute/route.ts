import { promptTemplate } from "@/libs/promptTemplate";
import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const {
    OPENAI_API_KEY,
    NEXT_PUBLIC_APP_URL: APP_URL,
    RESTAURANT_SEARCH_API_URL: RESTAURANT_URL,
  } = process.env;

  if (!OPENAI_API_KEY || !APP_URL || !RESTAURANT_URL) {
    return NextResponse.json(
      { error: "Missing environment variables for API access." },
      { status: 500 }
    );
  }

  const client = new OpenAI({ apiKey: OPENAI_API_KEY });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { message } = body;
  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Message is required and must be a string." },
      { status: 400 }
    );
  }

  const openAiPrompt = promptTemplate(message);

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: openAiPrompt }],
    });

    const outputText = completion.choices[0]?.message?.content?.trim();

    if (!outputText) {
      return NextResponse.json(
        { error: "Empty response from OpenAI." },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(outputText);

      console.log(parsed);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse OpenAI response as JSON.", raw: outputText },
        { status: 500 }
      );
    }

    try {
      const { data, status } = await axios.post(
        `${APP_URL}/${RESTAURANT_URL}`,
        parsed,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return NextResponse.json(data, { status });
    } catch (axiosError: any) {
      console.error("Axios POST failed:", axiosError);
      return NextResponse.json(
        {
          error: "Failed to forward request to restaurant API.",
          details: axiosError?.response?.data || axiosError.message,
        },
        { status: axiosError?.response?.status || 500 }
      );
    }
  } catch (openAIError: any) {
    console.error("OpenAI API Error:", openAIError);
    return NextResponse.json(
      {
        error: "OpenAI API call failed.",
        details: openAIError?.response?.data || openAIError.message,
      },
      { status: openAIError?.response?.status || 500 }
    );
  }
}
