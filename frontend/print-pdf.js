import puppeteer from "puppeteer";
import path from "path";

(async () => {
  const browser = await puppeteer.launch({ protocolTimeout: 120000 });
  const page = await browser.newPage();

  const filePath = `file://${path.resolve("resume.html")}`;

  await page.goto(filePath, { waitUntil: "networkidle0", timeout: 120000 });

  await page.pdf({
    path: "public/LankaDurga_Resume.pdf",
    format: "Letter",
    printBackground: true,
    margin: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
    },
  });

  await browser.close();
  console.log("PDF created successfully at public/LankaDurga_Resume.pdf");
})();
