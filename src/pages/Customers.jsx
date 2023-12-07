import FetchPages from "../components/FetchPages";

export default function Kunder() {
  const prop = "kunder";
  return (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
