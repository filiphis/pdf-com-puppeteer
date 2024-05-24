import puppeteer from "puppeteer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { getPageHeight } from "./utils/getPageHeight.ts";
import { OpportunityProps } from "./types/types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataToSendToHTML: Pick<
  OpportunityProps,
  | "clientName"
  | "CNPJ"
  | "liquidationType"
  | "hasAutomaticAnticipation"
  | "date"
  | "hasPixActive"
  | "hasExemptionByVolume"
  | "paymentModel"
  | "stoneBankingEnabled"
> = {
  clientName: "ECOCENTER MAIS",
  date: "18 de janeiro de 2024",
  CNPJ: "49.193.398/0001-80",
  liquidationType: "todo_dia",
  hasPixActive: false,
  hasExemptionByVolume: true,
  paymentModel: "monthly",
  stoneBankingEnabled: true,
  hasAutomaticAnticipation: true,

  // visa: {},
  // master: {},
  // elo: {},
  // hiper: {},
  // amex: {},
};

export const createPdf = async (pdfName: string) => {
  // Tempo inicial da função;
  const inicio = performance.now();
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    // args: [
    //   "--no-sandbox",
    //   "--disable-setuid-sandbox, '--font-render-hinting=none'",
    // ],
  });

  // Create a new page
  const page = await browser.newPage();

  // EJS para manipular o HTML:

  //Get HTML content from HTML file
  // const html = fs.readFileSync('sample.html', 'utf-8');
  // "./src/sample.html"
  const htmltoReadPath = path.join(__dirname, "sample.ejs");
  const htmlToConvert = fs.readFileSync(htmltoReadPath, "utf-8");

  const template = ejs.compile(htmlToConvert);
  const html = template(dataToSendToHTML);

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  const pdfHeight = `${await getPageHeight(page)}px`;
  console.log("pdfHeight", pdfHeight);

  // Downlaod the PDF
  const pdf = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
    width: "360px",
    height: pdfHeight,
  });

  fs.writeFileSync(`${pdfName}.pdf`, pdf);

  // Close the browser instance
  await browser.close();

  // Tempo final da função
  const fim = performance.now();
  console.log("Tempo de execução: ", fim - inicio, " milissegundos");
};
