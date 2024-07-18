const Path = require('path');
const Boom = require('boom');
const CommonHelper = require('./CommonHelper');
const GeneralHelper = require('./GeneralHelper');

const ANIME_DATA = Path.join(__dirname, '../../assets/anime.json');

const getAnimeList = async (req) => {
  const { limit = 10, offset = 0 } = req.query;
  const start = Number(offset);
  const end = Number(offset) + Number(limit);

  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const anime = data.slice(start, end);
    const animeList = anime.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.genre
    }));

    return {
      count: anime.length,
      list: animeList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

// const getAnimeByName = async (req) => {
//   try {
//     const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
//     const animeDetail = data.filter((item) => item.title.toLowerCase().includes(req.body.name.toLowerCase()));

//     if (animeDetail.length === 0) {
//       return Boom.notFound('Anime not found');
//     }
//     const animeList = animeDetail.map((item) => item.title);

//     return {
//       count: animeDetail.length,
//       list: animeList,
//       detail: animeDetail
//     };
//   } catch (error) {
//     CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
//     throw CommonHelper.errorResponse(error);
//   }
// };

const getAnimeById = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const anime = data.filter((item) => item.id === Number(req.params.id));

    if (anime.length === 0) {
      return Boom.notFound(`Anime with id ${req.params.id} doesn't exist`);
    }
    const { id, title, type, episodes, status, picture, thumbnail, genre } = anime[0];
    return { id, title, type, episodes, status, picture, thumbnail, genre };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeById', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const filterAnimeByGenreStatus = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const anime = data.filter((item) => {
      if (req.body.status === '') {
        return item.tags.includes(req.body.genre.toLowerCase());
      }
      return item.tags.includes(req.body.genre.toLowerCase()) && item.status === req.body.status;
    });
    const animeList = anime.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.genre
    }));
    return {
      count: anime.length,
      list: animeList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'filterAnimeByGenreStatus', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByType = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const anime = data.filter((item) => item.type === req.query.nameType);
    if (anime.length === 0) {
      return Boom.notFound('Anime not found');
    }
    const animeList = anime.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.genre
    }));
    return {
      count: anime.length,
      list: animeList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByType', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const searchEpisodeAnime = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const anime = data.filter(
      (item) => item.title.toLowerCase() === req.body.title.toLowerCase() && item.episodes === req.body.episode
    );
    if (anime.length === 0) {
      return Boom.notFound('Anime not found');
    }

    const { id, title, type, episodes, status, picture, thumbnail, genre } = anime[0];
    return {
      count: anime.length,
      list: { id, title, type, episodes, status, picture, thumbnail, genre }
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'searchEpisodeAnime', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  getAnimeList,
  // getAnimeByName
  getAnimeById,
  filterAnimeByGenreStatus,
  getAnimeByType,
  searchEpisodeAnime
};
