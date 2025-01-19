export type ServiceType = {
  id: string;
  name: string;
  price: number;
};
export type CreateServiceType = Omit<ServiceType, "id">;
