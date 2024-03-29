import React from "react";
import { Box, Text, Select } from "@chakra-ui/react";
import { ListingsFilter } from "../../../../graphql/globalTypes";

interface Props {
  filter: ListingsFilter;
  setFilter: (filter: ListingsFilter) => void;
}

export const ListingsFilters = ({ filter, setFilter }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <Text marginRight="2">Filter By</Text>
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value as ListingsFilter)}
        width="auto"
      >
        <option value={ListingsFilter.PRICE_LOW_TO_HIGH}>
          Price: Low to High
        </option>
        <option value={ListingsFilter.PRICE_HIGH_TO_LOW}>
          Price: High to Low
        </option>
      </Select>
    </Box>
  );
};

ListingsFilters.displayName = "ListingsFilters";
