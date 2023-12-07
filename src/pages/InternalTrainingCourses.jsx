import FetchPages from "../components/FetchPages";

export default function InternalTrainingCourses() {
  const prop = "interne uddannelsesforløb";
  return (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
