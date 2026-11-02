import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { auth } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import { db } from "@/prisma/db";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const getOrdersData = async (days: number) => {
  const daysAgo = new Date(
    Date.now() - days * 24 * 60 * 60 * 1000,
  ).toISOString();

  const paidOrders = db.orm.public.Order.where((order) =>
    order.isPaid.eq(true),
  ).where((order) => order.createdAt.gte(daysAgo));

  const orders = await paidOrders
    .orderBy((order) => order.createdAt.desc())
    .include("user")
    .include("shippingAddress")
    .all();

  const totalIncome = await paidOrders.aggregate((aggregate) => ({
    totalAmount: aggregate.sum("orderTotal"),
  }));

  return { orders, totalIncome };
};

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!user || user.email !== adminEmail) {
    return notFound();
  }

  const weekly = await getOrdersData(7);
  const monthly = await getOrdersData(30);

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2000;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(weekly.totalIncome.totalAmount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  className="w-full max-w-sm"
                  value={
                    ((weekly.totalIncome.totalAmount ?? 0) * 100) /
                    WEEKLY_GOAL
                  }
                >
                  <ProgressLabel>Achieved</ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(monthly.totalIncome.totalAmount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  className="w-full max-w-sm"
                  value={
                    ((monthly.totalIncome.totalAmount ?? 0) * 100) /
                    MONTHLY_GOAL
                  }
                >
                  <ProgressLabel>Achieved</ProgressLabel>
                  <ProgressValue />
                </Progress>
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Orders</h1>
          <DataTable columns={columns} data={monthly.orders} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
