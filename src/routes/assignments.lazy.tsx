import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { AssignmentDto } from "../types";
import { useEffect, useState } from "react";
import { AssignmentGallery } from "../components/AssignmentGallery";
export const Route = createLazyFileRoute("/assignments")({
  component: Assignments,
});

function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentDto[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignment")
      .then((res) => res.data)
      .then((res) => setAssignments(res))
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }, []);

  return (
    <div>
      <AssignmentGallery
        title="Active Assignments"
        assignments={assignments.filter((e) => e.status == "Active")}
        setAssignments={setAssignments}
      ></AssignmentGallery>

      <AssignmentGallery
        title="Unassigned Assignments"
        assignments={assignments.filter((e) => e.status == "Unassigned")}
        setAssignments={setAssignments}
      ></AssignmentGallery>

      <AssignmentGallery
        title="Finished Assignments"
        assignments={assignments.filter((e) => e.status == "Finished")}
        setAssignments={setAssignments}
      ></AssignmentGallery>
    </div>
  );
}
