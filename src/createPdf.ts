import puppeteer from "puppeteer";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { getPageHeight } from "./helpers/getPageHeight.ts";
import { OpportunityProps } from "./types/types.ts";
import { handleRequestBody } from "./helpers/handleRequestBody.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPdf = async (opportunityData: OpportunityProps) => {
  const {
    clientName,
    CNPJ,
    hasAutomaticAnticipation,
    RentFreeTransactionAmount,
    hasExemptionByVolume,
    hasPixActive,
    stoneBankingEnabled,
    ipvCondition,
    liquidationType,
    productQuantity,
    pixQRCodeFee,
    monthlyPayment,
    automaticAnticipationFee,
    spotAnticipationFee,
    paymentModel,
    installmentsValue,
    todayDate,
    visa,
    master,
    elo,
    hiper,
    amex,
  } = handleRequestBody(opportunityData);

  // Tempo inicial da função;
  const inicio = performance.now();
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox, '--font-render-hinting=none'",
    ],
  });

  // Create a new page
  const page = await browser.newPage();

  // EJS para manipular o HTML:

  //Get HTML content from HTML file
  // const html = fs.readFileSync('sample.html', 'utf-8');
  // "./src/sample.html"
  const htmltoReadPath = path.join(__dirname, "proposalPdfTemplate.ejs");
  const htmlToConvert = fs.readFileSync(htmltoReadPath, "utf-8");

  const template = ejs.compile(htmlToConvert);
  const html = template({
    clientName,
    CNPJ,
    hasAutomaticAnticipation,
    RentFreeTransactionAmount,
    hasExemptionByVolume,
    hasPixActive,
    stoneBankingEnabled,
    ipvCondition,
    liquidationType,
    productQuantity,
    pixQRCodeFee,
    monthlyPayment,
    automaticAnticipationFee,
    spotAnticipationFee,
    paymentModel,
    installmentsValue,
    todayDate,
    visa,
    master,
    elo,
    hiper,
    amex,
  });

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

  fs.writeFileSync(`proposalPdf.pdf`, pdf);

  // Close the browser instance
  await browser.close();

  // Tempo final da função
  const fim = performance.now();
  console.log("Tempo de execução: ", fim - inicio, " milissegundos");
};
