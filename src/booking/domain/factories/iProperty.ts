export interface iProperty {
  createProperty(
    id: string,
    name: string,
    address: string,
    propertyType: string,
    city: string,
    pricePerNight: number,
  );
}
