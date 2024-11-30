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
  Grid,
  GridItem,
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

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    onOpen();
  };

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        templateRows={{ base: 'repeat(3, 200px)', md: 'repeat(2, 200px)' }}
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Box
            position="relative"
            h="full"
            cursor="pointer"
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={images[0]}
              alt="Property main"
              objectFit="cover"
              w="full"
              h="full"
              borderRadius="lg"
            />
          </Box>
        </GridItem>
        {images.slice(1).map((image, index) => (
          <GridItem key={index}>
            <Box
              position="relative"
              h="full"
              cursor="pointer"
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                src={image}
                alt={`Property ${index + 2}`}
                objectFit="cover"
                w="full"
                h="full"
                borderRadius="lg"
              />
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex="modal" />
          <ModalBody position="relative" p={8}>
            <IconButton
              aria-label="Previous image"
              icon={<ChevronLeft />}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handlePrevious}
              zIndex={2}
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
              icon={<ChevronRight />}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              onClick={handleNext}
              zIndex={2}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}