import { Page } from "puppeteer";

export const getPageHeight = async (page: Page) => {
  const bodyHandle = await page.$("body");

  const bodyHeight = await page.evaluate(
    (body) => Math.max(body.scrollHeight, body.offsetHeight),
    bodyHandle
  );
  await bodyHandle?.dispose();

  const htmlHandle = await page.$("html");

  const htmlHeight = await page.evaluate(
    (html) => Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight),
    htmlHandle
  );
  await htmlHandle?.dispose();

  return Math.max(bodyHeight, htmlHeight);
};
