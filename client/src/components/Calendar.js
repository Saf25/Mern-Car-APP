import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewEntry } from "../slices/calendarSlice";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";
import "./Calendar.scss";
const Schedule = ({
  title,
  description,
  reservation_date,
  reservation_time,
}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const { errors } = useSelector((state) => state.entry);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  function toUTC(d) {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 6000);
  }
  function confirm(d, t) {
    if (time !== "" && time !== null)
      return `Congrats, you next car check is scheduled on: \n
  ${d.toDateString()} On ${t}`;
  }
  const addEntry = (data) => {
    dispatch(
      addNewEntry({
        ...data,
        reservation_date: toUTC(date),
        reservation_time: time,
      })
    );
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(addEntry)}>
          <div className="sb">
            <label>Title</label>
            <select
              className="width3"
              {...register("title")}
              placeholder="title of appointment"
            >
              <option value="Auto Repair">Auto Repair</option>
              <option value="Auto Maintenance">Auto Maintenance</option>
              <option value="Oil Change & Lube Services">
                Oil Change & Lube Services
              </option>
              <option value="Reviews">Reviews</option>
            </select>
            <label className="ml">Description</label>
            <input
              className="width3"
              {...register("description")}
              placeholder="description of appointment"
            ></input>
          </div>
          <br></br>
          <button
            onClick={confirm(date, time)}
            type="submit"
            className="btn btn-warning lobster"
          >
            Confirm your date
          </button>
          <br></br>
          <br></br>

          <br></br>
          <br></br>
          <div className="calendar__picture">
            <p>Selected Date</p>
            <h2>{date.toDateString()}</h2>
            <h3>{time}</h3>
          </div>
          <Calendar className="calendarh" onChange={setDate} value={date} />
          <div className="color1 lobster shdw">
            <p>Please choose the time of your appointment</p>
            <br></br>
            <TimePicker
              className="color"
              onChange={setTime}
              value={time}
              maxTime="17:30:00"
              minTime="09:00:00"
            />{" "}
          </div>
          <div className="confirm" id="anim">
            {errors !== false && <p id="anim">{errors && errors.msg}</p>}
            {!errors && <p>{confirm(date, time)}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
