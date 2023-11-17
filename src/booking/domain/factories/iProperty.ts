export interface iProperty {
  createProperty(
    id: number,
    name: string,
    address: string,
    propertyType: string,
    city: string,
    pricePerNight: number,
  );
}
