import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

import { Image, ImagesProps } from '../../types.js';

function App() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImagesProps[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (images === null) return;

    if (images.length > 24) {
      window.scrollBy({
        top: 550,
        behavior: 'smooth',
      });
    }
  }, [images]);

  useEffect(() => {
    if (searchValue === null) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const imagesBySearch = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=teidMVVe7-sWKxTRBIvTmeV8BBwYOnKyaG_QYy0T0iw&per_page=24&query=${searchValue}&page=${page}`
        );

        if (page > 1) {
          setImages(data => [
            ...(data as ImagesProps[]),
            ...imagesBySearch.data.results,
          ]);
        } else {
          setImages(imagesBySearch.data.results);
          setTotalPage(imagesBySearch.data.total_pages);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchValue, page]);

  const onSubmit = (term: string) => {
    setSearchValue(term);
  };

  const loadNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const modalImage = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images ? <ImageGallery images={images} modalImage={modalImage} /> : null}
      {totalPage !== page ? (
        <LoadMoreBtn totalPage={totalPage} loadNextPage={loadNextPage} />
      ) : null}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
