import React, { FC, useRef } from 'react';

import BookItem from '../../../../components/BookItem/BookItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import styles from './LastBooksList.module.css';

import prevIcon from '../../../../assets/images/prev.png';
import nextIcon from '../../../../assets/images/next.png';
import { IBookItem } from '../../../../models/IBookItem';

interface LastBooksListProps {
  books: IBookItem[];
}

const LastBooksList: FC<LastBooksListProps> = ({ books }) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className={styles.main}>
      <div className={styles.title}>Останні опублікованні</div>
      <div className={styles.sliderContainer}>
        <Swiper
          onSwiper={(swiper: SwiperCore) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={0}
          slidesPerView={4}
          loop
        >
          {books.map((book) => (
            <SwiperSlide key={book.bookId}>
              <BookItem book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.customPrev} onClick={() => swiperRef.current?.slidePrev()}>
          <img src={prevIcon} alt="Предыдущий" />
        </div>
        <div className={styles.customNext} onClick={() => swiperRef.current?.slideNext()}>
          <img src={nextIcon} alt="Следующий" />
        </div>
      </div>
    </div>
  );
};

export default LastBooksList;
