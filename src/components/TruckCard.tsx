import axios from "axios";
import { AssignmentDto, LegInfo, TruckDto } from "../types";
import { useMutation } from "@tanstack/react-query";
import "../styling/TruckCard.css";
import { useState } from "react";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";

export function TruckCard({
  truck,
  setTrucks,
}: {
  truck: TruckDto;
  setTrucks: React.Dispatch<React.SetStateAction<TruckDto[]>>;
}) {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const currentAssignment = truck.assignments.find((e) => e.status == "Active");
  const removeTruck = useMutation({
    mutationFn: () => {
      return axios.delete(
        "https://hackweek-backend.azurewebsites.net/api/truck/" + truck.id
      );
    },
    onSuccess: () => {
      setTrucks((prevTrucks: TruckDto[]) =>
        prevTrucks.filter((prevTruck) => prevTruck.id !== truck.id)
      );
      toast.success("Truck sucessfully deleted");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Error deleting Truck, please try again");
    },
  });

  return (
    <div className="button">
      <div className="Truck-card-test" onClick={() => setSelected(!selected)}>
        <h4>Truck Id: {truck.id}</h4>
        <h4>payload: {truck.payload}</h4>
        <h4>weight: {truck.weight}</h4>
        <h4>height: {truck.height}</h4>
      </div>
      {currentAssignment && selected && (
        <div
          className="Truck-card-currentAssignment"
          onClick={() => setSelected(!selected)}
        >
          <h3>Assignment</h3>
          <h4>Assignment id: {currentAssignment.id}</h4>
          <h4>Asignment customer: {currentAssignment.customerInfo.name}</h4>
          <h4>Product: {currentAssignment.product}</h4>
          <h4>Pickup: {currentAssignment.pickupLocation}</h4>
          <h4>Destination: {currentAssignment.destination}</h4>
          <h4>Driver: {currentAssignment.driverInfo.name}</h4>
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
      {selected && (
        <div className="Truck-card-extra">
          <button
            className="bg-emerald-400 m-2  p-1 rounded-[4px]"
            onClick={() => removeTruck.mutate()}
          >
            delete
          </button>
          <button
            className="bg-emerald-400 m-2  p-1 rounded-[4px]"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "hide" : "show"} history
          </button>
        </div>
      )}
      {selected && showHistory && (
        <div
          className="Truck-card-history"
          onClick={() => setShowHistory(!showHistory)}
        >
          {truck.assignments
            .filter((e) => e.status == "Finished")
            .map((assignment: AssignmentDto) => (
              <div
                className="bg-emerald-400 m-2  p-1 rounded-[4px]"
                key={assignment.id}
              >
                <h3>Assignment</h3>
                <h4>Assignment id: {assignment.id}</h4>
                <h4>Asignment customer: {assignment.customerInfo.name}</h4>
                <h4>Product: {assignment.product}</h4>
                <h4>Pickup: {assignment.pickupLocation}</h4>
                <h4>Destination: {assignment.destination}</h4>
                <h4>Driver: {assignment.driverInfo?.name ?? "unknown"}</h4>
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
