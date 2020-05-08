import React from "react";

const Hero = ({ hero }) => {

  return (
    <div className="hero">
        <h1>{hero.superhero}</h1>
    </div>
  );
};


export default Hero;