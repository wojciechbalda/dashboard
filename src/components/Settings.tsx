import { useEffect, useState } from "react";
import Title from "./Title";
import styled from "styled-components";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import PhotoModalContent from "./PhotoModalContent";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Button from "./Button";
import UserDataForm from "./UserDataForm";
import { setIsOpen } from "../store/desktopSettingsTabControlSlice";
import { useAppSelector } from "../hooks/useAppSelector";

const Container = styled.div`
  padding: 5%;
  display: grid;
  gap: 1rem;
`;

const SettingsContainer = styled.div<{ $isOpen: boolean }>`
  display: block;
  @media (min-width: 1280px) {
    background-color: #393939fa;
    position: fixed;
    right: ${(props) => (props.$isOpen ? "0" : "-100%")};
    top: 0;
    bottom: 0;
    width: 20%;
    z-index: 999;
  }
`;

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isTabOpen = useAppSelector(
    (state) => state.desktopSettingsTabControl.isOpen,
  );
  const handleSwitchModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    getComputedStyle(document.documentElement).getPropertyValue("--logo-color");
  }, []);

  return (
    <SettingsContainer $isOpen={isTabOpen}>
      <Title>Settings</Title>
      <Container>
        <section>
          <p>Appearance</p>
          <Button onClick={handleSwitchModal}>Change background image</Button>
          {isModalOpen &&
            createPortal(
              <Modal height="80vh">
                <PhotoModalContent onClick={handleSwitchModal} />
              </Modal>,
              document.body,
            )}
        </section>
        <section>
          <div>User data</div>
          <UserDataForm />
        </section>
        <Button onClick={() => dispatch(setIsOpen(false))}>
          Close settings
        </Button>
      </Container>
    </SettingsContainer>
  );
};

export default Settings;
