import { useLocation } from "react-router-dom";

const useQueryParam = (...keys) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  let paramObj = {};

  for (let value of keys) {
    paramObj[value] = query.get(value);
  }

  return paramObj;
};

export default useQueryParam;
