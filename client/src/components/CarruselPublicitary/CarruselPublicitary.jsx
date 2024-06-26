import React from 'react';
import { Carousel } from 'antd';

const CarruselPublicitary = () => (
  <Carousel arrows autoplay>
    <div>
      <img src={require('../../Images/15614775255199.jpg')} alt="1" style={{ ...contentStyle, backgroundImage: 'url(url_de_la_imagen_1)' }} />
    </div>
    <div>
      <img src={require("../../Images/como-distribuir-un-restaurante.jpg")} alt="2" style={{ ...contentStyle, backgroundImage: 'url(url_de_la_imagen_2)' }} />
    </div>
    <div>
      <img src={require("../../Images/foto-simon-bosch.jpg")} alt="3" style={{ ...contentStyle, backgroundImage: 'url(url_de_la_imagen_3)' }} />
    </div>
    <div>
      <img src={require("../../Images/restaurante-espana-slide-01.jpg")} alt="4" style={{ ...contentStyle, backgroundImage: 'url(url_de_la_imagen_4)' }} />
    </div>
  </Carousel>
);

const contentStyle = {
 width: "100%",
 height:500,
 objectFit: "cover",
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export default CarruselPublicitary;
