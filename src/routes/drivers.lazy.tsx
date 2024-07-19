import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { DriverDto } from "../types";
import { useEffect, useState } from "react";
import { DriverGallery } from "../components/DriverGallery";
import { AddDriverForm } from "../components/AddDriverForm";

export const Route = createLazyFileRoute("/drivers")({
  component: Drivers,
});

function Drivers() {
  const [assignedDrivers, setAssignedDrivers] = useState<DriverDto[]>([]);
  const [unassignedDrivers, setUnassignedDrivers] = useState<DriverDto[]>([]);

  useEffect(() => {
    axios
      .get("https://hackweek-backend.azurewebsites.net/api/driver/unassigned")
      .then((res) => res.data)
      .then((res) => setUnassignedDrivers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
    axios
      .get("https://hackweek-backend.azurewebsites.net/api/driver/assigned")
      .then((res) => res.data)
      .then((res) => setAssignedDrivers(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <div className="m-5">
      <AddDriverForm setDrivers={setUnassignedDrivers}></AddDriverForm>
      <div className="flex">
        <div className="basis-1/2">
          <DriverGallery
            title="Assigned Drivers"
            drivers={assignedDrivers}
            setDrivers={setAssignedDrivers}
          ></DriverGallery>
        </div>
        <div className="basis-1/2">
          <DriverGallery
            title="Unassigned Drivers"
            drivers={unassignedDrivers}
            setDrivers={setUnassignedDrivers}
          ></DriverGallery>
        </div>
      </div>
    </div>
  );
}
