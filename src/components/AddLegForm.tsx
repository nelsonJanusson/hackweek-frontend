import axios from "axios";
import { AddLegDto, AssignmentDto } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styling/AddLegForm.css";
import toast, { Toaster } from "react-hot-toast";
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
        "https://hackweek-backend.azurewebsites.net/api/assignment/leg/" +
          assignment.id,
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
      toast.success("Leg added succesfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("There was an error adding the leg, please try again");
    },
  });

  const onSubmit = (data: AddLegDto) => {
    addLeg.mutate(data);
  };

  return (
    <>
      <form
        className="bg-emerald-400 m-2  p-1 rounded-[4px] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Add New Leg</h2>

        <div className="border-t border-black">
          <div className="form3">
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
            <button className="button-real" type="submit">
              Add Leg
            </button>
          </div>
        </div>
      </form>
      <Toaster position="top-center" />
    </>
  );
}
