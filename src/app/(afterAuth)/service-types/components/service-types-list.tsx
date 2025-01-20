import { ServiceType } from "@/queries/service-types/type";
import { BASE_URL } from "@/shared/utils/api";
import ServiceItem from "./service-types-item";
import { cookies } from "next/headers";

export default async function ServiceList() {
  const store = await cookies();
  const token = store.get("accessToken")?.value ?? "";
  const serviceTypes: ServiceType[] = await fetch(`${BASE_URL}/service-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  }).then((res) => res.json());

  return (
    <>
      {serviceTypes.map((serviceType, idx) => (
        <ServiceItem key={`${serviceType.id}${idx}`} {...serviceType} />
      ))}
    </>
  );
}
