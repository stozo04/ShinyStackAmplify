// Products
export interface ProductRename extends NewProduct {
    id: string;
}
export interface NewProduct {
    name: string;
    description: string;
    preSignedURL: string;
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

export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}