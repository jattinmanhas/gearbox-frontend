"use client";
import { NextPage } from "next";
import { CheckCircleIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/userCartStore";
import { useEffect } from "react";

const PaymentSuccessfulPage: NextPage = () => {
  const router = useRouter();
  const {clearCart} = useCartStore();

  useEffect(() => {
    clearCart();
  },[])
  
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md bg-gray-900">
        <CardHeader>
          <CardTitle>Payment Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <CheckCircleIcon className="text-green-500 w-16 h-16" />
            <p>Your payment was successful.</p>
            <Button onClick={() => router.push("/")}>Go Back to Home</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessfulPage;
