import { useEffect, useState } from "react";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [isForGoodWeather, setIsForGoodWeather] = useState();
  const [entries, setEntries] = useLocalStorageState("activities", {
    defaultValue: [
      {
        id: uid(),
        activityName: "Swimming in the sea",
        isForGoodWeather: true,
      },
      {
        id: uid(),
        activityName: "Reading a book at the beach",
        isForGoodWeather: false,
      },
    ],
  });

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather"
      );
      const weatherData = await response.json();
      setIsForGoodWeather(weatherData.isGoodWeather);
    }
    fetchWeather();
  }, []);

  const filteredArray = entries.filter((entry) => {
    return entry.isForGoodWeather === isForGoodWeather;
  });

  function handleSubmit(activityName, isForGoodWeather) {
    setEntries([
      {
        id: uid(),
        activityName: activityName,
        isForGoodWeather: isForGoodWeather,
      },
      ...entries,
    ]);
  }
  if (!isForGoodWeather) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <Form onHandleSubmit={handleSubmit} />
        <List entries={filteredArray} isForGoodWeather={isForGoodWeather} />
      </main>
    </div>
  );
}

function Form({ onHandleSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    onHandleSubmit(
      event.target.activityName.value,
      event.target.isForGoodWeather.checked
    );
  }
  return (
    <>
      <h2>Add new Activity:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Name of Activity:</label>
        <input id="text" name="activityName" />
        <div>
          <input type="checkbox" name="isForGoodWeather" id="weather" />
          <label htmlFor="weather">Good-weather activity</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function List({ entries, isForGoodWeather }) {
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
            <button className="button__delete" type="button">
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

export default App;
