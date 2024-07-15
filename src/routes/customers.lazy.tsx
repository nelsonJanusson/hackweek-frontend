import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddCustomerDto, CustomerDto } from "../types";

export const Route = createLazyFileRoute("/customers")({
  component: Customers,
});

function Customers() {
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const { register, handleSubmit, reset } = useForm<AddCustomerDto>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customer")
      .then((res) => res.data)
      .then((res) => setCustomers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const addCustomer = useMutation({
    mutationFn: (e: AddCustomerDto) => {
      return axios.post(
        "http://localhost:3000/api/customer",
        JSON.stringify(e),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    },
    onError: (e) => {
      console.log(e.message);
    },
    onSuccess: (e) => {
      setCustomers((prevCustomers) => [...prevCustomers, e.data]);
      reset();
    },
  });

  const onSubmit = (e: AddCustomerDto) => {
    addCustomer.mutate(e);
  };

  return (
    <div>
      <h1>Register new Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Product:
          <input {...register("name", { required: true })} />
        </label>

        <input type="submit" />
      </form>
      <h1>Customers</h1>
      <CustomerGallery
        customers={customers}
        setCustomers={setCustomers}
      ></CustomerGallery>
    </div>
  );
}
