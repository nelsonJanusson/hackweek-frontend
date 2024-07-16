import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AddAssignmentDto, AssignmentDto, CustomerDto } from "../types";
import { useForm } from "react-hook-form";
import { AddAssignmentForm } from "./AddAssignmentForm";

export function CustomerCard({
  customer,
  setCustomers,
}: {
  customer: CustomerDto;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  const [showAssignments, setShowAssignments] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm<AddAssignmentDto>();
  const removeCustomer = useMutation({
    mutationFn: () => {
      return axios.delete("http://localhost:3000/api/customer/" + customer.id);
    },
    onSuccess: () => {
      setCustomers((prevCustomers: CustomerDto[]) =>
        prevCustomers.filter((prevCustomer) => prevCustomer.id !== customer.id)
      );
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return (
    <>
      <div>
        <h4>Customer : {customer.name}</h4>
      </div>
      {selected && (
        <>
          <AddAssignmentForm
            customer={customer}
            setCustomers={setCustomers}
          ></AddAssignmentForm>
          <button onClick={() => removeCustomer.mutate()}>delete</button>
        </>
      )}
      {selected && showAssignments && (
        <>
          {customer.assignments.map((assignment: AssignmentDto) => (
            <div key={assignment.id}>
              <h4>Asignment id: {assignment.id}</h4>
              <h4>PickupLocation: {assignment.pickupLocation}</h4>
              <h4>Destination: {assignment.destination}</h4>
              <h4>product: {assignment.product}</h4>
            </div>
          ))}
        </>
      )}
    </>
  );
}
