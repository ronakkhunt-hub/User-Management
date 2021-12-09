import { Carousel } from "react-bootstrap";
import HeaderLink from "../Header/Link";
import image from "../../assets/Slider/1.jpg";
import image2 from "../../assets/Slider/2.jpg";
import image3 from "../../assets/Slider/3.jpg";

import "./Home.css";

const Home = () => {
  return (
    <>
      <HeaderLink />
      <div className="homeContainer">
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              style={{ height: "650px" }}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "650px" }}
              className="d-block w-100"
              src={image2}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "650px" }}
              className="d-block w-100"
              src={image3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
      <p> xzVDXXDZbgvzxcbzcbnxcnb,ghiyfik</p>
    </>
  );
};

export default Home;
