export const getFormBody = (params: any) => {
  let formBody: string[] = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
};
