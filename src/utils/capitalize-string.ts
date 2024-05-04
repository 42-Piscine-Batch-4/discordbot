import { chain } from "lodash";

const capitalizeString = (str: string): string => {
  return chain(str).toUpper().valueOf();
};

export default capitalizeString;
