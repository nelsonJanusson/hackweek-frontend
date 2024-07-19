import axios from "axios";
import { AssignmentDto, DriverDto, LegInfo } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import "../index.css";
import "../styling/DriverCard.css";
import toast, { Toaster } from "react-hot-toast";

export function DriverCard({
  driver,
  setDrivers,
}: {
  driver: DriverDto;
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const currentAssignment = driver.assignments.find(
    (e) => e.status == "Active"
  );
  const removeDriver = useMutation({
    mutationFn: () => {
      return axios.delete(
        "https://hackweek-backend.azurewebsites.net/api/driver/" + driver.id
      );
    },
    onSuccess: () => {
      setDrivers((prevDrivers: DriverDto[]) =>
        prevDrivers.filter((prevDriver) => prevDriver.id !== driver.id)
      );
      toast.success("Driver sucessfully deleted");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Error deleting driver, please try again");
    },
  });

  return (
    <div className="button">
      <div className="Driver-card-test" onClick={() => setSelected(!selected)}>
        <h4>{driver.name}</h4>
      </div>
      {selected && (
        <>
          {currentAssignment && (
            <div
              className="bg-white m-5 p-5  border-t border-black border-solid"
              onClick={() => setSelected(!selected)}
            >
              <h3>Assignment</h3>
              <h4>Assignment id: {currentAssignment.id}</h4>
              <h4>Asignment customer: {currentAssignment.customerInfo.name}</h4>
              <h4>Product: {currentAssignment.product}</h4>
              <h4>Pickup: {currentAssignment.pickupLocation}</h4>
              <h4>Destination: {currentAssignment.destination}</h4>
              <h4>Truck Id: {currentAssignment.truckInfo.id}</h4>
              <h4>legs:</h4>
              {currentAssignment.legs.map((leg: LegInfo) => (
                <div className="button" key={leg.id}>
                  <h5>startDate: {leg.startDate.toString()}</h5>
                  <h5>endDate: {leg.endDate.toString()}</h5>
                  <h5>pickupLocation: {leg.startLocation}</h5>
                  <h5>endLocation: {leg.endLocation}</h5>
                </div>
              ))}
            </div>
          )}
          <div className="Driver-card-extra-buttons">
            <button
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              onClick={() => removeDriver.mutate()}
            >
              delete
            </button>
            <button
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "hide" : "show"} history
            </button>{" "}
          </div>
        </>
      )}
      {selected && showHistory && (
        <div className="Driver-card-history">
          {driver.assignments
            .filter((e) => e.status == "Finished")
            .map((assignment: AssignmentDto) => (
              <div
                className="bg-emerald-400 m-2  p-1 rounded-[4px]"
                key={assignment.id}
              >
                <h4>Assignment id: {assignment.id}</h4>
                <h4>
                  Asignment customer:{" "}
                  {assignment.customerInfo?.name ?? "unknown"}
                </h4>
                <h4>Product: {assignment.product}</h4>
                <h4>Pickup: {assignment.pickupLocation}</h4>
                <h4>Destination: {assignment.destination}</h4>
                <h4>Truck Id: {assignment.truckInfo?.id ?? "unknown"}</h4>
                <h4>legs:</h4>
                {assignment.legs.map((leg: LegInfo) => (
                  <div className="button" key={leg.id}>
                    <h5>startDate: {leg.startDate.toString()}</h5>
                    <h5>endDate: {leg.endDate.toString()}</h5>
                    <h5>pickupLocation: {leg.startLocation}</h5>
                    <h5>endLocation: {leg.endLocation}</h5>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
