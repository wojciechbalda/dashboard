import styled from "styled-components";
import { SingleNewsProps } from "../api-types";

const NewsContainer = styled.a`
  display: grid;
  grid-template-rows: auto 1fr;
  color: white;
  text-decoration: none;
`;

const ImgContainer = styled.div`
  width: 100%;
  & img {
    object-fit: cover;
    width: 100%;
  }
`;

const SingleNews = ({
  title,
  image,
  source: { name },
  url,
}: SingleNewsProps) => {
  return (
    <NewsContainer href={url} target="_blank">
      <ImgContainer>
        <img src={image} />
      </ImgContainer>
      <div>
        <h2>{title}</h2>
        <p>
          Source: <span>{name}</span>
        </p>
      </div>
    </NewsContainer>
  );
};

export default SingleNews;
