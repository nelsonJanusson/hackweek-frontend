import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/customers")({
  component: Customers,
});

function Customers() {
  return (
    <div className="p-2">
      <h3>customers</h3>
    </div>
  );
}
