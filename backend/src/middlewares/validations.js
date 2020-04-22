import { Joi, Segments, celebrate } from 'celebrate';

export function postONG() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  });
}

export function postIncident() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string()
        .required()
        .min(15),
      value: Joi.number().required(),
    }),
  });
}

export function authorization() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  });
}

export function paramsIdIncident() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });
}

export function queryPage() {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  });
}
