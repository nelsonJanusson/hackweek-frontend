import axios from "axios";
import { AddDriverDto, DriverDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../index.css";
import { useState } from "react";
import "../styling/AddDriverForm.css";
export function AddDriverForm({
  setDrivers,
}: {
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<DriverDto>();
  const [selected, setSelected] = useState<boolean>(false);

  const addDriver = useMutation({
    mutationFn: (e: AddDriverDto) => {
      return axios.post("http://localhost:3000/api/driver", JSON.stringify(e), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    },
    onSuccess: (e) => {
      setDrivers((prevDrivers) => [...prevDrivers, e.data]);
    },
    onError: (error) => {
      console.log(error.message);
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
          <button className="button" type="submit">
            Add Driver
          </button>
        </form>
      )}
    </div>
  );
}
