import styled from "styled-components";

const Content = styled.div`
  min-height: 100vh;
  padding-bottom: 4rem;
  display: grid;
  @media (min-width: 1280px) {
    display: flex;
    align-items: center;
    padding: 4rem 6.5rem;
  }
`;

export default Content;
