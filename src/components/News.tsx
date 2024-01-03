import styled from "styled-components";
import SingleNews from "./SingleNews";
import { useEffect, useState } from "react";
import { SingleNewsProps } from "../api-types";
import Title from "./Title";
import Container from "./Container";
import Message from "./Message";
import Loader from "./Loader";
import axios from "axios";

const NewsList = styled.div`
  display: grid;
  gap: 1.5rem;
  flex-grow: 1;
  padding: 1rem 5%;
  @media (min-width: 1280px) {
    padding: 0 5%;
    height: 100%;
    overflow-y: scroll;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const News = () => {
  const [news, setNews] = useState<SingleNewsProps[] | undefined>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const {
          data: { articles },
        }: { data: { articles: SingleNewsProps[] } } = await axios(
          `https://gnews.io/api/v4/top-headlines?lang=en&apikey=${import.meta.env.VITE_NEWS_API_KEY}`,
        );
        setNews(articles);
      } catch (error) {
        setIsError(true);
      }
    }

    getData();
  }, []);

  return (
    <Container>
      <Title>News</Title>
      {!news && !isError && <Loader />}
      {news && (
        <NewsList>
          {news.map((sNews) => (
            <SingleNews
              key={sNews.url}
              title={sNews.title}
              image={sNews.image}
              source={sNews.source}
              url={sNews.url}
            />
          ))}
        </NewsList>
      )}
      {isError && !news && (
        <Message>
          <p>Error</p>
          <p>Something went wrong</p>
        </Message>
      )}
    </Container>
  );
};

export default News;
