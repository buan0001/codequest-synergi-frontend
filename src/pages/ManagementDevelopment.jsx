import FetchPages from "../components/FetchPages";

export default function ManagementDevelopment() {
  const prop = "ledelsesudvikling";
  return (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
