import styled, { keyframes } from "styled-components";

const scaleUp = keyframes`
    0% { transform: translate(-50%, -50%) scale(0) }
    60% , 100% { transform: translate(-50%, -50%)  scale(1)}
`;

const pulse = keyframes`
    0% , 60% , 100%{ transform:  scale(1) }
    80% { transform:  scale(1.2)}
`;

const LoaderItem = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: ${pulse} 1s linear infinite;
  &::after {
    content: "";
    position: absolute;
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${scaleUp} 1s linear infinite;
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  gap: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: white;
  font-size: 700;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderItem />
      Loading
    </LoaderWrapper>
  );
};

export default Loader;
