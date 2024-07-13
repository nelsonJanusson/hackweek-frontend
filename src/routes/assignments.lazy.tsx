import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddAssignmentDto, Assignment } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/assignments")({
  component: Trucks,
});

function Trucks() {
  const [assignments, setAssignment] = useState<Assignment[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignment")
      .then((res) => res.data)
      .then((res) => setAssignment(res));
  }, []);

  const { register, handleSubmit } = useForm<AddAssignmentDto>();

  const onError = (errors: any) => console.error(errors);

  const mutation = useMutation({
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
    onSuccess: (e) => {
      setAssignment((prevAssignments) => [...prevAssignments, e.data]);
    },
  });

  const onCreateTodo = (e: AddAssignmentDto) => {
    mutation.mutate(e);
  };

  return (
    <div>
      <h1>Trucks</h1>
      {assignments.map((assignment: Assignment) => (
        <p>{assignment.product}</p>
      ))}
      <form onSubmit={handleSubmit(onCreateTodo, onError)}>
        <input {...register("product", { required: true })} />
        <input {...register("pickupLocation", { required: true })} />
        <input {...register("destination", { required: true })} />
        <input type="submit" />
      </form>
    </div>
  );
}
