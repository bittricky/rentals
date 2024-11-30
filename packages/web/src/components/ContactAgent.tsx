import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface Agent {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface ContactAgentProps {
  agent: Agent;
  onScheduleVisit: () => void;
}

export default function ContactAgent({ agent, onScheduleVisit }: ContactAgentProps) {
  return (
    <Stack spacing={6}>
      <VStack>
        <Avatar size="xl" src={agent.image} name={agent.name} />
        <Heading size="md">{agent.name}</Heading>
        <Text color="gray.600">{agent.phone}</Text>
        <Text color="gray.600">{agent.email}</Text>
      </VStack>

      <Divider />

      <Stack as="form" spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter your name" />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" placeholder="Enter your phone" />
        </FormControl>

        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea
            placeholder="I'm interested in this property..."
            rows={4}
          />
        </FormControl>

        <HStack>
          <Button colorScheme="brand" w="full">
            Contact Agent
          </Button>
          <Button variant="outline" w="full" onClick={onScheduleVisit}>
            Schedule Visit
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}