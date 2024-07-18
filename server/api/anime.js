const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const AnimeHelper = require('../helpers/AnimeHelper');

const getAllAnime = async (req, res) => {
  try {
    // get data from json
    const data = await AnimeHelper.getAnimeList(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Get All Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

// const searchAnime = async (req, res) => {
//   try {
//     // check validation input
//     ValidationHelper.searchAnimeValidation(req.body);
//     // Get detail anime by request body name
//     const data = await AnimeHelper.getAnimeByName(req);
//     // return response success
//     return res.send(data);
//   } catch (error) {
//     CommonHelper.log(['Anime', 'Search Anime', 'ERROR'], {
//       message: `${error}`,
//       transaction_id: req.headers.transaction_id
//     });
//     return res.send(CommonHelper.errorResponse(error));
//   }
// };

const getAnimeById = async (req, res) => {
  try {
    // check validation params
    ValidationHelper.getAnimeByIdValidation(req.params);
    // Get anime by request params id
    const data = await AnimeHelper.getAnimeById(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Anime By Id', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const filterAnimeByGenreStatus = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.filterAnimeByGenreStatus(req.body);
    // get anime by request body
    const data = await AnimeHelper.filterAnimeByGenreStatus(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Filter Anime By Genre Status', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeByType = async (req, res) => {
  try {
    // check validation query params
    ValidationHelper.getAnimeByTypeValidation(req.query);
    // get anime by param type
    const data = await AnimeHelper.getAnimeByType(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Get Anime By Type', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const searchEpisodeAnime = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchEpisodeAnimeValidation(req.body);
    // get anime by param type
    const data = await AnimeHelper.searchEpisodeAnime(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Get Anime By Type', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/list', CommonHelper.preHandler, getAllAnime);
// router.get('/search', CommonHelper.preHandler, searchAnime);
router.get('/detail/:id', CommonHelper.preHandler, getAnimeById);
router.post('/filter', CommonHelper.preHandler, filterAnimeByGenreStatus);
router.get('/type', CommonHelper.preHandler, getAnimeByType);
router.get('/episode', CommonHelper.preHandler, searchEpisodeAnime);

module.exports = router;
