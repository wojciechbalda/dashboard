import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Button from "./Button";
import { setBackgroundImage } from "../store/userDataSlice";
import Message from "./Message";

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: auto;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  &.active {
    filter: grayscale(100%);
    border: 12px solid black;
  }
`;

const Search = styled.input`
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.7rem 1.2rem;
  border: none;
  outline: none;
`;

type Image = {
  webformatURL: string;
  largeImageURL: string;
};

type PhotoModalContentProps = {
  onClick: () => void;
};

const PhotoModalContent = ({ onClick }: PhotoModalContentProps) => {
  const [query, setQuery] = useState("");
  const url = `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&orientation=horizontal&per_page=24&q=${query}`;
  const [images, setImages] = useState<Image[] | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useAppDispatch();

  const handleSelectedImageConfirm = () => {
    dispatch(setBackgroundImage(selectedImage));
    onClick();
  };

  const getImages = useCallback(async () => {
    const {
      data: { hits },
    } = await axios<{ hits: Image[] }>(url);
    setImages(hits);
  }, [url]);

  useEffect(() => {
    const timeoutId = setTimeout(getImages, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [getImages]);

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        maxHeight: "100%",
        overflow: "hidden",
        flexGrow: "1",
      }}
    >
      <Search
        placeholder="Write here whatever you want to find"
        autoFocus
        type="search"
        onChange={onSearch}
      />
      {images?.length === 0 && <Message>No images</Message>}
      <Gallery>
        {images &&
          images.map((image) => (
            <ImageContainer
              onClick={() => setSelectedImage(image.largeImageURL)}
              key={image.webformatURL}
            >
              <Image
                className={
                  image.largeImageURL === selectedImage ? "active" : ""
                }
                src={image.webformatURL}
              />
            </ImageContainer>
          ))}
      </Gallery>
      <Button onClick={handleSelectedImageConfirm}>
        {selectedImage ? "Confirm" : "Reset (default image will be loaded)"}
      </Button>
      <Button onClick={onClick}>Cancel</Button>
    </div>
  );
};

export default PhotoModalContent;
