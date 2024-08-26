export interface PaymentTransaction {
    id: string;
    userId: string;
    email: string;
    amount: number;
    transactionReference: string;
    status: boolean;
    createdAt: Date;
    paymentType: string;

    // New fields
    fullName: string;
    route: string;
    phoneNumber: string;
    transportLineName: string;
    originTerminalName: string;
    destinationTerminalName: string;
    vehicleType: string;
}
