import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CONTACT_HOST } from '../lib/graphql/mutations';

interface ContactAgentProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  hostId: string;
}

export default function ContactAgent({ isOpen, onClose, listingId, hostId }: ContactAgentProps) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [contactHost, { loading }] = useMutation(CONTACT_HOST, {
    onCompleted: (data) => {
      if (data.contactHost.success) {
        toast({
          title: 'Message sent!',
          description: 'The host will get back to you soon.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await contactHost({
      variables: {
        input: {
          listingId,
          hostId,
          ...formData,
        },
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contact Host</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack as="form" spacing={4} onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={4}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Send Message
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}