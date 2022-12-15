const metaList = import.meta.glob("~/pages/blog/**/*.meta.json", {
  eager: true,
});

let list = Object.entries(metaList)
  .map(([key, value]) => {
    if (key.startsWith("/pages/blog/index")) return undefined;

    return {
      link: key.replace("meta.json", "html"),
      ...value,
    };
  })
  .filter(Boolean);

// get current updated list
list.sort((a, b) => {
  return a.updateAt < b.updateAt ? 1 : -1;
});

// last 5 list
list = list.slice(0, 5);

export default list;
