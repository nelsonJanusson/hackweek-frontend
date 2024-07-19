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
      .get("https://hackweek-backend.azurewebsites.net/api/truck/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
    axios
      .get("https://hackweek-backend.azurewebsites.net/api/truck/assigned")
      .then((res) => res.data)
      .then((res) => setAssignedTrucks(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <div className="m-5">
      <AddTruckForm setTrucks={setUnassignedTrucks}></AddTruckForm>
      <div className="flex">
        {" "}
        <div className="basis-1/2">
          <TruckGallery
            title="Assigned Trucks"
            trucks={assignedTrucks}
            setTrucks={setAssignedTrucks}
          ></TruckGallery>
        </div>
        <data className="basis-1/2">
          <TruckGallery
            title="Unassigned Trucks"
            trucks={unassignedTrucks}
            setTrucks={setUnassignedTrucks}
          ></TruckGallery>
        </data>
      </div>
    </div>
  );
}
