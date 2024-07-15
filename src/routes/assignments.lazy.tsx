import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddAssignmentDto, AssignmentDto } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AssignmentGallery } from "../components/AssignmentGallery";

export const Route = createLazyFileRoute("/assignments")({
  component: Trucks,
});

function Trucks() {
  const [assignments, setAssignments] = useState<AssignmentDto[]>([]);
  const { register, handleSubmit, reset } = useForm<AddAssignmentDto>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignment")
      .then((res) => res.data)
      .then((res) => setAssignments(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  const addAssignment = useMutation({
    mutationFn: (e: AddAssignmentDto) => {
      return axios.post(
        "http://localhost:3000/api/assignment",
        JSON.stringify(e),
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
      setAssignments((prevAssignments) => [...prevAssignments, e.data]);
      reset();
    },
  });

  const onSubmit = (e: AddAssignmentDto) => {
    addAssignment.mutate(e);
  };

  return (
    <div>
      <h1>Register new Assignment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Product:
          <input {...register("product", { required: true })} />
        </label>
        <label>
          Pickuplocation:
          <input {...register("pickupLocation", { required: true })} />
        </label>
        <label>
          Destination:
          <input {...register("destination", { required: true })} />
        </label>
        <input type="submit" />
      </form>
      <h1>Active Assignments</h1>
      <AssignmentGallery
        assignments={assignments.filter((e) => e.status == "Active")}
        setAssignments={setAssignments}
      ></AssignmentGallery>

      <h1>Unassigned Assignments</h1>
      <AssignmentGallery
        assignments={assignments.filter((e) => e.status == "Unassigned")}
        setAssignments={setAssignments}
      ></AssignmentGallery>

      <h1>Finished Assignments</h1>
      <AssignmentGallery
        assignments={assignments.filter((e) => e.status == "Finished")}
        setAssignments={setAssignments}
      ></AssignmentGallery>
    </div>
  );
}
