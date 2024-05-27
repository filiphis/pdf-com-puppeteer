import { FormattedOpportunityProps, OpportunityProps } from "../types/types.ts";
import { getLocalDate } from "./getLocalDate.ts";

export const toLocaleBR = (number: number) => {
  return number.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export function formatNumber(number: number) {
  return number.toFixed(2).toString().replace(".", ",");
}

export const handleRequestBody = (opportunity: OpportunityProps) => {
  const RentFreeTransactionAmount = toLocaleBR(
    opportunity.RentFreeTransactionAmount
  );
  const pixQRCodeFee = formatNumber(opportunity.pixQRCodeFee);
  const monthlyPayment = toLocaleBR(opportunity.monthlyPayment);
  const automaticAnticipationFee = formatNumber(
    opportunity.automaticAnticipationFee
  );

  const QUANTITY_MONTHS_OF_YEAR = 12;
  const installmentsValue = toLocaleBR(
    opportunity.monthlyPayment / QUANTITY_MONTHS_OF_YEAR
  );

  const spotAnticipationFee = formatNumber(opportunity.spotAnticipationFee);

  const todayDate = getLocalDate();

  const cardTypes = ["visa", "master", "elo", "hiper", "amex"];

  cardTypes.forEach((cardType) => {
    const card = opportunity[cardType as keyof typeof opportunity] as any;
    for (const key in card) {
      if (typeof card[key] === "number" && card[key]) {
        card[key] = formatNumber(card[key]);
      } else {
        card[key] = null;
      }
    }
  });

  return {
    ...opportunity,
    RentFreeTransactionAmount,
    monthlyPayment,
    pixQRCodeFee,
    automaticAnticipationFee,
    spotAnticipationFee,
    installmentsValue,
    todayDate,
  };
};
