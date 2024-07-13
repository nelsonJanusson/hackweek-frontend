import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/drivers" className="[&.active]:font-bold">
          drivers
        </Link>{" "}
        <Link to="/trucks" className="[&.active]:font-bold">
          trucks
        </Link>{" "}
        <Link to="/assignments" className="[&.active]:font-bold">
          assignments
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
