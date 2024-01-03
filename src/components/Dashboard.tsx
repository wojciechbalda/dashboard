import styled from "styled-components";

const Dashboard = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  color: white;
  position: relative;
  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 300px 300px;
    gap: 1rem;
  }
`;

export default Dashboard;
