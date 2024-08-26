
export interface RateComparisonDto {
    transportLineName: string;
    rate: number;
    vehicleType: string;
    originTerminalName: string; // Add this property
    destinationTerminalName: string; // Add this property
}
