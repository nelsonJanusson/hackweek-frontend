import axios from "axios";
import { AssignmentDto, LegInfo } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
type FormValues = {
  truck: string;
  driver: string;
};
export function AssignmentCard({
  assignment,
  setAssignments,
}: {
  assignment: AssignmentDto;
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
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

  const finnishAssignment = useMutation({
    mutationFn: () => {
      return axios.post(
        "http://localhost:3000/api/assignment/finnish/" + assignment.id,
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

  const assignAssignment = useMutation({
    mutationFn: (e: FormValues) => {
      return axios.post(
        "http://localhost:3000/api/assignment/assign/" +
          assignment.id +
          "/" +
          e.truck +
          "/" +
          e.driver,
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

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    assignAssignment.mutate(data);
  };

  return (
    <div>
      <h4>PickupLocation: {assignment.pickupLocation}</h4>
      <h4>Destination: {assignment.destination}</h4>
      <h4>product: {assignment.product}</h4>
      {assignment.status == "Unassigned" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Truck:
            <input {...register("truck", { required: true })} />
          </label>
          <label>
            Driver:
            <input {...register("driver", { required: true })} />
          </label>
          <input type="submit" />
        </form>
      )}
      ;
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
      {assignment.status == "Active" && (
        <button onClick={() => finnishAssignment.mutate()}>Finnish</button>
      )}
      <button onClick={() => removeAssignment.mutate()}>delete</button>
    </div>
  );
}
