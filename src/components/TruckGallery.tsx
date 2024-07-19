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
  //const [selected, setSelected] = useState<boolean>(true);
  const selected = true;

  return (
    <div className="form-container">
      <div>
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
//onClick={() => setSelected(!selected)}
