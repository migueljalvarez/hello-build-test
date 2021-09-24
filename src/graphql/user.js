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
    }
  }`;
};

export default queryUser;
