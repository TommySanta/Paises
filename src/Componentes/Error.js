import React from "react";

function Error({error}) {
  return (
    <div style={{ color: "red", fontSize: "50px", textAlign: "center" }}>
      <p>{error}</p>
    </div>
  );
}

export default Error;
