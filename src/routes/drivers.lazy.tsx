import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddDriverDto, DriverDto } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DriverCard } from "../components/DriverCard";

export const Route = createLazyFileRoute("/drivers")({
  component: Drivers,
});

function Drivers() {
  const [drivers, setDrivers] = useState<DriverDto[]>([]);
  const { register, handleSubmit } = useForm<AddDriverDto>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/driver")
      .then((res) => res.data)
      .then((res) => setDrivers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const addDriver = useMutation({
    mutationFn: (e: AddDriverDto) => {
      return axios.post("http://localhost:3000/api/driver", JSON.stringify(e), {
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
      setDrivers((prevDrivers) => [...prevDrivers, e.data]);
    },
  });

  const onSubmit = (e: AddDriverDto) => {
    addDriver.mutate(e);
  };

  return (
    <div>
      <h1>Register New Driver</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input {...register("name", { required: true })} />
        </label>
        <label>
          Salary:
          <input {...register("salary", { required: true })} />
        </label>
        <input type="submit" />
      </form>
      <h1>Current Drivers:</h1>
      {drivers.map((driver: DriverDto) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          setDrivers={setDrivers}
        ></DriverCard>
      ))}
    </div>
  );
}
