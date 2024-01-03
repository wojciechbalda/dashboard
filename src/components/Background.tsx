import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector";

const BackgroundDiv = styled.div<{ $background: string }>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
  background-image: linear-gradient(
      356deg,
      rgba(66, 66, 66, 0.6) 0%,
      rgba(61, 61, 61, 0.6) 100%
    ),
    url(${(props) => props.$background});
  background-size: cover;
  background-repeat: no-repeat;
  @media (min-width: 1280px) {
    background-image: linear-gradient(
        356deg,
        rgba(66, 66, 66, 0.05) 0%,
        rgba(61, 61, 61, 0.05) 100%
      ),
      url(${(props) => props.$background});
  }
`;

const Background = () => {
  const background =
    useAppSelector((state) => state.userData.backgroundImage) ||
    "https://cdn.pixabay.com/photo/2023/04/06/08/18/ai-generated-7903251_1280.jpg";

  return <BackgroundDiv $background={background} />;
};

export default Background;
