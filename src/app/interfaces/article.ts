export interface Article {
    name: string;
    price: number;
    category: string;
}

export const fieldLabels: { [key in keyof Article]: string } = {
    name: 'Nom',
    price: 'Prix',
    category: 'Type',
};