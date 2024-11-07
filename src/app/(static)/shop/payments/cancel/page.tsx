"use client";
import { NextPage } from "next";
import { XCircleIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PaymentFailedPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md bg-gray-900">
        <CardHeader>
          <CardTitle>Payment Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <XCircleIcon className="text-red-500 w-16 h-16" />
            <p>Sorry, your payment was unsuccessful. Please try again.</p>
            <Button onClick={() => router.push("/cart")}>Try Again</Button>
            <Button variant="ghost" onClick={() => router.push("/")}>
              Go Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailedPage;
