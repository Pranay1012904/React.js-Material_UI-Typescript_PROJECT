export const setItemInLocalStorage = (key: string, value: string) => {
  if (!key || !value) {
    return console.error("Can't Store in local Storage!");
  }
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const removeItemFromLocalStorage = (key: string) => {
  if (!key) {
    console.error("KEY not found!");
  }
  localStorage.removeItem(key);
};

export const getItemFromLocalStorage = (key: string) => {
  if (!key) {
    return console.error("No key to retrive from local storage!");
  }
  return localStorage.getItem(key);
};
