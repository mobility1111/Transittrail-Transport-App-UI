
export interface Rate {
    id: string;
    roouteName: string;
    vehicleName: string;
    transportLineName: string;
    vehicleId: string;
    transportLineId: string;
    price: number;
    date: Date;
  }
  

  export interface Rate {
  id: string;
  roouteName: string;
  transportLineName: string;
  vehicleName: string;
  vehicleType: string;
  price: number;
  date: Date;
  originTerminalName: string;
  destinationTerminalName: string;
}