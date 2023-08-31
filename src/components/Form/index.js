export default function Form({ onHandleSubmit }) {
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
        <div className="checkbox__container">
          <input type="checkbox" name="isForGoodWeather" id="weather" />
          <label htmlFor="weather">Good-weather activity</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
