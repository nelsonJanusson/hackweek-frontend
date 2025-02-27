import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AssignmentDto, CustomerDto } from "../types";
import { AddAssignmentForm } from "./AddAssignmentForm";
import "../styling/CustomerCard.css";
import toast, { Toaster } from "react-hot-toast";

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
      return axios.delete(
        "https://hackweek-backend.azurewebsites.net/api/customer/" + customer.id
      );
    },
    onSuccess: () => {
      setCustomers((prevCustomers: CustomerDto[]) =>
        prevCustomers.filter((prevCustomer) => prevCustomer.id !== customer.id)
      );
      toast.success("Customer sucessfully deleted");
    },
    onError: (error) => {
      console.log(error.message);
      toast.success("Error deleting customer, please try again");
    },
  });

  return (
    <div className="button">
      <div
        className="Customer-card-test"
        onClick={() => setSelected(!selected)}
      >
        <h4>{customer.name}</h4>
      </div>
      {selected && (
        <>
          <div className="Customer-card-extra">
            <AddAssignmentForm
              customer={customer}
              setCustomers={setCustomers}
            ></AddAssignmentForm>
          </div>
          <div className="Customer-card-extra">
            <button
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              onClick={() => removeCustomer.mutate()}
            >
              delete
            </button>
            <button
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              onClick={() => setShowAssignments(!showAssignments)}
            >
              {showAssignments ? "hide" : "show"} assignments
            </button>
          </div>
        </>
      )}
      {selected && showAssignments && (
        <div className="Customer-card-extra-assignments">
          {customer.assignments.map((assignment: AssignmentDto) => (
            <div
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              key={assignment.id}
            >
              <h4>Asignment id: {assignment.id}</h4>
              <h4>PickupLocation: {assignment.pickupLocation}</h4>
              <h4>Destination: {assignment.destination}</h4>
              <h4>product: {assignment.product}</h4>
            </div>
          ))}
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
