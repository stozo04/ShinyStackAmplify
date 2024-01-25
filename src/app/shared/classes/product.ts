// Products
export interface Product extends NewProduct {
    id: string;
}
export interface NewProduct {
    name: string;
    description: string;
    imageKey?: string;
    pcgsURL?: string;
    format: Format;
    bullionType: BullionType;
    mintMark?: string;
    quantity: number;
    purchasePrice?: number;
    weight: string;
    signedURL?: string; // NOTE: This is auto-genreated
}

export enum Format {
    COIN = 'COIN',
    BAR = 'BAR',
    ROUND = 'ROUND',
    JUNK = 'JUNK'
}

export enum BullionType {
    GOLD = 'GOLD',
    SILVER = 'SILVER',
    COPPER = 'COPPER',
}