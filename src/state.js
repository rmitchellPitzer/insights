import { proxy } from "valtio";

const state = proxy({
  isSplashScreen: true,
  schoolName: "",
  startYear: new Date('December 17, 1979 03:24:00'),
  endYear: new Date('December 17, 2016 03:24:00'),
});

export { state };