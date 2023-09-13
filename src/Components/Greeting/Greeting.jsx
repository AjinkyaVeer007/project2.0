import React, { useEffect, useState } from "react";
import "./Greeting.css";
import moment from "moment";

function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentTime = moment();
    const currentHour = currentTime.hour();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="greeting text-center mt-3">
      <h4>{greeting}</h4>
      <div>Rushikesh Dhanawade</div>
    </div>
  );
}

export default Greeting;
