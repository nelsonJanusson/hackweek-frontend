import axios from "axios";
import { AddAssignmentDto, CustomerDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styling/AddAssignmentForm.css";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";
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
        "https://hackweek-backend.azurewebsites.net/api/customer/" +
          customer.id +
          "/assignment",
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
      toast.success("sucesfully created assignment");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("sucesfully created assignment");
    },
  });

  const onSubmit = (data: AddAssignmentDto) => {
    addCustomer.mutate(data);
  };

  return (
    <>
      <form className="form2" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register New Assignment</h2>

        <div className="border-t border-black">
          <div className="form3">
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
            <button className="button-real" type="submit">
              Add Assignment
            </button>{" "}
          </div>
        </div>
      </form>
      <Toaster position="top-center" />
    </>
  );
}
