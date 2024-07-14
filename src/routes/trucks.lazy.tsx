import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddTruckDto, TruckDto } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TruckCard } from "../components/TruckCard";

export const Route = createLazyFileRoute("/trucks")({
  component: Trucks,
});

function Trucks() {
  const [trucks, setTrucks] = useState<TruckDto[]>([]);
  const { register, handleSubmit, reset } = useForm<AddTruckDto>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/truck")
      .then((res) => res.data)
      .then((res) => setTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const addTruck = useMutation({
    mutationFn: (e: AddTruckDto) => {
      return axios.post("http://localhost:3000/api/truck", JSON.stringify(e), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    },
    onError: (e) => {
      console.log(e.message);
    },
    onSuccess: (e) => {
      setTrucks((prevTrucks) => [...prevTrucks, e.data]);
      reset();
    },
  });

  const onSubmit = (e: AddTruckDto) => {
    addTruck.mutate(e);
  };

  return (
    <>
      <h1>Register New Truck</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Type:
          <input {...register("type", { required: true })} />
        </label>
        <label>
          Year:
          <input {...register("year", { required: true })} />
        </label>
        <input type="submit" />
      </form>
      <h1>Current fleet</h1>
      {trucks.map((truck: TruckDto) => (
        <TruckCard
          key={truck.id}
          truck={truck}
          setTrucks={setTrucks}
        ></TruckCard>
      ))}
    </>
  );
}
