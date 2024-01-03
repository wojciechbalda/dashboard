import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import UserDataForm from "./UserDataForm";

const StartPage = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      {isActive &&
        createPortal(
          <Modal>
            <UserDataForm onSubmit={setIsActive} />
          </Modal>,
          document.body,
        )}
    </>
  );
};

export default StartPage;
