import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { TruckDto } from "../types";
import { useEffect, useState } from "react";
import { TruckGallery } from "../components/TruckGallery";
import { AddTruckForm } from "../components/AddTruckForm";

export const Route = createLazyFileRoute("/trucks")({
  component: Trucks,
});

function Trucks() {
  const [assignedTrucks, setAssignedTrucks] = useState<TruckDto[]>([]);
  const [unassignedTrucks, setUnassignedTrucks] = useState<TruckDto[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/truck/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
    axios
      .get("http://localhost:3000/api/truck/assigned")
      .then((res) => res.data)
      .then((res) => setAssignedTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <>
      <AddTruckForm setTrucks={setUnassignedTrucks}></AddTruckForm>

      <TruckGallery
        title="Assigned Drivers"
        trucks={assignedTrucks}
        setTrucks={setAssignedTrucks}
      ></TruckGallery>

      <TruckGallery
        title="Unassigned Drivers"
        trucks={unassignedTrucks}
        setTrucks={setUnassignedTrucks}
      ></TruckGallery>
    </>
  );
}
