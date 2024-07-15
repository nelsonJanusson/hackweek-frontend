import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AssignmentDto, DriverDto, TruckDto } from "../types";
import "../styling/AssignAssignmentForm.css";

export function AssignAssignmentForm({
  assignment,
  setAssignments,
}: {
  assignment: AssignmentDto;
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
  const [unassignedDrivers, setUnassignedDrivers] = useState<DriverDto[]>([]);
  const [unassignedTrucks, setUnassignedTrucks] = useState<TruckDto[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [selectedTruck, setSelectedTruck] = useState<string>("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/driver/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedDrivers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
    axios
      .get("http://localhost:3000/api/truck/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const assignAssignment = useMutation({
    mutationFn: () => {
      return axios.post(
        "http://localhost:3000/api/assignment/assign/" +
          assignment.id +
          "/" +
          selectedTruck +
          "/" +
          selectedDriver,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    },
    onError: (e) => {
      console.log(e.message);
    },
    onSuccess: (e) => {
      setAssignments((prevAssignments: AssignmentDto[]) =>
        prevAssignments.filter(
          (prevAssignment) => prevAssignment.id !== assignment.id
        )
      );
      setAssignments((prevAssignments) => [...prevAssignments, e.data]);
    },
  });

  return (
    <>
      <p>drivers</p>
      {unassignedDrivers.map((driver: DriverDto) => (
        <div
          key={driver.id}
          onClick={() => setSelectedDriver(driver.id)}
          className={
            "unassigned-driver_" +
            (selectedDriver == driver.id ? "selected" : "")
          }
        >
          <h4>Name: {driver.name}</h4>
        </div>
      ))}

      <p>trucks</p>
      {unassignedTrucks.map((truck: TruckDto) => (
        <div
          key={truck.id}
          onClick={() => setSelectedTruck(truck.id)}
          className={
            "unassigned-truck_" + (selectedTruck == truck.id ? "selected" : "")
          }
        >
          <h4>Type: {truck.type}</h4>
          <h4>Year: {truck.year}</h4>
        </div>
      ))}
      <button onClick={() => assignAssignment.mutate()}>assign</button>
    </>
  );
}
