export type OpportunityProps = {
  clientName: string;
  CNPJ: string;
  hasAutomaticAnticipation: boolean;
  RentFreeTransactionAmount: number;
  hasExemptionByVolume: boolean;
  ipvCondition?: "1" | "2" | "3";
  paymentModel: "adhesion" | "monthly";
  hasPixActive: boolean;
  stoneBankingEnabled: boolean;
  liquidationType?: "dias_uteis" | "todo_dia" | "mesmo_dia";
  productQuantity: number;
  pixQRCodeFee: number;
  monthlyPayment: number;
  automaticAnticipationFee: number;
  spotAnticipationFee: number;
  date: string;

  visa: {
    debitFee: number;
    creditFee: number;
    credit2To6Fee: number;
    credit7To12Fee: number;
    credit13To18Fee: number;
    credit1xTotalEffectiveCost?: number;
    credit6xTotalEffectiveCost?: number;
    credit12xTotalEffectiveCost?: number;
  };

  master: {
    debitFee: number;
    creditFee: number;
    credit2To6Fee: number;
    credit7To12Fee: number;
    credit13To18Fee: number;
    credit1xTotalEffectiveCost?: number;
    credit6xTotalEffectiveCost?: number;
    credit12xTotalEffectiveCost?: number;
  };

  elo: {
    debitFee: number;
    creditFee: number;
    credit2To6Fee: number;
    credit7To12Fee: number;
    credit13To18Fee: number;
  };

  hiper: {
    creditFee: number;
    credit2To6Fee: number;
    credit7To12Fee: number;
    credit13To18Fee: number;
  };

  amex: {
    creditFee?: number;
    credit2To6Fee: number;
    credit7To12Fee: number;
    credit13To18Fee: number;
  };
};
