import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // AI API (OpenAI эсвэл Gemini)-д илгээх хүсэлтийн жишээ:
    // const response = await openai.chat.completions.create({...})

    const aiReply = `"${prompt}" асуултын дагуу: Дасгал хийхдээ биеийн халаалтыг 5-10 минут заавал хийж, хөдөлгөөний biên độ болон амьсгалыг зөв тохируулах нь бэртлээс сэргийлнэ.`;

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}