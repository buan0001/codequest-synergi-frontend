import FetchPages from "../components/FetchPages";

export default function Coaching() {
  const prop = "anerkendende coaching";
  return (
    <div className="p-4">
      <FetchPages title={prop} />;
    </div>
  );
}
