import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddDriverDto, DriverDto } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { DriverGallery } from "../components/DriverGallery";

export const Route = createLazyFileRoute("/drivers")({
  component: Drivers,
});

function Drivers() {
  const [assignedDrivers, setAssignedDrivers] = useState<DriverDto[]>([]);
  const [unassignedDrivers, setUnassignedDrivers] = useState<DriverDto[]>([]);
  const { register, handleSubmit, reset } = useForm<AddDriverDto>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/driver/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedDrivers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
    axios
      .get("http://localhost:3000/api/driver/assigned")
      .then((res) => res.data)
      .then((res) => setAssignedDrivers(res))
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
      setUnassignedDrivers((prevDrivers) => [...prevDrivers, e.data]);
      reset();
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
      <h1>Current Assigned Drivers:</h1>
      <DriverGallery
        drivers={assignedDrivers}
        setDrivers={setAssignedDrivers}
      ></DriverGallery>
      <h1>Current Unassigned Drivers:</h1>
      <DriverGallery
        drivers={unassignedDrivers}
        setDrivers={setUnassignedDrivers}
      ></DriverGallery>
    </div>
  );
}
