import css from './ImageCard.module.css';

import { FC } from 'react';
import { ImageCardProps } from '../../types';

const ImageCard: FC<ImageCardProps> = ({ href, src, alt, modalImage }) => {
  return (
    <img
      className={css.img}
      onClick={() => modalImage(href)}
      src={src}
      alt={alt}
    />
  );
};

export default ImageCard;
