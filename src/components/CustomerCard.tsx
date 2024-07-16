import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AssignmentDto, CustomerDto } from "../types";
import { AddAssignmentForm } from "./AddAssignmentForm";
import "../styling/CustomerCard.css";

export function CustomerCard({
  customer,
  setCustomers,
}: {
  customer: CustomerDto;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  const [showAssignments, setShowAssignments] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

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
    <div className="Customer-card-mainbody">
      <div
        className="Customer-card-test"
        onClick={() => setSelected(!selected)}
      >
        <h4>Customer : {customer.name}</h4>
      </div>
      {selected && (
        <div className="Customer-card-extra">
          <AddAssignmentForm
            customer={customer}
            setCustomers={setCustomers}
          ></AddAssignmentForm>
          <button onClick={() => removeCustomer.mutate()}>delete</button>
          <button onClick={() => setShowAssignments(!showAssignments)}>
            showAssignments
          </button>
        </div>
      )}
      {selected && showAssignments && (
        <div className="Customer-card-extra-assignments">
          {customer.assignments.map((assignment: AssignmentDto) => (
            <div key={assignment.id}>
              <h4>Asignment id: {assignment.id}</h4>
              <h4>PickupLocation: {assignment.pickupLocation}</h4>
              <h4>Destination: {assignment.destination}</h4>
              <h4>product: {assignment.product}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
