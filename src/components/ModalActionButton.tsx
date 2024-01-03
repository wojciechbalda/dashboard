import styled from "styled-components";

const ModalActionButton = styled.button<{ $isClosingAction?: boolean }>`
  width: 100%;
  flex-shrink: 0;
  line-height: 1.5;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  background-color: ${(props) =>
    props.$isClosingAction ? "#272727" : "#24d75a"};
`;

export default ModalActionButton;
