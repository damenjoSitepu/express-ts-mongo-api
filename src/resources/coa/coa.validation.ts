import Joi from "joi";

const create = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().required()
});

export default { create };