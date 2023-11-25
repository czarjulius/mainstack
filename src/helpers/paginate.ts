const orderType = ['asc', 'desc', 'nulls first'];

export const getPaginatedRecords = async (
  model,
  {
    limit = 20,
    page,
    order = 'desc',
    pageOffset,
    orderFields = ['createdAt', order],
    where = {},
  }: {
    limit?: number;
    page: number;
    order?: (typeof orderType)[number];
    pageOffset?: number;
    orderFields?: Array<string | object>;
    where?: any;
  },
  ...args
): Promise<typeof model> => {
  const skip = pageOffset !== undefined ? pageOffset : (page - 1) * limit;

  const sortObject = {};
  if (Array.isArray(orderFields[0])) {
    orderFields.forEach((field) => {
      const [fieldName, fieldOrder]: any = field;
      sortObject[fieldName] = fieldOrder;
    });
  } else {
    const [fieldName, fieldOrder]: any = orderFields;
    sortObject[fieldName] = fieldOrder;
  }

  const query = model.find({ ...args[0], ...where });
  const result = await query.skip(skip).limit(limit).sort(sortObject);

  const { populate, ...rest } = args[0] || {};

  const count = args[0]?.ignoreCount ? (await model.find(args[0])).length : await model.countDocuments({ ...rest });

  return {
    data: result,
    total: count,
    currentPage: page,
    hasNext: page * limit < count,
    hasPrevious: page > 1,
    perPage: limit,
    totalPages: Math.ceil(count / limit),
  };
};
