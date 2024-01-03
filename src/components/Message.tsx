import styled from "styled-components";

const Message = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  gap: 0.5rem;
  text-align: center;
  padding: 0 1rem;
`;

export default Message;
