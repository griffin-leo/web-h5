const getImgUrl = name => {
  const path = `../assets/images/${name}`;
  const modules = import.meta.globEager('../assets/images/*');
  console.log('modules：', modules);
  if (modules && modules[path]) {
    return modules[path].default;
  } else {
    const url = new URL(`../assets/images/${name}`, import.meta.url);
    return url.href;
  }
};
export default getImgUrl;
