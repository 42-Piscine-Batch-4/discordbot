import { chain } from "lodash";

const reverseString = (str: string): string => {
  return chain(str).split().reverse().join().valueOf();
};

export default reverseString;
