import { useState, useEffect } from "react";

export default (httClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      console.log("WithErroorHandlre: ", err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      httClient.interceptors.request.eject(reqInterceptor);
      httClient.interceptors.request.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor, httClient.interceptors.request]);

  const errorconfirmedHandler = () => {
    setError(null);
  };

  return [error, errorconfirmedHandler];
};
