import axios from "axios";
import { AddAssignmentDto, CustomerDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styling/AddAssignmentForm.css";
import "../index.css";
export function AddAssignmentForm({
  customer,
  setCustomers,
}: {
  customer: CustomerDto;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<AddAssignmentDto>();

  const addCustomer = useMutation({
    mutationFn: (e: AddAssignmentDto) => {
      return axios.post(
        "http://localhost:3000/api/customer/" + customer.id + "/assignment",
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
      setCustomers((prevCustomers: CustomerDto[]) =>
        prevCustomers.filter((prevCustomer) => prevCustomer.id !== customer.id)
      );
      setCustomers((prevCustomers) => [...prevCustomers, e.data]);
      reset();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = (data: AddAssignmentDto) => {
    addCustomer.mutate(data);
  };

  return (
    <>
      <form className="form2" onSubmit={handleSubmit(onSubmit)}>
        <label>Product:</label>
        <input
          className="button"
          {...register("product", { required: true })}
        />
        <label>PickupLocation:</label>
        <input
          className="button"
          {...register("pickupLocation", { required: true })}
        />
        <label>Destination:</label>
        <input
          className="button"
          {...register("destination", { required: true })}
        />
        <button className="button" type="submit">
          Add Assignment
        </button>
      </form>
    </>
  );
}
