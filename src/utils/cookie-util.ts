export const getClientCookies = (): Record<string, string> => {
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((e, cookie) => {
      const [key, value] = cookie.split("=");
      e[key] = decodeURIComponent(value);
      return e;
    }, {});
  return cookies;
};
