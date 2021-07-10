export const StorageAPI = {
  setWithExpiry: (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  getWithExpiry: (key) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return false;
    }
    return item.value;
  },
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  get: (key) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return false;
    }
    return itemStr;
  },
  delete: (key) => {
    localStorage.removeItem(key);
  },
};
