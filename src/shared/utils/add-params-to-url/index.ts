const addParamsToUrl = (url: string, params: { [key: string]: string }) =>
  Object.entries(params).reduce(
    (currentUrl, [key, value]) => currentUrl.replace(`/:${key}:/`, `/${value}/`),
    url,
  );

export default addParamsToUrl;
