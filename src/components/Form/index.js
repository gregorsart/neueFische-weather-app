export default function Form({ onHandleActivity }) {
  function handleSubmit(event) {
    event.preventDefault();

    onHandleActivity(
      event.target.activityName.value,
      event.target.isForGoodWeather.checked
    );
    event.target.reset();
  }
  return (
    <>
      <h2>Add new Activity:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Name of Activity:</label>
        <input type="text" id="text" name="activityName" />
        <div className="checkbox__container">
          <input type="checkbox" name="isForGoodWeather" id="weather" />
          <label htmlFor="weather">Good-weather activity</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
