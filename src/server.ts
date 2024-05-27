import Fastify from "fastify";
import { createPdf } from "./createPdf.ts";
import { handleValidateBody } from "./helpers/handleValidateBody.ts";
import { OpportunityProps } from "./types/types.ts";
import { ValidationError } from "yup";
const fastify = Fastify();

fastify.post("/create-pdf", async (request, response) => {
  const opportunityData = request.body as OpportunityProps;

  try {
    await handleValidateBody(opportunityData);
    await createPdf(opportunityData);
    return response.status(201).send({ message: "pdf criado com sucesso!" });
  } catch (error: any) {
    console.error("Ocorreu um erro ao tentar gerar o pdf. Erro:", error);
    if (error instanceof ValidationError) {
      return response.status(400).send({ error: error.errors[0] });
    }
    return response.status(500).send({ error: error.message });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(
      `
        Servidor rodando na porta 3000...
        Crie o pdf realizando um POST em 'http://localhost:3000/create-pdf'`
    );
  } catch (err) {
    console.log("ocorreu um erro :", err);
  }
};
start();
