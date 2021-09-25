const queryRepository = (limit, cursor) => {
  return `{
    viewer {
      repositories(
        orderBy: {field: CREATED_AT, direction: DESC}
        first: ${limit}
        after: ${JSON.stringify(cursor)}
        affiliations: [OWNER]
      ) {
        totalCount
        pageInfo {
          startCursor
          hasNextPage
          hasPreviousPage
          endCursor
        }
        lists: nodes {
          id
          name
          description
          createdAt
          url
          owner {
            login
          }
        }
      }
    }
  }`;
};
export default queryRepository;
