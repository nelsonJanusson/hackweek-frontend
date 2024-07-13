import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddDriverDto, Driver } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/drivers")({
  component: Drivers,
});

function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/driver")
      .then((res) => res.data)
      .then((res) => setDrivers(res));
  }, []);

  const { register, handleSubmit } = useForm<AddDriverDto>();

  /*
  const getDrivers = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/driver');
      const data = await response.data;
      return data;
    }
  })
  */

  /*



   */
  //    if( getDrivers.isLoading ) return ( <h1>Loading....</h1>)
  //    if( getDrivers.isError ) return (<h1>Error loading data!!!</h1>)

  const onError = (errors: any) => console.error(errors);

  const mutation = useMutation({
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
  });

  const onCreateTodo = (e: AddDriverDto) => {
    mutation.mutate(e);
  };

  return (
    <div>
      <h1>Drivers</h1>
      {drivers.map((driver: Driver) => (
        <p>{driver.name}</p>
      ))}
      <form onSubmit={handleSubmit(onCreateTodo, onError)}>
        <input {...register("name", { required: true })} />
        <input {...register("salary", { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
