import { useState } from "react";
import { TruckCard } from "../components/TruckCard";
import { TruckDto } from "../types";

export function TruckGallery({
  trucks,
  setTrucks,
  title,
}: {
  trucks: TruckDto[];
  setTrucks: React.Dispatch<React.SetStateAction<TruckDto[]>>;
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
          {trucks.map((truck: TruckDto) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              setTrucks={setTrucks}
            ></TruckCard>
          ))}
        </div>
      )}
    </div>
  );
}
