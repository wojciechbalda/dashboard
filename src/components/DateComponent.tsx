import { useEffect, useState } from "react";
import { BsCalendar } from "react-icons/bs";
import styled from "styled-components";

const Text = styled.span`
  width: min-content;
`;

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <BsCalendar />
      <Text>
        {`${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`}
      </Text>
    </>
  );
};

export default DateComponent;
