export interface Rooute {
    id: string;
    originTerminalId: string;
    destinationTerminalId: string;
    vehicleId: string;
    transportLineId: string;
    departureTime: Date;
    arrivalTime: Date;
    rate: number;
    originTerminalName: string;
    destinationTerminalName : string;
    vehicleType: string;
    transportLineName:string;
  }
  