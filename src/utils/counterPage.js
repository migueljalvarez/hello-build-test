export const totalPages = (count, limit) => {
  return Math.ceil(count / limit);
};

export const counterPages = (page, count, limit) => {
  return `${page}/${totalPages(count, limit) || 1}`;
};
