import { CustomerDto } from "../types";

export function CustomerCard({
  customer,
  setCustomers,
}: {
  customer: CustomerDto;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  return <p>hiiiiii</p>;
}
