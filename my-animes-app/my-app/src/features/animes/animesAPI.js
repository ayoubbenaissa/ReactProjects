import axios from "axios";

const backendRootEndpoint = "http://localhost:8001";

const getAllAnimes = async () => {
  try {
    const allAnimesDB = await axios.get(`${backendRootEndpoint}/animes`);
    return allAnimesDB;
  } catch (err) {
    return err;
  }
};

const getAnime = async (animeId) => {};

const updateAnime = async (animeId) => {};

const deleteAnime = async (animeId) => {};

export { getAllAnimes, getAnime, updateAnime, deleteAnime };
