"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//import type { Payment } from "@/types.d.ts/Payment";

import { DataTableFeatures } from "@/components/ui/data-table-features";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import type { Order } from "@/types.d.ts/Order";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Order>();

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  }),
  columnHelper.accessor("isPaid", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Paid?" />
    ),
  }),
  columnHelper.accessor("orderTotal", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Total" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("orderTotal"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return formatted;
    },
  }),
  columnHelper.display({
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-8 w-8 p-0" />}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(order.id))}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
]);
