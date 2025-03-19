import { Carousel, CarouselProps } from "antd";
import "./index.scss";
const CarouselCustom = (props: CarouselProps) => {
  return <Carousel {...props
  }  className={`${props.className} carousel-custom-container`}/>;
};
export default CarouselCustom;
