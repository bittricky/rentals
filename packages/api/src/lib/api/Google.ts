import {
  AddressComponent,
  AddressType,
  Client,
  GeocodingAddressComponentType,
  PlaceType1,
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

const PLACE_TYPE_TO_CATEGORY: Record<string, { name: string; icon: string }> = {
  transit_station: { name: "Transportation", icon: "transportation" },
  bus_station: { name: "Transportation", icon: "transportation" },
  train_station: { name: "Transportation", icon: "transportation" },
  school: { name: "Education", icon: "education" },
  university: { name: "Education", icon: "education" },
  shopping_mall: { name: "Shopping", icon: "shopping" },
  supermarket: { name: "Shopping", icon: "shopping" },
  park: { name: "Recreation", icon: "recreation" },
  gym: { name: "Recreation", icon: "recreation" },
  restaurant: { name: "Dining", icon: "dining" },
  cafe: { name: "Dining", icon: "dining" },
  hospital: { name: "Healthcare", icon: "healthcare" },
  pharmacy: { name: "Healthcare", icon: "healthcare" },
};

const SEARCH_TYPES = Object.keys(PLACE_TYPE_TO_CATEGORY) as PlaceType1[];

// Function to calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const Google = {
  geocode: async (address: string) => {
    const key = process.env.G_GEOCODE_KEY as string;

    try {
      const res = await maps.geocode({
        params: {
          key: key,
          address: address,
        },
      });

      if (res.status < 200 || res.status > 299) {
        throw new Error("[app] Failed to geocode address!");
      }

      return parseAddress(res.data.results[0].address_components);
    } catch (e) {
      console.log(`[app] ${e}`);
      return { country: null, admin: null, city: null };
    }
  },
  
  nearbyPlaces: async (address: string, radius: number) => {
    const key = process.env.G_GEOCODE_KEY as string;

    try {
      // First get the coordinates for the address
      const geocodeRes = await maps.geocode({
        params: {
          key,
          address,
        },
      });

      if (geocodeRes.status < 200 || geocodeRes.status > 299) {
        throw new Error("[app] Failed to geocode address for nearby search!");
      }

      const location = geocodeRes.data.results[0].geometry.location;
      
      // Then search for places nearby
      const nearbySearches = SEARCH_TYPES.map(type => 
        maps.placesNearby({
          params: {
            key,
            location,
            radius: radius * 1609.34, // Convert miles to meters
            type,
          },
        })
      );

      const results = await Promise.all(nearbySearches);
      
      // Process and categorize the results
      const categorizedPlaces = results.reduce((acc, res, index) => {
        if (res.status >= 200 && res.status <= 299 && res.data.results.length > 0) {
          const placeType = SEARCH_TYPES[index];
          const category = PLACE_TYPE_TO_CATEGORY[placeType];
          
          if (!acc[category.name]) {
            acc[category.name] = {
              name: category.name,
              icon: category.icon,
              places: [],
            };
          }

          res.data.results.slice(0, 3).forEach(place => {
            if (place.geometry && place.name) {
              const distance = calculateDistance(
                location.lat,
                location.lng,
                place.geometry.location.lat,
                place.geometry.location.lng
              );

              acc[category.name].places.push({
                name: place.name,
                distance,
                type: placeType,
              });
            }
          });
        }
        return acc;
      }, {} as Record<string, { name: string; icon: string; places: Array<{ name: string; distance: number; type: string }> }>);

      return {
        categories: Object.values(categorizedPlaces).filter(cat => cat.places.length > 0),
      };
    } catch (e) {
      console.log(`[app] ${e}`);
      throw new Error("[app] Failed to fetch nearby places");
    }
  },
};
