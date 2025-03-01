const changeObjectKeys = (initialObject: Record<string, unknown>, keyMap: Record<string, string>) =>
  Object.entries(initialObject).reduce((acc, [key, value]) => {
    const newKey = keyMap[key] || key;
    return { ...acc, [newKey]: value };
  }, {});

export default changeObjectKeys;
