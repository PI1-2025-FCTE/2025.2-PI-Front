import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, BlendMode, PDFPage } from "pdf-lib";

interface ReportPayload {
  markdown: string;
  mapImage: string | null; 
}

export const dynamic = "force-dynamic";

const ORANGE = rgb(0.9, 0.35, 0.1);
const BLACK = rgb(0, 0, 0);
const GRAY = rgb(0.9, 0.9, 0.9); 

export async function POST(req: NextRequest) {
  try {

    const { markdown, mapImage }: ReportPayload = await req.json();

    if (!markdown && !mapImage) {
      return NextResponse.json({ error: "Markdown or image required" }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    let page: PDFPage = pdfDoc.addPage([595, 842]); 

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800; 
    const margin = 30; 
    if (mapImage) {
      const mapTitle = "Mapa do Trajeto";

      page.drawText(mapTitle, {
        x: margin,
        y,
        size: 18,
        font: fontBold,
        color: BLACK,
      });

      y -= 25; 

      let image;
      if (mapImage.startsWith("data:image/png")) {
        const pngBytes = Buffer.from(mapImage.split(",")[1], "base64");
        image = await pdfDoc.embedPng(pngBytes);
      } else if (mapImage.startsWith("data:image/jpeg")) {
        const jpgBytes = Buffer.from(mapImage.split(",")[1], "base64");
        image = await pdfDoc.embedJpg(jpgBytes);
      }

      if (image) {
        const pageWidth = page.getWidth();
        const maxImageWidth = pageWidth - 2 * margin; 
        
        const desiredScale = 0.7; 
        const { width, height } = image.scale(desiredScale); 
        
        const mapBoxHeight = height + 40; 
        const mapBoxWidth = maxImageWidth;
        const mapBoxY = y - mapBoxHeight;

        page.drawRectangle({
            x: margin,
            y: mapBoxY,
            width: mapBoxWidth,
            height: mapBoxHeight,
            color: GRAY, 
            borderColor: rgb(0.8, 0.8, 0.8),
            borderWidth: 1,
        });

        const imgWidth = width - 20 > 0 ? width - 20 : width;
        const imgHeight = height - 20 > 0 ? height - 20 : height;

        page.drawImage(image, {
          x: margin + 10, 
          y: mapBoxY + 10,
          width: imgWidth,
          height: imgHeight,
          opacity: 1,
          blendMode: BlendMode.Normal,
        });

        y = mapBoxY - 20; 
      }
    }

    if (markdown) {
        
      const instructionsTitle = "Instruções do Carrinho";
      page.drawText(instructionsTitle, {
        x: margin,
        y: y,
        size: 18, 
        font: fontBold,
        color: BLACK, 
      });

      y -= 30; 

      const lines = markdown.split("\n").filter(line => line.trim() !== "");
      const fontSize = 14; 
      const lineHeight = fontSize + 5;

      for (const line of lines) {
        if (y < margin + 50) { 
          page = pdfDoc.addPage([595, 842]);
          y = 800;
        }

        page.drawText(line, {
          x: margin,
          y: y,
          size: fontSize,
          font: fontRegular,
          color: BLACK,
        });
        y -= lineHeight;
      }
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=relatorio.pdf",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}