const queryRepository = (limit, cursor) => {
  return `{
    viewer {
      repositories(
        orderBy: {field: CREATED_AT, direction: DESC}
        first: ${limit}
        after: ${cursor ? `"${cursor}"` : null}
        affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
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
          forkCount
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
