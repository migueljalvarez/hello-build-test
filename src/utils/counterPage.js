export const totalPages = (count, limit) => {
  return Math.ceil(count / limit) || 1;
};

export const counterPages = (page, count, limit) => {
  return `${page}/${totalPages(count, limit)}`;
};
