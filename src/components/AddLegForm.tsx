import axios from "axios";
import { AddLegDto, AssignmentDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styling/AddLegForm.css";
export function AddLegForm({
  assignment,
  setAssignments,
}: {
  assignment: AssignmentDto;
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
  const { register, handleSubmit, reset } = useForm<AddLegDto>();

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
      reset();
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
      <form className="addLegForm" onSubmit={handleSubmit(onSubmit)}>
        <label>StartDate:</label>
        <input
          className="button"
          {...register("startDate", { required: true })}
          type="date"
        />
        <label>EndDate:</label>
        <input
          className="button"
          {...register("endDate", { required: true })}
          type="date"
        />
        <label>StartLocation:</label>
        <input
          className="button"
          {...register("startLocation", { required: true })}
        />
        <label>EndLocation:</label>
        <input
          className="button"
          {...register("endLocation", { required: true })}
        />
        <button className="button" type="submit">
          Add Leg
        </button>
      </form>
    </>
  );
}
