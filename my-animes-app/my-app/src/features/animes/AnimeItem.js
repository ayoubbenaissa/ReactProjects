import "./AnimeItem.css";

const AnimeItem = ({ animeDatItem }) => {
  console.log(" ** animeDatItem ** ", animeDatItem);
  const fallbackURL = "https://i.stack.imgur.com/l60Hf.png";
  return (
    <>
      <h4 className='anime-name'>{animeDatItem.name}</h4>
      <p className='anime-description'>{animeDatItem.description}</p>
    </>
  );
};

export default AnimeItem;
