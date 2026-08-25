import { NextRequest, NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const paragraphs = content
      .replace(/<[^>]*>/g, "")
      .split("\n")
      .map(
        (text: string) =>
          new Paragraph({
            children: [
              new TextRun({
                text,
              }),
            ],
          }),
      );

    const document = new Document({
      sections: [
        {
          children: paragraphs,
        },
      ],
    });

    const buffer = await Packer.toBuffer(document);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          title || "document",
        )}.docx"`,
      },
    });
  } catch (error) {
    console.error("DOCX export error:", error);

    return NextResponse.json(
      { error: "Failed to generate DOCX" },
      { status: 500 },
    );
  }
}
