import { ptBR } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

export const getLocalDate = () => {
  const date = formatInTimeZone(
    new Date(),
    "America/Sao_Paulo",
    "d 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  return date;
};
