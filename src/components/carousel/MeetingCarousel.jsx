import React from 'react';
import Slider from 'react-slick';
import MeetingCardDash from '../Cards/MeetingCardDash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MeetingCarousel({ meetings }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {meetings.map((meeting) => (
          <div key={meeting.id} className="carousel-item p-[6px]">
            <MeetingCardDash
              m={meeting}
              showDelete={false}
              showJoin={true}
              showAta={false}
              showDownloadAta={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
