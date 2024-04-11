import puppeteer from 'puppeteer';
import fs from 'fs';
import handlebars from "handlebars";
import path from 'path';

export const createPdf = async () => {
  console.log(':::: createPdf ::::')

  // Create a browser instance
  // const browser = await puppeteer.launch({ headless: true, ignoreDefaultArgs: ['--disable-extensions'], args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  const browser = await puppeteer.launch();

  // Create a new page
  console.log(':::: before: browser.newPage ::::')
  const page = await browser.newPage();
  console.log(':::: browser.newPage ::::')

  // Handlebars para manipular o HTML:
  const dataSendToHTML = {
    hasUser: true,
    name: 'Luiz',
    lastname: 'Silveira'
  }

  console.log('dirname: ', __dirname)
  const htmlToConvert = fs.readFileSync('./sample.html', 'utf-8');
  const template = handlebars.compile(htmlToConvert);
  const html = template(dataSendToHTML);


  //Get HTML content from HTML file
  // const html = fs.readFileSync('sample.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
}