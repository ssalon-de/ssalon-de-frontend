export type PaymentType = {
  id: string;
  name: string;
};

export type CreatePaymentType = {
  name: string;
};

export type UpdatePaymentType = CreatePaymentType & {
  id: string;
};
