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
    <>
      <div className="mainbody" onClick={() => setSelected(!selected)}>
        <h4>PickupLocation: {assignment.pickupLocation}</h4>
        <h4>Destination: {assignment.destination}</h4>
        <h4>product: {assignment.product}</h4>

        {(assignment.status == "Active" || assignment.status == "Finished") && (
          <>
            <h4>driver: {assignment.driverInfo.name}</h4>
            <h4>truck: {assignment.truckInfo.type}</h4>
            <h4>legs:</h4>
            {assignment.legs.map((leg: LegInfo) => (
              <div key={leg.id}>
                <p>started at {leg.startLocation} </p>
                <p>ended at {leg.endLocation} </p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="extra">
        {assignment.status == "Unassigned" && selected && (
          <AssignAssignmentForm
            assignment={assignment}
            setAssignments={setAssignments}
          ></AssignAssignmentForm>
        )}
        {assignment.status == "Active" && selected && (
          <>
            <AddLegForm
              assignment={assignment}
              setAssignments={setAssignments}
            ></AddLegForm>
            <button onClick={() => finishAssignment.mutate()}>Finish</button>
          </>
        )}
        {selected && (
          <button onClick={() => removeAssignment.mutate()}>delete</button>
        )}
      </div>
    </>
  );
}
