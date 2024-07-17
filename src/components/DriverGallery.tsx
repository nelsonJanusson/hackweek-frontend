import { useState } from "react";
import { DriverDto } from "../types";
import { DriverCard } from "./DriverCard";

export function DriverGallery({
  drivers,
  setDrivers,
  title,
}: {
  title: string;
  drivers: DriverDto[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverDto[]>>;
}) {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div className="form-container">
      <div onClick={() => setSelected(!selected)}>
        <h2>{title}</h2>
      </div>

      {selected && (
        <div className="gallery-new">
          {drivers.map((driver: DriverDto) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              setDrivers={setDrivers}
            ></DriverCard>
          ))}
        </div>
      )}
    </div>
  );
}
