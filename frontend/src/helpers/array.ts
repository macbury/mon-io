export function chunk(arr : Array<any>, len : number) {
  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

export function chunks(arr : Array<any>, lens : number[]) {
  var chunks = [],
      i = 0,
      n = arr.length;
  let len = lens.shift()

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
    if (lens.length > 0) {
      len = lens.shift()
    }
  }

  return chunks;
}

