import axios from "axios";
import { AddAssignmentDto, CustomerDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

export function AddAssignmentForm({
  customer,
  setCustomers,
}: {
  customer: CustomerDto;
  setCustomers: React.Dispatch<React.SetStateAction<CustomerDto[]>>;
}) {
  const { register, handleSubmit } = useForm<AddAssignmentDto>();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          product:
          <input {...register("product", { required: true })} />
        </label>
        <label>
          pickupLocation:
          <input {...register("pickupLocation", { required: true })} />
        </label>
        <label>
          destination:
          <input {...register("destination", { required: true })} />
        </label>

        <input type="submit" />
      </form>
    </>
  );
}
