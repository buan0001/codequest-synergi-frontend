import FetchPages from "../components/FetchPages";

export default function Theory() {
  const prop = "ståsted";
  return (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
