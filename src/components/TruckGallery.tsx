import { TruckCard } from "../components/TruckCard";
import { TruckDto } from "../types";

export function TruckGallery({
  trucks,
  setTrucks,
}: {
  trucks: TruckDto[];
  setTrucks: React.Dispatch<React.SetStateAction<TruckDto[]>>;
}) {
  return (
    <>
      {trucks.map((truck: TruckDto) => (
        <TruckCard
          key={truck.id}
          truck={truck}
          setTrucks={setTrucks}
        ></TruckCard>
      ))}
    </>
  );
}
