import axios from "axios";
import { Driver } from "../types";
import { useMutation } from "@tanstack/react-query";

export function DriverCard({
  driver,
  setDrivers,
}: {
  driver: Driver;
  setDrivers: (prevDrivers: any) => void;
}) {
  const removeDriver = useMutation({
    mutationFn: () => {
      return axios.delete("http://localhost:3000/api/driver/" + driver.id);
    },
    onSuccess: () => {
      console.log("sucess1");
      setDrivers((prevDrivers: Driver[]) =>
        prevDrivers.filter((prevDriver) => prevDriver.id !== driver.id)
      );
    },
    onError: (error) => {
      console.log("error");
      console.log(error.message);
    },
  });

  return (
    <div>
      <h4>Name: {driver.name}</h4>
      <h4>Salary: {driver.salary}</h4>
      <button onClick={() => removeDriver.mutate()}>delete</button>
    </div>
  );
}
