import {
  AddressComponent,
  AddressType,
  Client,
  GeocodingAddressComponentType,
} from "@googlemaps/google-maps-services-js";

if (!process.env.G_GEOCODE_KEY) {
  throw new Error("[app] Missing Google Maps API key");
}

const maps = new Client({});

const parseAddress = (addressComponents: AddressComponent[]) => {
  const address = addressComponents.reduce(
    (acc, component) => {
      if (component.types.includes(AddressType.country))
        acc.country = component.long_name;
      if (component.types.includes(AddressType.administrative_area_level_1))
        acc.admin = component.long_name;
      if (
        component.types.includes(AddressType.locality) ||
        component.types.includes(GeocodingAddressComponentType.postal_town)
      )
        acc.city = component.long_name;

      return acc;
    },
    { country: "", admin: "", city: "" }
  );

  return address;
};

export const Google = {
  geocode: async (address: string) => {
    const res = await maps.geocode({
      params: {
        address,
        key: process.env.G_GEOCODE_KEY!,
      },
    });

    if (res.status < 200 || res.status > 299) {
      throw new Error("[app] Failed to geocode address!");
    }

    return parseAddress(res.data.results[0].address_components);
  },
};
