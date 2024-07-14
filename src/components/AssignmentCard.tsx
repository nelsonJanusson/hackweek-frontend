import axios from "axios";
import { Assignment, Leg } from "../types";
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

  /*const { register, handleSubmit } = useForm<FormValues>();
  const updateAssignment = useMutation({
    mutationFn: (e) => {
      return axios.put(
        "http://localhost:3000/api/assignment/"+assignment.id+"/"+e.truck+"/"+e.driver,
        
      );
    },
    onSuccess: (e) => {
      console.log(e);
    },
  });
  */

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues, e) => {
    console.log("lesgo");
    axios.put(
      "http://localhost:3000/api/assignment/" +
        assignment.id +
        "/" +
        data.truck +
        "/" +
        data.driver
    );
    console.log("lesgo2");
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <h4>PickupLocation: {assignment.pickupLocation}</h4>
      <h4>Destination: {assignment.destination}</h4>
      <h4>product: {assignment.product}</h4>
      <h4>driver: {assignment.driverDto ? assignment.driverDto.name : ""}</h4>
      <h4>truck: {assignment.truckDto ? assignment.truckDto.type : ""}</h4>
      {assignment.legs.map((leg: Leg) => (
        <>
          <p>started at {leg.startLocation} </p>
          <p>ended at {leg.endLocation} </p>
        </>
      ))}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register("truck", { required: true })} />
        <input {...register("driver", { required: true })} />
        <input type="submit" />
      </form>

      <button onClick={() => removeAssignment.mutate()}>delete</button>
    </div>
  );
}
