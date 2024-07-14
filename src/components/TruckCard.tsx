import axios from "axios";
import { Truck } from "../types";
import { useMutation } from "@tanstack/react-query";

export function TruckCard({
  truck,
  setTrucks,
}: {
  truck: Truck;
  setTrucks: (input: any) => void;
}) {
  const removeDriver = useMutation({
    mutationFn: () => {
      return axios.delete("http://localhost:3000/api/driver/" + truck.id);
    },
    onSuccess: () => {
      console.log("sucess1");
      setTrucks((prevTrucks: Truck[]) =>
        prevTrucks.filter((prevTruck) => prevTruck.id !== truck.id)
      );
    },
    onError: (error) => {
      console.log("error");
      console.log(error.message);
    },
  });

  return (
    <div>
      <h4>Type: {truck.type}</h4>
      <h4>Year: {truck.year}</h4>
      <button onClick={() => removeDriver.mutate()}>delete</button>
    </div>
  );
}
