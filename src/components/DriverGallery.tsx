import { DriverDto } from "../types";
import { DriverCard } from "./DriverCard";

export function DriverGallery({
  drivers,
  setDrivers,
}: {
  drivers: DriverDto[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  return (
    <>
      {drivers.map((driver: DriverDto) => (
        <DriverCard
          key={driver.id}
          driver={driver}
          setDrivers={setDrivers}
        ></DriverCard>
      ))}
    </>
  );
}
