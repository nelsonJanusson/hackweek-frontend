import axios from "axios";
import { DriverDto } from "../types";
import { useMutation } from "@tanstack/react-query";

export function DriverCard({
  driver,
  setDrivers,
}: {
  driver: DriverDto;
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  const removeDriver = useMutation({
    mutationFn: () => {
      return axios.delete("http://localhost:3000/api/driver/" + driver.id);
    },
    onSuccess: () => {
      setDrivers((prevDrivers: DriverDto[]) =>
        prevDrivers.filter((prevDriver) => prevDriver.id !== driver.id)
      );
    },
    onError: (error) => {
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
