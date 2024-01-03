import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsWind } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import Container from "./Container";
import Title from "./Title";
import DateComponent from "./DateComponent";
import Message from "./Message";
import { useAppSelector } from "../hooks/useAppSelector";

type WeatherData = {
  WeatherIcon: number;
  WeatherText: string;
  Visibility: {
    Metric: {
      Unit: number;
      Value: number;
    };
  };
  Wind: {
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
      };
    };
  };
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
  };
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  font-size: 1.4rem;
  &:nth-child(2) {
    text-align: right;
  }
`;

const BasicContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled(BasicContainer)`
  height: 100%;
  flex-direction: column;
`;

const Center = styled.div`
  text-align: center;
`;

const User = () => {
  const [weather, setWeather] = useState<
    (WeatherData & { country: string }) | undefined
  >();
  const [error, setError] = useState(false);
  const location = useAppSelector((state) => state.userData.location);
  const username = useAppSelector((state) => state.userData.username);

  useEffect(() => {
    async function getData() {
      if (!location) return;
      setError(false);
      try {
        const {
          data: [locationData],
        } = await axios<
          [
            {
              Key: number;
              EnglishName: string;
              Country: { EnglishName: string };
            },
          ]
        >(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`,
        );
        const {
          Key: locationKey,
          Country: { EnglishName: country },
        } = locationData;
        const {
          data: [weatherData],
        } = await axios<[WeatherData]>(
          `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${import.meta.env.VITE_WEATHER_API_KEY}&details=true`,
        );
        setWeather({ ...weatherData, country });
      } catch (error) {
        setError(true);
      }
    }
    getData();
  }, [location]);

  return (
    <Container>
      <Title>Home</Title>
      <ContentContainer>
        <BasicContainer>
          <StyledDiv>
            <BiUser />
            {username}
          </StyledDiv>
          <StyledDiv>
            <DateComponent />
          </StyledDiv>
        </BasicContainer>
        {error && (
          <Message>An error occured, we cannot receive weather data</Message>
        )}
        {weather && (
          <>
            <Center>
              <div>
                {location}, {weather.country}
              </div>
              <div>{weather.Temperature.Metric.Value}&#8451;</div>
              <div>
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${
                    weather.WeatherIcon < 10
                      ? `0${weather.WeatherIcon}`
                      : weather.WeatherIcon
                  }-s.png`}
                />
              </div>
              <div>{weather.WeatherText}</div>
            </Center>
            <BasicContainer>
              <StyledDiv>
                <BsWind />
                {weather.Wind.Speed.Metric.Value}
                {weather.Wind.Speed.Metric.Unit}
              </StyledDiv>
              <StyledDiv>
                <AiOutlineEye />
                {weather.Visibility.Metric.Value}
                {weather.Visibility.Metric.Unit}
              </StyledDiv>
            </BasicContainer>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default User;
