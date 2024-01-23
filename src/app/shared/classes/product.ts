// Products
export interface Product extends NewProduct {
    id: string;
}
export interface NewProduct {
    name: string;
    description: string;
    imageKey: string;
    pcgsURL?: string;
    type: Type;
    bullionType: BullionType;
    mintMark?: string;
    quantity: number;
    purchasePrice?: number;
    weight: string;
}

export enum Type {
    COIN = 'Coin',
    BAR = 'Bar',
    ROUND = 'Round',
    JUNK = 'Junk'
}

export enum BullionType {
    GOLD = 'Gold',
    SILVER = 'Silver',
    COPPER = 'Copper',
    SUPPLIES = 'Supplies'
}