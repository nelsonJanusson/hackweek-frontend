import axios from "axios";
import { AddDriverDto, DriverDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../index.css";
import { useState } from "react";
import "../styling/AddDriverForm.css";
import toast, { Toaster } from "react-hot-toast";
export function AddDriverForm({
  setDrivers,
}: {
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<DriverDto>();
  const [selected, setSelected] = useState<boolean>(false);
  const addDriver = useMutation({
    mutationFn: (e: AddDriverDto) => {
      return axios.post(
        "https://hackweek-backend.azurewebsites.net/api/driver",
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
      setDrivers((prevDrivers) => [...prevDrivers, e.data]);
      toast.success("Driver registered succesfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(
        "There was an error registering the driver, please try again"
      );
    },
  });

  const onSubmit = (data: AddDriverDto) => {
    addDriver.mutate(data);
    reset();
  };

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>Register New Driver</h2>
      </div>

      {selected && (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input className="button" {...register("name", { required: true })} />
          <button className="button-real" type="submit">
            Add Driver
          </button>
        </form>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
