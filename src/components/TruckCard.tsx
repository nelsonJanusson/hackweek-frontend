import axios from "axios";
import { AssignmentDto, LegInfo, TruckDto } from "../types";
import { useMutation } from "@tanstack/react-query";
import "../styling/TruckCard.css";
import { useState } from "react";

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
      return axios.delete("http://localhost:3000/api/truck/" + truck.id);
    },
    onSuccess: () => {
      setTrucks((prevTrucks: TruckDto[]) =>
        prevTrucks.filter((prevTruck) => prevTruck.id !== truck.id)
      );
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <>
      <div className="mainbody" onClick={() => setSelected(!selected)}>
        <h4>Truck Id: {truck.id}</h4>
        <h4>payload: {truck.payload}</h4>
        <h4>weight: {truck.weight}</h4>
        <h4>height: {truck.height}</h4>
      </div>
      {currentAssignment && (
        <div
          className="currentAssignment"
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
            <div className="leg" key={leg.id}>
              <h5>startDate: {leg.startDate.toString()}</h5>
              <h5>endDate: {leg.endDate.toString()}</h5>
              <h5>pickupLocation: {leg.startLocation}</h5>
              <h5>endLocation: {leg.endLocation}</h5>
            </div>
          ))}
        </div>
      )}
      {selected && showHistory && (
        <div className="history" onClick={() => setShowHistory(!showHistory)}>
          {truck.assignments
            .filter((e) => e.status == "Finished")
            .map((assignment: AssignmentDto) => (
              <div className="assignment" key={assignment.id}>
                <h3>Assignment</h3>
                <h4>Assignment id: {assignment.id}</h4>
                <h4>Asignment customer: {assignment.customerInfo.name}</h4>
                <h4>Product: {assignment.product}</h4>
                <h4>Pickup: {assignment.pickupLocation}</h4>
                <h4>Destination: {assignment.destination}</h4>
                <h4>Driver: {assignment.driverInfo.name}</h4>
                <h4>legs:</h4>
                {assignment.legs.map((leg: LegInfo) => (
                  <div className="leg" key={leg.id}>
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
      {selected && (
        <div className="extra">
          <button onClick={() => removeTruck.mutate()}>delete</button>
          <button onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? "hide" : "show"} history
          </button>
        </div>
      )}
    </>
  );
}
