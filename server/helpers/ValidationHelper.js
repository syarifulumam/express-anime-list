const Joi = require('joi');
const Boom = require('boom');

// const searchAnimeValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required()
//   });

//   if (schema.validate(data).error) {
//     throw Boom.badRequest(schema.validate(data).error);
//   }
// };

const getAnimeByIdValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const filterAnimeByGenreStatus = (data) => {
  const schema = Joi.object({
    genre: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
    status: Joi.string().allow('').valid('FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN')
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const getAnimeByTypeValidation = (data) => {
  const schema = Joi.object({
    nameType: Joi.string().required()
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const searchEpisodeAnimeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    episode: Joi.number().required()
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  // searchAnimeValidation
  getAnimeByIdValidation,
  filterAnimeByGenreStatus,
  getAnimeByTypeValidation,
  searchEpisodeAnimeValidation
};
