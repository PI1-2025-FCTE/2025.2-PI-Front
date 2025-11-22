import { marked } from "marked";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  try {
    const { markdown, mapImage } = await request.json();

    if (!markdown) {
      return new Response(
        JSON.stringify({ error: "Markdown is required" }),
        { status: 400 }
      );
    }

    let imageHTML = "";
    if (mapImage) {
      imageHTML = `
        <h1>Mapa do Trajeto</h1>
        <img src="${mapImage}" style="width: 100%; max-width: 700px; border:1px solid #ccc; border-radius:8px;" />
        <hr />
      `;
    }

    // Converte Markdown para HTML
    const html = `
      <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 30px;
                line-height: 1.5;
              }
              h1, h2, h3 {
                color: #F26416;
              }
              
              code {
                background: #eee;
                padding: 3px;
                border-radius: 4px;
              }
            </style>
          </head>
        <body>
          ${imageHTML}
          ${marked(markdown)}
        </body>
      </html>
    `;

    // Cria PDF com Puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=relatorio.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF" }),
      { status: 500 }
    );
  }
}
