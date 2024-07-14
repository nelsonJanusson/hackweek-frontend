import axios from "axios";
import { TruckDto } from "../types";
import { useMutation } from "@tanstack/react-query";

export function TruckCard({
  truck,
  setTrucks,
}: {
  truck: TruckDto;
  setTrucks: (input) => void;
}) {
  const removeTruck = useMutation({
    mutationFn: () => {
      return axios.delete("http://localhost:3000/api/truck/" + truck.id);
    },
    onSuccess: () => {
      console.log("sucess1");
      setTrucks((prevTrucks: TruckDto[]) =>
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
      <button onClick={() => removeTruck.mutate()}>Remove Truck</button>
    </div>
  );
}
