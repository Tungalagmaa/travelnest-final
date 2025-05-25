export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface Destination {
    id: string;
    name: string;
    description: string;
    location: Location;
  }
  
  