import { useState } from 'react';
import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleMainImageClick = () => {
    onOpen();
  };

  return (
    <>
      <Box>
        {/* Main Image */}
        <Box 
          position="relative" 
          mb={4} 
          cursor="pointer"
          onClick={handleMainImageClick}
        >
          <Image
            src={images[selectedImage]}
            alt="Main property view"
            objectFit="cover"
            w="full"
            h="500px"
            borderRadius="lg"
          />
        </Box>

        {/* Thumbnail Carousel */}
        <Flex position="relative" align="center" justify="center" w="full">
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeft color="white" />}
            position="absolute"
            left={2}
            zIndex={2}
            onClick={handlePrevious}
            bg="purple.500"
            _hover={{ bg: 'purple.600' }}
          />

          <Flex
            overflow="hidden"
            mx={12}
            gap={4}
            justify="center"
            maxW="800px"
            w="full"
          >
            {images.map((image, index) => (
              <Box
                key={index}
                cursor="pointer"
                opacity={selectedImage === index ? 1 : 0.6}
                transition="opacity 0.2s"
                _hover={{ opacity: 1 }}
                flexShrink={0}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image}
                  alt={`Property thumbnail ${index + 1}`}
                  objectFit="cover"
                  w="100px"
                  h="75px"
                  borderRadius="md"
                  border={selectedImage === index ? '2px solid' : 'none'}
                  borderColor="purple.500"
                />
              </Box>
            ))}
          </Flex>

          <IconButton
            aria-label="Next image"
            icon={<ChevronRight color="white" />}
            position="absolute"
            right={2}
            zIndex={2}
            onClick={handleNext}
            bg="purple.500"
            _hover={{ bg: 'purple.600' }}
          />
        </Flex>
      </Box>

      {/* Fullscreen Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex="modal" />
          <ModalBody position="relative" p={8}>
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeft color="white" />}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handlePrevious}
              zIndex={2}
              bg="purple.500"
              _hover={{ bg: 'purple.600' }}
            />
            <Image
              src={images[selectedImage]}
              alt={`Property ${selectedImage + 1}`}
              w="full"
              h="auto"
              maxH="80vh"
              objectFit="contain"
            />
            <IconButton
              aria-label="Next image"
              icon={<ChevronRight color="white" />}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handleNext}
              zIndex={2}
              bg="purple.500"
              _hover={{ bg: 'purple.600' }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}