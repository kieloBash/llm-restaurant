export interface FoursquarePlace {
  fsq_id: string;
  hours?: FoursquareHours;
  location?: FoursquareLocation;
  name: string;
  price?: number;
  categories?: FoursquareCategory[];
  tastes?: string[];
  rating?: number;

  //   chains: any[];
  //   closed_bucket: string;
  //   distance: number;
  //   geocodes: {
  //     main: Coordinates;
  //     roof: Coordinates;
  //   };
  //   link: string;
  //   related_places: {
  //     children: RelatedPlace[];
  //   };
  //   timezone: string;
}

export interface FoursquareOpeningHours {
  close: string;
  day: number; // 0 = Sunday, 6 = Saturday
  open: string;
}

export interface FoursquareHours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: FoursquareOpeningHours[];
}

export interface FoursquareCategory {
  id: number;
  name: string;
  short_name: string;
  plural_name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface FoursquareLocation {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

export interface RelatedPlace {
  fsq_id: string;
  categories: FoursquareCategory[];
  name: string;
}
