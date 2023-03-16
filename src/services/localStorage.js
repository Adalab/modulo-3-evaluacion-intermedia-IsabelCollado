function get(variable, valorPorDefecto) {
  if (localStorage.getItem(variable) === null) {
    return valorPorDefecto;
  } else {
    return JSON.parse(localStorage.getItem(variable));
  }
}

function set(variable, valor) {
  localStorage.setItem(variable, JSON.stringify(valor));
}

function includes(variable) {
  return localStorage.getItem(variable) !== null;
}

function notIncludes(variable) {
  return localStorage.getItem(variable) === null;
}

const remove = (key) => {
  localStorage.removeItem(key);
};

const clear = () => {
  localStorage.clear();
};

const objectToExport = { get, set, includes, notIncludes, remove, clear };

export default objectToExport;
