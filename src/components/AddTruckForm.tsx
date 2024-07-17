import axios from "axios";
import { AddTruckDto, TruckDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../index.css";
import { useState } from "react";
import "../styling/AddTruckForm.css";

export function AddTruckForm({
  setTrucks,
}: {
  setTrucks: React.Dispatch<React.SetStateAction<TruckDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<AddTruckDto>();
  const [selected, setSelected] = useState<boolean>(false);

  const addTruck = useMutation({
    mutationFn: (e: AddTruckDto) => {
      return axios.post("http://localhost:3000/api/truck", JSON.stringify(e), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    },
    onSuccess: (e) => {
      setTrucks((prevTrucks) => [...prevTrucks, e.data]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const onSubmit = (data: AddTruckDto) => {
    addTruck.mutate(data);
    reset();
  };

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>Register New Truck</h2>
      </div>

      {selected && (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>Payload:</label>
          <input
            className="button"
            type="number"
            step="0.01"
            {...register("payload", { required: true })}
          />
          <label>Weight:</label>
          <input
            className="button"
            type="number"
            step="0.01"
            {...register("weight", { required: true })}
          />
          <label>Height:</label>
          <input
            className="button"
            type="number"
            step="0.01"
            {...register("height", { required: true })}
          />
          <button className="button" type="submit">
            Add Truck
          </button>
        </form>
      )}
    </div>
  );
}
