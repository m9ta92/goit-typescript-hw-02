export interface SearchBarProps {
  onSubmit: (term: string) => void;
}

export interface ImagesProps {
  id: number;
  urls: {
    full: string;
    small: string;
  };
  alt: string;
}

export interface ImageGalleryProps {
  images: ImagesProps[];
  modalImage: (href: string) => void;
}

export interface ImageCardProps {
  href: string;
  src: string;
  alt: string;
  modalImage: (href: string) => void;
}

export type Image = string | null;

export interface LoadMoreBtnProps {
  totalPage: number;
  loadNextPage: () => void;
}

export interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image;
}
