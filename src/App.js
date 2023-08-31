import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  // STATES
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
  // EFFECT
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
  // FILTER
  const filteredArray = entries.filter((entry) => {
    return entry.isForGoodWeather === isForGoodWeather;
  });
  // LOGIK
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

export default App;
