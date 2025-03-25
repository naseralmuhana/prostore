"use client"

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { toast } from "sonner"

import { formatCurrency } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"

import { approvePayPalOrder } from "@/features/order/actions/approve-paypal-order.action"
import { createPayPalOrder } from "@/features/order/actions/create-paypal-order.action"

import { MarkAsDeliveredButton } from "./mark-as-delivered-button"
import { MarkAsPaidButton } from "./mark-as-paid-button"

interface PaypalStripeCardProps {
  orderId: string
  itemsPrice: string
  shippingPrice: string
  taxPrice: string
  totalPrice: string
  isPaid: boolean
  paymentMethod: string
  paypalClientId: string
  isAdmin: boolean
  isDelivered: boolean
}

export function PaypalStripeCard({
  orderId,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  isPaid,
  paymentMethod,
  paypalClientId,
  isAdmin,
  isDelivered,
}: PaypalStripeCardProps) {
  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status = ""

    if (isPending) {
      status = "Loading PayPal..."
    } else if (isRejected) {
      status = "Error Loading PayPal"
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(orderId)

    if (!res.success) {
      toast.error(res.message)
    }

    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(orderId, data)
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Card>
      <CardContent className="gap-4 space-y-4 p-4">
        <div className="flex justify-between">
          <div>Items</div>
          <div>{formatCurrency(itemsPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div>{formatCurrency(taxPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping</div>
          <div>{formatCurrency(shippingPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Total</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>

        {/* PayPal Payment */}
        {!isPaid && paymentMethod === "PayPal" && (
          <div>
            <PayPalScriptProvider options={{ clientId: paypalClientId }}>
              <PrintLoadingState />
              <PayPalButtons
                createOrder={handleCreatePayPalOrder}
                onApprove={handleApprovePayPalOrder}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {/* Cash On Delivery */}
        {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
          <MarkAsPaidButton orderId={orderId} />
        )}
        {isAdmin && isPaid && !isDelivered && (
          <MarkAsDeliveredButton orderId={orderId} />
        )}
      </CardContent>
    </Card>
  )
}
