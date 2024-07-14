import axios from "axios";
import { Assignment, Leg } from "../types";
import { useMutation } from "@tanstack/react-query";

export function AssignmentCard({
  assignment,
  setAssignments,
}: {
  assignment: Assignment;
  setAssignments: (assignments: any) => void;
}) {
  const removeAssignment = useMutation({
    mutationFn: () => {
      return axios.delete(
        "http://localhost:3000/api/assignment/" + assignment.id
      );
    },
    onSuccess: () => {
      console.log("sucess1");
      setAssignments((prevAssignments: Assignment[]) =>
        prevAssignments.filter(
          (prevAssignment) => prevAssignment.id !== assignment.id
        )
      );
    },
    onError: (error) => {
      console.log("error");
      console.log(error.message);
    },
  });

  return (
    <div>
      <h4>PickupLocation: {assignment.pickupLocation}</h4>
      <h4>Destination: {assignment.destination}</h4>
      <h4>product: {assignment.product}</h4>
      <h4>driver: {assignment.driverDto.name}</h4>
      <h4>truck: {assignment.truckDto.type}</h4>
      {assignment.legs.map((leg: Leg) => (
        <>
          <p>started at {leg.startLocation} </p>
          <p>ended at {leg.endLocation} </p>
        </>
      ))}

      <button onClick={() => removeAssignment.mutate()}>delete</button>
    </div>
  );
}
