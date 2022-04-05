const getUser = () => {
  const profileLocal = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile") || "");
  const profileSession = sessionStorage.getItem("profile") && JSON.parse(sessionStorage.getItem("profile") || "");
  const profile = profileLocal ? profileLocal : profileSession ? profileSession : {};
  return profile
};
const setUser = (profile: any) => {
  const {remember}=profile?.user;
  if(remember){
    localStorage.setItem("profile", JSON.stringify(profile) || "");
  }else{
    sessionStorage.setItem("profile", JSON.stringify(profile) || "");

  }
};
const removeUser = () => {
  localStorage.removeItem("profile");
  sessionStorage.removeItem("profile")
};
const getLocalRefreshToken = () => {
  const profile=getUser();
  return profile?.refreshToken;
};
const getLocalAccessToken = () => {
  const profile=getUser();
  return profile?.accessToken;
};
const updateLocalAccessToken = (token: string) => {
  const profile=getUser();
  profile.accessToken = token;
  if (profile?.user?.remember) {
    localStorage.setItem("profile", JSON.stringify(profile));
  } else {
    sessionStorage.setItem("profile", JSON.stringify(profile));
  }
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