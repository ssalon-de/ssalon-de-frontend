export type ServiceType = {
  id: string;
  name: string;
};
export type CreateServiceType = Omit<ServiceType, "id">;
