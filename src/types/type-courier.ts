export type courierType = {
  id: string;
  available_collection_method: string[];
  available_for_cash_on_delivery: boolean;
  available_for_proof_of_delivery: boolean;
  available_for_instant_waybill_id: boolean;
  courier_name: string;
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  tier: string;
  description: string;
  shipping: [
    {
      serviceId: string;
      service_name: string;
      service_code: string;
      duration_range: string;
      duration_unit: string;
      shipping_type: string;
    },
  ];
  service_type: string;
  shipping_type: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  is_selected: boolean;
};

export type GroupedCourier = {
  courier_name: string;
  courier_code: string;
  id: string;
  shipping: {
    serviceId: string;
    service_name: string;
    service_code: string;
    duration_range: string;
    duration_unit: string;
    shipping_type: string;
    is_selected: boolean;
  }[];
};
