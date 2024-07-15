import { CustomerDto } from "../types";
import { CustomerCard } from "./CustomerCard";

export function CustomerGallery({
  customers,
  setCustomers,
}: {
  customers: CustomerDto[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  return (
    <div>
      {customers.map((customer: CustomerDto) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          setCustomers={setCustomers}
        ></CustomerCard>
      ))}
    </div>
  );
}
