import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [res, setRes] = useState(false);

  useEffect(() => {
    setRes(window?.matchMedia(query).matches);
    const onResize = (ev: UIEvent) => {
      setRes(window?.matchMedia(query).matches);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [query]);

  return res;
}

export default useMediaQuery;
