import axios from "axios";
import { AddCustomerDto, CustomerDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../index.css";
import { useState } from "react";
import "../styling/AddAssignmentForm.css";
import toast, { Toaster } from "react-hot-toast";
export function AddCustomerForm({
  setCustomers,
}: {
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<CustomerDto>();
  const [selected, setSelected] = useState<boolean>(false);

  const addCustomer = useMutation({
    mutationFn: (e: AddCustomerDto) => {
      return axios.post(
        "https://hackweek-backend.azurewebsites.net/api/customer",
        JSON.stringify(e),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    },
    onSuccess: (e) => {
      setCustomers((prevCustomers) => [...prevCustomers, e.data]);
      toast.success("Customer registered succesfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(
        "There was anerror registering the customer, please try again"
      );
    },
  });

  const onSubmit = (data: AddCustomerDto) => {
    addCustomer.mutate(data);
    reset();
  };

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>Register New Customer</h2>
      </div>
      {selected && (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input className="button" {...register("name", { required: true })} />
          <button className="button-real" type="submit">
            Add Customer
          </button>
        </form>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
