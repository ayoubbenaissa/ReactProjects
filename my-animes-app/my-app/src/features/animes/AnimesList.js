import AnimeItem from "./AnimeItem";

import Wrapper from "../../UI/Wrapper";

const AnimesList = ({ animes }) => {
  return (
    <>
      {animes.map((animeItem) => (
        <Wrapper key={animeItem?._id}>
          <AnimeItem animeDatItem={animeItem} />
        </Wrapper>
      ))}
    </>
  );
};

export default AnimesList;
