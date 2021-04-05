import { useState, useEffect } from "react";

const useLoadData = (url, params) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await fetch(url, params).then((res) => res.json());
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [url, params]);
  return data;
};

export default useLoadData;
