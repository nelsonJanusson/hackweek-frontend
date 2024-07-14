import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AddAssignmentDto, AssignmentDto } from "../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AssignmentCard } from "../components/AssignmentCard";

export const Route = createLazyFileRoute("/assignments")({
  component: Trucks,
});

function Trucks() {
  const [assignments, setAssignments] = useState<AssignmentDto[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignment")
      .then((res) => res.data)
      .then((res) => setAssignments(res));
  }, []);

  const { register, handleSubmit } = useForm<AddAssignmentDto>();

  const onError = (errors) => console.error(errors);

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
      setAssignments((prevAssignments) => [...prevAssignments, e.data]);
    },
  });

  const onCreateTodo = (e: AddAssignmentDto) => {
    mutation.mutate(e);
  };

  return (
    <div>
      <h1>Assignments</h1>
      {assignments.map((assignment: AssignmentDto) => (
        <AssignmentCard
          assignment={assignment}
          setAssignments={setAssignments}
        ></AssignmentCard>
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
