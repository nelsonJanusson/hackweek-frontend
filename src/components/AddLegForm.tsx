import axios from "axios";
import { AddLegDto, AssignmentDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

export function AddLegForm({
  assignment,
  setAssignments,
}: {
  assignment: AssignmentDto;
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
  const { register, handleSubmit } = useForm<AddLegDto>();

  const addLeg = useMutation({
    mutationFn: (e: AddLegDto) => {
      return axios.post(
        "http://localhost:3000/api/assignment/leg/" + assignment.id,
        JSON.stringify(e),
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

  const onSubmit = (data: AddLegDto) => {
    addLeg.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          StartDate:
          <input {...register("startDate", { required: true })} type="date" />
        </label>
        <label>
          EndDate:
          <input {...register("endDate", { required: true })} type="date" />
        </label>
        <label>
          StartLocation:
          <input {...register("startLocation", { required: true })} />
        </label>
        <label>
          EndLocation:
          <input {...register("endLocation", { required: true })} />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}
