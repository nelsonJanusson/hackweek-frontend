import { useState } from "react";
import { AssignmentDto } from "../types";
import { AssignmentCard } from "./AssignmentCard";

export function AssignmentGallery({
  assignments,
  setAssignments,
  title,
}: {
  assignments: AssignmentDto[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentDto[]>>;
  title: string;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>{title}</h2>
      </div>
      {selected && (
        <div className="gallery-new">
          {assignments.map((assignment: AssignmentDto) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              setAssignments={setAssignments}
            ></AssignmentCard>
          ))}
        </div>
      )}
    </div>
  );
}
