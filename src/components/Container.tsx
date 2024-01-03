import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  @media (min-width: 1280px) {
    padding: 1rem;
    border: 1px solid rgba(39, 39, 39, 0.3);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    background: rgba(39, 39, 39, 0.58);
    overflow: hidden;
    width: auto;
  }
`;

export default Container;
