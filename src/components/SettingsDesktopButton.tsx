import { LuSettings } from "react-icons/lu";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setIsOpen } from "../store/desktopSettingsTabControlSlice";

const Button = styled.button`
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  transform: translate(-40%, -40%);
  height: 4rem;
  aspect-ratio: 1/1;
  font-size: 2rem;
  color: whitesmoke;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background-color: #454545;
`;

const SettingsDesktopButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button onClick={() => dispatch(setIsOpen(true))}>
      <LuSettings />
    </Button>
  );
};

export default SettingsDesktopButton;
