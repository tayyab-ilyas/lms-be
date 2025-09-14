const buildLeadQuery = (filters, userId) => {
  const query = { userId };
  const mongoQuery = {};

  Object.keys(filters).forEach(key => {
    const filter = filters[key];
    if (!filter || !filter.operator) return;

    const { operator, value } = filter;

    switch (key) {
      case 'email':
      case 'company':
      case 'city':
        if (operator === 'equals') {
          mongoQuery[key] = value;
        } else if (operator === 'contains') {
          mongoQuery[key] = { $regex: value, $options: 'i' };
        }
        break;

      case 'status':
      case 'source':
        if (operator === 'equals') {
          mongoQuery[key] = value;
        } else if (operator === 'in') {
          mongoQuery[key] = { $in: Array.isArray(value) ? value : [value] };
        }
        break;

      case 'score':
      case 'lead_value':
        if (operator === 'equals') {
          mongoQuery[key] = value;
        } else if (operator === 'gt') {
          mongoQuery[key] = { $gt: value };
        } else if (operator === 'lt') {
          mongoQuery[key] = { $lt: value };
        } else if (operator === 'between') {
          mongoQuery[key] = { $gte: value.min, $lte: value.max };
        }
        break;

      case 'created_at':
      case 'last_activity_at':
        if (operator === 'on') {
          const date = new Date(value);
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);
          mongoQuery[key] = { $gte: date, $lt: nextDay };
        } else if (operator === 'before') {
          mongoQuery[key] = { $lt: new Date(value) };
        } else if (operator === 'after') {
          mongoQuery[key] = { $gt: new Date(value) };
        } else if (operator === 'between') {
          mongoQuery[key] = { $gte: new Date(value.start), $lte: new Date(value.end) };
        }
        break;

      case 'is_qualified':
        if (operator === 'equals') {
          mongoQuery[key] = value === 'true' || value === true;
        }
        break;
    }
  });

  return { ...query, ...mongoQuery };
};

module.exports = { buildLeadQuery };