import { useEffect, useState } from "react";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [isForGoodWeather, setIsForGoodWeather] = useState(true);
  const [entries, setEntries] = useLocalStorageState("activities", {
    defaultValue: [
      {
        id: uid(),
        activityName: "Swimming in the sea",
        isForGoodWeather: true,
      },
    ],
  });

  // useEffect(() => {
  //   fetchWeather();
  // }, []);

  async function fetchWeather() {
    const response = await fetch("https://example-apis.vercel.app/api/weather");
    const weatherData = await response.json;
    setIsForGoodWeather(weatherData.isGoodWeather);
  }

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
          <li key={entry.id}>{entry.activityName}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
