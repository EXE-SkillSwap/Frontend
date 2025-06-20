export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logOut = () => {
  localStorage.clear();
  window.location.href = "/login";
};
