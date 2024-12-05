import React, { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyAddedVisa = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  // console.log(user?.email);

  // useEffect(() => {
  //   if (email) {
  //     fetch(`${import.meta.env.VITE_API_BASE_URL}/myvisas/${email}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching data:", err);
  //       });
  //   }
  // }, [email]); // Run effect when email changes

  return <div className="my-20">MyAddedVisa {user?.email}</div>;
};

export default MyAddedVisa;
