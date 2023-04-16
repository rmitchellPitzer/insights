import { proxy } from "valtio";

const state = proxy({
  isSplashScreen: true,
  schoolName: "",
  startYear: new Date('December 17, 2003 03:24:00'),
  endYear: new Date('December 17, 2017 03:24:00'),
  queryDate: "",
  queryResult: [],
});

export { state };