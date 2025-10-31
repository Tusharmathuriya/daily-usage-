
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Kitchen {
  id: number;
  name: string;
  chefName: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  menu: MenuItem[];
}

export interface BookingDetails {
    name: string;
    address: string;
    phone: string;
    date: string;
    menuItem: MenuItem;
}
