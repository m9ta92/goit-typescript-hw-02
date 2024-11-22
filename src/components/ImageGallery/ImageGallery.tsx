import css from './ImageGallery.module.css';

import { FC } from 'react';
import { ImageGalleryProps } from '../../types';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery: FC<ImageGalleryProps> = ({ images, modalImage }) => {
  return (
    <ul className={css.imgList}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard
            href={image.urls.full}
            src={image.urls.small}
            alt={image.alt}
            modalImage={modalImage}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
