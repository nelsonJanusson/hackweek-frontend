import axios from "axios";
import { AddTruckDto, TruckDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styling/AddTruckForm.css";
import { useState } from "react";

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
    <div className="addTruck">
      <div onClick={() => setSelected(!selected)}>
        <h2>Register New Truck</h2>
      </div>

      {selected && (
        <form className="addTruckForm" onSubmit={handleSubmit(onSubmit)}>
          <label>Payload:</label>
          <input
            type="number"
            step="0.01"
            {...register("payload", { required: true })}
          />
          <label>Weight:</label>
          <input
            type="number"
            step="0.01"
            {...register("weight", { required: true })}
          />
          <label>Height:</label>
          <input
            type="number"
            step="0.01"
            {...register("height", { required: true })}
          />
          <input type="submit" />
        </form>
      )}
    </div>
  );
}
