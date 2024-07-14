import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddTruckDto, Truck } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TruckCard } from "../components/TruckCard";

export const Route = createLazyFileRoute("/trucks")({
  component: Trucks,
});

function Trucks() {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/truck")
      .then((res) => res.data)
      .then((res) => setTrucks(res));
  }, []);

  const { register, handleSubmit } = useForm<AddTruckDto>();

  const onError = (errors: any) => console.error(errors);

  const mutation = useMutation({
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
  });

  const onCreateTodo = (e: AddTruckDto) => {
    mutation.mutate(e);
  };

  return (
    <div>
      <h1>Trucks</h1>
      {trucks.map((truck: Truck) => (
        <TruckCard truck={truck} setTrucks={setTrucks}></TruckCard>
      ))}
      <form onSubmit={handleSubmit(onCreateTodo, onError)}>
        <input {...register("year", { required: true })} />
        <input {...register("type", { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
