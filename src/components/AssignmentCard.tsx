import axios from "axios";
import { AssignmentDto, LegInfo } from "../types";
import { useMutation } from "@tanstack/react-query";
import { AddLegForm } from "./AddLegForm";
import "../styling/AssignmentCard.css";
import { useState } from "react";
import { AssignAssignmentForm } from "./AssignAssignmentForm";

export function AssignmentCard({
  assignment,
  setAssignments,
}: {
  assignment: AssignmentDto;
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  const removeAssignment = useMutation({
    mutationFn: () => {
      return axios.delete(
        "http://localhost:3000/api/assignment/" + assignment.id
      );
    },
    onSuccess: () => {
      setAssignments((prevAssignments: AssignmentDto[]) =>
        prevAssignments.filter(
          (prevAssignment) => prevAssignment.id !== assignment.id
        )
      );
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const finishAssignment = useMutation({
    mutationFn: () => {
      return axios.post(
        "http://localhost:3000/api/assignment/finish/" + assignment.id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    },
    onSuccess: (e) => {
      setAssignments((prevAssignments: AssignmentDto[]) =>
        prevAssignments.filter(
          (prevAssignment) => prevAssignment.id !== assignment.id
        )
      );
      setAssignments((prevAssignments) => [...prevAssignments, e.data]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return (
    <div className="button">
      <div
        className="Assignment-card-test"
        onClick={() => setSelected(!selected)}
      >
        <h4>Asignment id: {assignment.id}</h4>
        <h4>Asignment customer: {assignment.customerInfo.name}</h4>
        <h4>PickupLocation: {assignment.pickupLocation}</h4>
        <h4>Destination: {assignment.destination}</h4>
        <h4>product: {assignment.product}</h4>

        {(assignment.status == "Active" || assignment.status == "Finished") && (
          <>
            <h4>driver: {assignment.driverInfo.name}</h4>
            <h4>truck id: {assignment.truckInfo.id}</h4>
            <h4>legs:</h4>
            {assignment.legs.map((leg: LegInfo) => (
              <div
                className="bg-emerald-400 m-2  p-1 rounded-[4px]"
                key={leg.id}
              >
                <h5>startDate: {leg.startDate.toString()}</h5>
                <h5>endDate: {leg.endDate.toString()}</h5>
                <h5>pickupLocation: {leg.startLocation}</h5>
                <h5>endLocation: {leg.endLocation}</h5>
              </div>
            ))}
          </>
        )}
      </div>
      {selected && (
        <div className="Assignment-card-extra">
          {assignment.status == "Unassigned" && selected && (
            <div>
              <AssignAssignmentForm
                assignment={assignment}
                setAssignments={setAssignments}
              ></AssignAssignmentForm>
            </div>
          )}
          {assignment.status == "Active" && selected && (
            <div>
              <AddLegForm
                assignment={assignment}
                setAssignments={setAssignments}
              ></AddLegForm>
              <button
                className="bg-emerald-400 m-2  p-1 rounded-[4px]"
                onClick={() => finishAssignment.mutate()}
              >
                Finish
              </button>
            </div>
          )}
          {selected && (
            <button
              className="bg-emerald-400 m-2  p-1 rounded-[4px]"
              onClick={() => removeAssignment.mutate()}
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
