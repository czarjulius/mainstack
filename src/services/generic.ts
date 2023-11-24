export const createNewEntity = async (model, data) => model.create(data);

export const editEntity = async (model, filter, data = {}) =>
  model.update(data, { where: filter, raw: true, returning: true });
