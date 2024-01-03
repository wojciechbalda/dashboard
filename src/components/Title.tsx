import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  padding: 1rem 5%;
  background-color: #b5b5b5;
  color: black;
  font-size: 1.3rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;

export default Title;
