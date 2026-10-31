import { locations } from "../data/site";
export default function Locations({ className = "" }) {
  return (
    <div className={`locations ${className}`}>
      {locations.map((location) => (
        <address key={location.id}>
          <strong>{location.name}</strong>
          <span>{location.address}</span>
        </address>
      ))}
    </div>
  );
}
