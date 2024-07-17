import { useState } from "react";
import { CustomerDto } from "../types";
import { CustomerCard } from "./CustomerCard";

export function CustomerGallery({
  customers,
  setCustomers,
  title,
}: {
  customers: CustomerDto[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
  title: string;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>{title}</h2>
      </div>
      {selected && (
        <div className="gallery-new">
          {customers.map((customer: CustomerDto) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              setCustomers={setCustomers}
            ></CustomerCard>
          ))}
        </div>
      )}
    </div>
  );
}
