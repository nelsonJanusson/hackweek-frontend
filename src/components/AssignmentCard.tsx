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
  setAssignments: (assignments) => void;
}) {
  const removeAssignment = useMutation({
    mutationFn: () => {
      return axios.delete(
        "http://localhost:3000/api/assignment/" + assignment.id
      );
    },
    onSuccess: () => {
      console.log("sucess1");
      setAssignments((prevAssignments: AssignmentDto[]) =>
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
      <h4>driver: {assignment.driverInfo ? assignment.driverInfo.name : ""}</h4>
      <h4>truck: {assignment.truckInfo ? assignment.truckInfo.type : ""}</h4>
      {assignment.legs.map((leg: LegInfo) => (
        <div key={leg.id}>
          <p>started at {leg.startLocation} </p>
          <p>ended at {leg.endLocation} </p>
        </div>
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
