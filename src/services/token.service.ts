const getLocalRefreshToken = () => {
    const user = localStorage.getItem("profile") &&  JSON.parse(localStorage.getItem("profile")||"");
    return user?.refreshToken;
  };
  const getLocalAccessToken = () => {
    const user = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile")||"");
    return user?.accessToken;
  };
  const updateLocalAccessToken = (token:string) => {
    let user = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile")||"");
    user.accessToken = token;
    localStorage.setItem("profile", JSON.stringify(user));
  };
  const getUser = () => {
    return localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile")||"");
  };
  const setUser = (user:any) => {
    localStorage.setItem("profile", JSON.stringify(user)||"");
  };
  const removeUser = () => {
    localStorage.removeItem("profile");
  };
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  export default TokenService;