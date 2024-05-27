import * as yup from "yup";
import { OpportunityProps } from "../types/types.ts";

const opportunitySchema = yup.object().shape({
  clientName: yup.string().required(),
  CNPJ: yup.string().required(),
  hasAutomaticAnticipation: yup.boolean().required(),
  RentFreeTransactionAmount: yup.number().required(),
  hasExemptionByVolume: yup.boolean().required(),
  hasPixActive: yup.boolean().required(),
  stoneBankingEnabled: yup.boolean().required(),
  ipvCondition: yup.string().optional(),
  liquidationType: yup.string().optional(),
  productQuantity: yup.number().required(),
  pixQRCodeFee: yup.number().required(),
  monthlyPayment: yup.number().required(),
  automaticAnticipationFee: yup.number().required(),
  spotAnticipationFee: yup.number().required(),
  paymentModel: yup.string().required(),

  visa: yup
    .object({
      debitFee: yup.number().required(),
      creditFee: yup.number().required(),
      credit2To6Fee: yup.number().required(),
      credit7To12Fee: yup.number().required(),
      credit13To18Fee: yup.number().required(),
      credit1xTotalEffectiveCost: yup.number().optional().nullable(),
      credit6xTotalEffectiveCost: yup.number().optional().nullable(),
      credit12xTotalEffectiveCost: yup.number().optional().nullable(),
    })
    .required(),
  master: yup
    .object({
      debitFee: yup.number().required(),
      creditFee: yup.number().required(),
      credit2To6Fee: yup.number().required(),
      credit7To12Fee: yup.number().required(),
      credit13To18Fee: yup.number().required(),
      credit1xTotalEffectiveCost: yup.number().optional().nullable(),
      credit6xTotalEffectiveCost: yup.number().optional().nullable(),
      credit12xTotalEffectiveCost: yup.number().optional().nullable(),
    })
    .required(),
  elo: yup
    .object({
      debitFee: yup.number().required(),
      creditFee: yup.number().required(),
      credit2To6Fee: yup.number().required(),
      credit7To12Fee: yup.number().required(),
      credit13To18Fee: yup.number().required(),
    })
    .required(),
  hiper: yup
    .object({
      creditFee: yup.number().required(),
      credit2To6Fee: yup.number().required(),
      credit7To12Fee: yup.number().required(),
      credit13To18Fee: yup.number().required(),
    })
    .required(),
  amex: yup
    .object({
      creditFee: yup.number().nullable(),
      credit2To6Fee: yup.number().required(),
      credit7To12Fee: yup.number().required(),
      credit13To18Fee: yup
        .number()
        .required
        // "O valor amex.credit13To18Fee não foi informado, porem é um campo obrigatório para gerar o PDF. "
        (),
    })
    .required(),
});

type Opportunity = yup.InferType<typeof opportunitySchema>;

export const handleValidateBody = async (body: OpportunityProps) => {
  return await opportunitySchema.validate(body);
};
