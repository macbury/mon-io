const isObject = node => typeof node === 'object' && node !== null;

// rough first draft, could probably be optimised in a loads of different ways.
const hasFiles = (node, found = []) => {
  Object.keys(node).forEach((key) => {
    if (!isObject(node[key]) || found.length > 0) {
      return;
    }

    if (
      (typeof File !== 'undefined' && node[key] instanceof File) ||
      (typeof Blob !== 'undefined' && node[key] instanceof Blob)
    ) {
      found.push(node[key]);
      return;
    }

    hasFiles(node[key], found);
  });

  return found.length > 0;
};


export default hasFiles