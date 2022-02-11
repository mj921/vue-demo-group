const baseSize = 10;
export const setRem = () => {
  const scale = document.documentElement.clientWidth / 750;
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 1) + "px";
};
