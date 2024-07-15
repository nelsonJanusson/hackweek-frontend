import { AssignmentDto } from "../types";
import { AssignmentCard } from "./AssignmentCard";

export function AssignmentGallery({
  assignments,
  setAssignments,
}: {
  assignments: AssignmentDto[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
}) {
  return (
    <div>
      {assignments.map((assignment: AssignmentDto) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          setAssignments={setAssignments}
        ></AssignmentCard>
      ))}
    </div>
  );
}
