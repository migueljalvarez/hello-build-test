const searchRepository = (username, searchText, limit, cursor) => {
  return `{
    repositories: search(query: "user:${username} ${searchText}", first: ${limit}, after:${JSON.stringify(
    cursor
  )} type: REPOSITORY) {
      totalCount: repositoryCount
      pageInfo {
        startCursor
        hasNextPage
        hasPreviousPage
        endCursor
      }
      lists: nodes {
        ... on Repository {
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

export default searchRepository;
