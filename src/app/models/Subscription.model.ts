// Subscription.model.ts
export interface Subscription {
    id: number;
    userId: string;
    subscriptionTypeId: number;
    subscriptionDate: Date;
    expiryDate: Date;
  }
  