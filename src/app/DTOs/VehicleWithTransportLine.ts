
export interface VehicleWithTransportLine {
    id: string;
    type: string;
    capacity: number;
    amenities: string;
    available: boolean;
    imageUrl: string;
    transportLineId: string;
    rate: number;
    transportLineName: string;
}
