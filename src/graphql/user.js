const queryUser = (username) => {
  return `{
    user(login: "${username}" ){
      id
      name
      username: login
      bio
      avatarUrl
      email
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      location
      repositories(ownerAffiliations:[OWNER]) {
        totalCount
      }
    }
  }`;
};

export default queryUser;
