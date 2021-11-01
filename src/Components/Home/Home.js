import { Button, Card, Carousel, Container } from "react-bootstrap";
import HeaderLink from "../Header/Link";
import image from "../../Assets/slider/1.jpg";
import image2 from "../../Assets/slider/2.jpg";
import image3 from "../../Assets/slider/3.jpg";

import "./Home.css";

const Home = () => {
  const data = [
    {
      title: "Ronak",
      des: "gujhgjkfdsd",
    },
    {
      title: "Parth",
      des: "dfghdfhd",
    },
    {
      title: "Bhasker",
      des: "svfghfsd",
    },
    {
      title: "Sagar",
      des: "sdfgbsfg",
    },
    {
      title: "Sagar",
      des: "sdfgbsfg",
    },
    {
      title: "Sagar",
      des: "sdfgbsfg",
    },
  ];

  return (
    <>
      <HeaderLink />
      <Container fluid>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              style={{ height: "662px" }}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "662px" }}
              className="d-block w-100"
              src={image2}
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{ height: "662px" }}
              className="d-block w-100"
              src={image3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <div className="testClass">
          {data.map((item, i) => (
            <Card
            key={i}
              className="mt-5 mb-5 "
              style={{ width: "18.5%", margin: "0 8px" }}
            >
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.des}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
