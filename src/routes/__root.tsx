import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 bg-emerald-400">
        <Link
          to="/drivers"
          className="[&.active]:font-bold  [&.active]:bg-emerald-600 p-2 grow"
        >
          Drivers
        </Link>{" "}
        <Link
          to="/trucks"
          className="[&.active]:font-bold  [&.active]:bg-emerald-600 p-2 grow"
        >
          Trucks
        </Link>{" "}
        <Link
          to="/assignments"
          className="[&.active]:font-bold  [&.active]:bg-emerald-600 p-2 grow"
        >
          Assignments
        </Link>{" "}
        <Link
          to="/customers"
          className="[&.active]:font-bold  [&.active]:bg-emerald-600 p-2 grow"
        >
          Customers
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
