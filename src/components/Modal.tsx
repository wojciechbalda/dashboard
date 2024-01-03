import styled from "styled-components";

const ModalContainer = styled.div<{ $height?: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 50%;
  width: 90%;
  max-width: 1280px;
  top: 50vh;
  height: ${(props) => props.$height};
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 999;
  border: 5px solid #fff;
`;

const Backdrop = styled.div`
  position: fixed;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #100f0fc3;
  z-index: 999;
`;

type ModalProps = {
  height?: string;
  children: React.ReactNode;
};

const Modal = ({ children, height }: ModalProps) => {
  return (
    <>
      <Backdrop />
      <ModalContainer $height={height ? height : "auto"}>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;
