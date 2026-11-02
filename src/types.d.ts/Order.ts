// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: number;
  orderTotal: number;
  status: "pending" | "shipped" | "await_shipment" | "delivered";
  isPaid: boolean;
};
