export interface Location {
    id?: string;
    name?: string;
    address: string;
    postal_code: string;
    provinces: string;
    regencies: string;
    districts: string;
    villages: string;
    latitude: string;
    longitude: string;
    contact_name: string;
    contact_phone: string;
    type: string;
    storeId?: string;
    profileId?: string;
    is_main_location?: boolean;
  }
  
export interface LocationGuest {
    id?: string;
    name?: string;
    address: string;
    postal_code: string;
    provinces: string;
    regencies: string;
    districts: string;
    villages: string;
    latitude: string;
    longitude: string;
    contact_name: string;
    contact_phone: string;
    type: string;
    storeId?: string;
    profileId?: string;
    is_main_location?: boolean;
    guestId: string
  }
  
