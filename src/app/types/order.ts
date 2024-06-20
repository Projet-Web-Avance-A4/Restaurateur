export type Address = {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  
  export type Customer = {
    customer_id: number;
    name: string;
    phone: string;
    email: string;
    address: Address;
  };
  
  export type Restaurant = {
    restaurant_id: number;
    name: string;
    phone: string;
    address: Address;
  };
  
  export type Item = {
    menu_id?: number;
    drink_id?: number;
    dessert_id?: number;
    name_menu?: string;
    name_article?: string;
    id_dish?: number;
    category?: number;
    id_restorer: number
    price_menu?: number;
    price_article?: number;
  };
  
  export type Payment = {
    method: string;
    transaction_id: string;
    amount: number;
    currency: string;
    payment_time: Date;
  };
  
  export type Driver = {
    driver_id: number;
    name: string;
    phone: string;
  };
  
  export type Order = {
    order_id: number;
    customer: Customer;
    restaurant: Restaurant;
    items: Item[];
    order_status: string;
    verification_code: string;
    payment: Payment;
    driver: Driver;
    total_price: number;
  };
