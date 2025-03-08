export const formatCurrency = (value: string) => {
  const number = parseFloat(value);
  if (isNaN(number)) return "Valor inválido";

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(number);
};