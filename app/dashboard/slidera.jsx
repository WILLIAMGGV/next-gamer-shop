"use client";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const Slidera = () => {
  const content = [
    {
      title: "",
      description: "",
      image: "https://lotoactivo.webcindario.com/gamers/game.jpg",
    },
    {
      title: "",
      description: "",
      image: "https://lotoactivo.webcindario.com/gamers/slider2.jpg",
    },
    {
      title: "",
      description: "",
      image: "https://lotoactivo.webcindario.com/gamers/game2.jpg",
    },
  ];
  return (
    <>
      <Slider autoplay={3000}>
        {content.map((item, index) => (
          <div
            key={index}
            style={{
              background: `url('${item.image}') no-repeat center center`,
              //backgroundSize: "1280px 400px",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="center">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.button}</button>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Slidera;
