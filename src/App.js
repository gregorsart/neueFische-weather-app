import { useState } from "react";
import "./App.css";
import { uid } from "uid";

function App() {
  const [entries, setEntries] = useState([
    { id: uid(), activityName: "Swimming in the sea", isForGoodWeather: true },
  ]);

  function handleSubmit(activityName, isForGoodWeather) {
    console.log("entires---inSubmit", entries);

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

        <ul>
          {entries.map((entry) => {
            return (
              <List
                id={entry.id}
                activityName={entry.activityName}
                isForGoodWeather={entry.isForGoodWeather}
              />
            );
          })}{" "}
        </ul>
      </main>
    </div>
  );
}

function Form({ onHandleSubmit }) {
  const [activityName, setActivityName] = useState("");
  const [isForGoodWeather, setIsForGoodWeather] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setActivityName(event.target.activityName.value);
    setIsForGoodWeather(event.target.isForGoodWeather.checked);
    onHandleSubmit(activityName, isForGoodWeather);
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

function List({ id, activityName, isForGoodWeather }) {
  return (
    <ul>
      <li key={id}>{activityName}</li>
    </ul>
  );
}

export default App;
