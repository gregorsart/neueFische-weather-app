export default function Widget({ dataFromApi }) {
  return (
    <div className="widget__container">
      <div className="widget__text">
        <p>Location: {dataFromApi.location}</p>
        <p>Temperature: {dataFromApi.temperature}</p>
      </div>
      <p className="widget__icon">{dataFromApi.condition}</p>
    </div>
  );
}
