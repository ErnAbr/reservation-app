export const LOGIN_API = "http://localhost:3005/api/client/login";
export const LOGOUT_API = "http://localhost:3005/api/client/logout";
export const REG_API = "http://localhost:3005/api/client/register";
export const CLIENT_REG_API = "http://localhost:3005/api/admin/register";
export const getApiRouteWithDate = (formattedDate) => {
  return `http://localhost:3005/api/admin/?date=${formattedDate}`;
};
export const deleteApiRouteWithId = (id) => {
  return `http://localhost:3005/api/admin/?id=${id}`;
};
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const userRoleOptions = [
  { key: "Admin", value: "true" },
  { key: "Client", value: "false" },
];
