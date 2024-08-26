// SubscriptionType.model.ts
export interface SubscriptionType {
    id: number;
    name: string;
    description?: string;
    price: number;
    durationInSeconds: number;
  }
  