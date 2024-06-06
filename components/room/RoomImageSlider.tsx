import { IImage } from "@/backend/controllers/models/room";
import React from "react";
import { Carousel, Image } from "react-bootstrap";


interface Props {
    images: IImage[];
}

const RoomImageSlider = ({images}: Props)=> {
    return <Carousel>
        {images?.length > 0 ? (
            images?.map((image) => (
                <Carousel.Item key={image?.public_id}>
                    <div style={{width: "100%", height: "460px"}}>
                        <Image
                        className="d-block m-auto"
                        src={image?.url}
                        alt={image?.url}
                        style={{ width: "100%", height: "100%"}}
                        />
                    </div>
                </Carousel.Item>
            ))
        ): (
         <Carousel.Item>
            <div style={{width: "100%", height: "460px"}}>
              <Image
                className="d-block m-auto"
                src={"/images/default_room_image.jpg"}
                alt={"/images/default_room_image.jpg"}
                style={{ width: "100%", height: "100%"}}
             />
            </div>
        </Carousel.Item>

        ) }
    </Carousel>
};

export default RoomImageSlider;