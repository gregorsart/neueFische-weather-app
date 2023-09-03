export default function List({
  entries,
  isForGoodWeather,
  onHandleDeleteActivity,
}) {
  return (
    <>
      <h3>
        {isForGoodWeather
          ? `Activities for good weather:`
          : `Activities for bad weather:`}
      </h3>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.activityName}
            <button
              className="button__delete"
              type="button"
              onClick={() => onHandleDeleteActivity(entry.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
