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
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [
      {
        id: uid(),
        activityName: "Visiting a museum",
        isForGoodWeather: false,
      },
      {
        id: uid(),
        activityName: "Reading a book at the beach",
        isForGoodWeather: true,
      },
    ],
  });
  // Always update the filtered Activites on rerender
  const filteredActivitesArray = activities.filter((activity) => {
    return activity.isForGoodWeather === dataFromApi.isGoodWeather;
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

  // LOGIC for form submission
  function handleActicity(activityName, isForGoodWeather) {
    setActivities([
      {
        id: uid(),
        activityName: activityName,
        isForGoodWeather: isForGoodWeather,
      },
      ...activities,
    ]);
  }

  // DELETE (ON CLICK)
  function handleClick(id) {
    const deleteEntries = activities.filter((_entry) => _entry.id !== id);
    setActivities(deleteEntries);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <hr />
      </header>
      <main>
        <Widget dataFromApi={dataFromApi} />

        <Form onHandleActivity={handleActicity} />

        <List
          entries={filteredActivitesArray}
          isForGoodWeather={dataFromApi.isGoodWeather}
          onHandleClick={handleClick}
        />
      </main>
    </div>
  );
}

export default App;
