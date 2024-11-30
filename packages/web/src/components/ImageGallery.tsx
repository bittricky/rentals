import {
  AspectRatio,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr',
          md: '2fr 1fr',
        }}
        templateRows={{
          base: 'repeat(4, 200px)',
          md: 'repeat(2, 200px)',
        }}
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          onClick={() => handleImageClick(images[0])}
          cursor="pointer"
        >
          <AspectRatio ratio={16 / 9} h="full">
            <Image
              src={images[0]}
              alt="Property"
              objectFit="cover"
              borderRadius="lg"
            />
          </AspectRatio>
        </GridItem>
        {images.slice(1, 4).map((image, index) => (
          <GridItem
            key={index}
            onClick={() => handleImageClick(image)}
            cursor="pointer"
          >
            <AspectRatio ratio={4 / 3} h="full">
              <Image
                src={image}
                alt={`Property ${index + 2}`}
                objectFit="cover"
                borderRadius="lg"
              />
            </AspectRatio>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={8}>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={selectedImage}
                alt="Property"
                objectFit="contain"
                borderRadius="lg"
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}