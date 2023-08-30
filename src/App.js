import { useState } from "react";
import "./App.css";
import { uid } from "uid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <Form />
      </main>
    </div>
  );
}

function Form() {
  const [entries, setEntries] = useState([
    { id: uid(), activityName: "Swimming in the sea", isForGoodWeather: true },
  ]);
  const [activityName, setActivityName] = useState("");
  const [isForGoodWeather, setIsForGoodWeather] = useState(false);

  function handleSubmit(event) {
    console.log("entires---inSubmit", entries);
    event.preventDefault();
    setActivityName(event.target.activityName.value);
    setIsForGoodWeather(event.target.isForGoodWeather.checked);

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
      {console.log("entires---below", entries)}
    </>
  );
}

export default App;
