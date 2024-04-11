import puppeteer from "puppeteer";
import fs from "fs";
import handlebars from "handlebars";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataSendToHTML = {
  hasUser: true,
  firstName: "Luiz",
  lastName: "Silveira",
  batata: false,
};

export const createPdf = async (pdfName: string) => {
  // Tempo inicial da função;
  const inicio = performance.now();
  // Create a browser instance
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   ignoreDefaultArgs: ["--disable-extensions"],
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  // });
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  // Create a new page
  const page = await browser.newPage();

  // Handlebars para manipular o HTML:

  //Get HTML content from HTML file
  // const html = fs.readFileSync('sample.html', 'utf-8');
  // "./src/sample.html"
  const htmltoReadPath = path.join(__dirname, "sample.html");
  const htmlToConvert = fs.readFileSync(htmltoReadPath, "utf-8");

  const template = handlebars.compile(htmlToConvert);
  const html = template(dataSendToHTML);

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    printBackground: true,
    width: "360px",
  });

  fs.writeFileSync(`${pdfName}.pdf`, pdf);

  // Close the browser instance
  await browser.close();

  // Tempo final da função
  const fim = performance.now();
  console.log("Tempo de execução: ", fim - inicio, " milissegundos");
};
