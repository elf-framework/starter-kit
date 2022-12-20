import { layouts } from "../constants/layouts";

const items = {};

const list = import.meta.glob("./items/*.jsx", {
  eager: true,
});

Object.values(list).forEach((module) => {
  Object.assign(items, module);
});

export default {
  items,
  get(layout: string) {
    let currentLayout = this.items[layout];

    if (!currentLayout) {
      const currentPath = window.location.pathname.substring(1);
      Object.keys(layouts).forEach((key: string) => {
        if (currentPath.startsWith(key)) {
          currentLayout = this.items[layouts[key]];
        }
      });
    }

    return currentLayout;
  },
};
