import { useEffect, useState } from "react";
import ListProduct from "../../containers/ListProduct";
import "./style.css";

const Loading = () => (
    <div className="loader-container">
      <div className=""></div>
    </div>
  );
  
  const index = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // Simulasi pemanggilan API atau data fetching
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Misalnya 2 detik
    }, []);
  
    if (isLoading) {
      return <Loading />;
    }

    return <ListProduct />
}

export default index