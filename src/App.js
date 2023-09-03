import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";
import Widget from "./components/Widget";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  // STATES
  const [dataFromApi, setDataFromApi] = useState({});
  const [filteredEntries, setFilteredEntries] = useState([]);
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

  // EFFECT for fetching weather
  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather"
      );
      const weatherData = await response.json();
      setDataFromApi(weatherData);
    }
    fetchWeather();

    const interval = setInterval(fetchWeather, 4000);
    return () => clearInterval(interval);
  }, []);

  // EFFECT for filtering entries
  useEffect(() => {
    const filteredArray = entries.filter((entry) => {
      return entry.isForGoodWeather === dataFromApi.isGoodWeather;
    });
    setFilteredEntries(filteredArray);
  }, [entries, dataFromApi]);

  // LOGIC for form submission
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

  // DELETE (ON CLICK)
  function handleClick(id) {
    const deleteEntries = entries.filter((_entry) => _entry.id !== id);
    setEntries(deleteEntries);
    console.log("delete___", deleteEntries);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <hr />
      </header>
      <main>
        <Widget dataFromApi={dataFromApi} />

        <Form onHandleSubmit={handleSubmit} />

        <List
          entries={filteredEntries}
          isForGoodWeather={dataFromApi}
          onHandleClick={handleClick}
        />
      </main>
    </div>
  );
}

export default App;
