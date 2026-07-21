export interface ContainerArrivalInput {
  containerId: string;
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
}
