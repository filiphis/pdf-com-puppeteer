import Fastify from "fastify";
import { createPdf } from "./createPdf.ts";
const fastify = Fastify();

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/create-pdf", async (request, reply) => {
  try {
    await createPdf("nomePdf");
    return { mensagem: "pdf criado com sucesso!" };
  } catch (error) {
    console.log("Erro ao criar o PDF: ", error);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Servidor rodando...`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
