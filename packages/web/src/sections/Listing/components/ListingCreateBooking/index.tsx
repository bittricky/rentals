import React from "react";
import {
  Box,
  Button,
  Divider,
  Text,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { isBefore, endOfDay } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { displayErrorMessage, formatListingPrice } from "../../../../utils";

interface Props {
  price: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: (checkInDate: Date | null) => void;
  setCheckOutDate: (checkOutDate: Date | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const toast = useToast();

  const disabledDate = (date: Date) => {
    return isBefore(date, endOfDay(new Date()));
  };

  const verifyAndSetCheckOutDate = (date: Date | null) => {
    if (checkInDate && date) {
      if (isBefore(date, checkInDate)) {
        displayErrorMessage(
          `You can't book date of check out to be prior to check in!`
        );
        return;
      }
    }
    setCheckOutDate(date);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Heading as="h2" size="xl" mb={2}>
          {formatListingPrice(price)}
          <Text as="span">/day</Text>
        </Heading>
        <Divider my={4} />
        <Text fontWeight="bold">Check In</Text>
        <DatePicker
          selected={checkInDate}
          onChange={(date: Date) => setCheckInDate(date)}
          filterDate={disabledDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<Input />}
        />
        <Text mt={4} fontWeight="bold">
          Check Out
        </Text>
        <DatePicker
          selected={checkOutDate}
          onChange={verifyAndSetCheckOutDate}
          filterDate={disabledDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<Input />}
          disabled={checkOutInputDisabled}
        />
        <Divider my={4} />
        <Button isDisabled={buttonDisabled} colorScheme="teal" size="lg">
          Request to book!
        </Button>
      </Box>
    </Box>
  );
};

ListingCreateBooking.displayName = "ListingCreateBooking";
