import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AssignmentDto, DriverDto, TruckDto } from "../types";
import "../styling/AssignAssignmentForm.css";
import "../index.css";

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
      <h2>drivers</h2>
      {unassignedDrivers.map((driver: DriverDto) => (
        <div
          key={driver.id}
          onClick={() => setSelectedDriver(driver.id)}
          className={
            "unassigned-driver_" +
            (selectedDriver == driver.id ? "selected" : "")
          }
        >
          <h4>{driver.name}</h4>
        </div>
      ))}

      <h2>trucks</h2>
      {unassignedTrucks.map((truck: TruckDto) => (
        <div
          key={truck.id}
          onClick={() => setSelectedTruck(truck.id)}
          className={
            "unassigned-truck_" + (selectedTruck == truck.id ? "selected" : "")
          }
        >
          <h4>Truck Id: {truck.id}</h4>
          <h4>payload: {truck.payload}</h4>
          <h4>weight: {truck.weight}</h4>
          <h4>height: {truck.height}</h4>
        </div>
      ))}
      <button
        className="button"
        onClick={() => {
          if (selectedDriver != "" && selectedTruck != "") {
            assignAssignment.mutate();
          }
        }}
      >
        assign
      </button>
    </>
  );
}
