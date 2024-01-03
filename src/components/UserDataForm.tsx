import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import {
  setLocation,
  setLocationId,
  setUsername,
} from "../store/userDataSlice";
import { useRef, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import styled from "styled-components";

const ErrorMessage = styled.p`
  color: red;
  padding: 0.2rem 0.7rem;
  background-color: #eee;
`;

type UserDataFormProps = {
  onSubmit?: (value: boolean) => void;
};

const UserDataForm = ({ onSubmit }: UserDataFormProps) => {
  const [locationError, setLocationError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const usernameInput = useRef<HTMLInputElement>(null);
  const locationInput = useRef<HTMLInputElement>(null);
  const usernameDefaultValue = useAppSelector(
    (state) => state.userData.username,
  );
  const locationDefaultValue = useAppSelector(
    (state) => state.userData.location,
  );

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocationError("");
    setUsernameError("");

    let username = "";
    let location = "";
    let key = 0;

    if (usernameInput.current?.value === "")
      setUsernameError("Username cannot be an empty value");
    else username = usernameInput.current!.value;

    if (locationInput.current?.value === "") {
      setLocationError("Location cannot be an empty value");
      return;
    }

    try {
      const { data } = await axios<[{ Key: number; EnglishName: string }]>(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${import.meta.env.VITE_WEATHER_API_KEY}&q=${locationInput.current?.value}`,
      );
      if (!data.length) {
        setLocationError("Location does not exist");
        return;
      }
      const { Key, EnglishName: locationName } = data[0];
      if (Key) {
        location = locationName;
        key = Key;
      }
    } catch (err) {
      setLocationError("Something went wrong");
    }

    if (username && location) {
      dispatch(setUsername(username));
      dispatch(setLocationId(key));
      dispatch(setLocation(location));
      if (onSubmit) onSubmit(false);
      locationInput.current!.value = location;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={usernameInput}
        type="text"
        placeholder="Username"
        defaultValue={usernameDefaultValue}
      />
      {!!usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
      <Input
        ref={locationInput}
        type="text"
        placeholder="Location"
        defaultValue={locationDefaultValue}
      />
      {!!locationError && <ErrorMessage>{locationError}</ErrorMessage>}
      <Button type="submit">Click to save changes</Button>
    </form>
  );
};

export default UserDataForm;
