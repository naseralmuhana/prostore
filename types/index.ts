import { LucideProps, icons } from "lucide-react"
import { z } from "zod"

import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertReviewSchema,
  paymentMethodSchema,
  paymentResultSchema,
  shippingAddressSchema,
  updateProductSchema,
  updateProfileSchema,
  updateUserSchema,
} from "@/lib/validators"

export type ActionReturn = Promise<{
  success: boolean
  message: string
}>

export type Product = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  numReviews: number
  createdAt: Date
  updatedAt: Date
}
export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>

export type UpdateUser = z.infer<typeof updateUserSchema>

export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof insertCartSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>

export type OrderItem = z.infer<typeof insertOrderItemSchema>
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string
  createdAt: Date
  isPaid: boolean
  paidAt: Date | null
  isDelivered: boolean
  deliveredAt: Date | null
  orderitems: OrderItem[]
  user: { name: string; email: string }
  paymentResult: PaymentResult
}
export type PaymentResult = z.infer<typeof paymentResultSchema>
export type SalesDataType = {
  month: string
  totalSales: number
}[]

export type UpdateUserProfile = z.infer<typeof updateProfileSchema>

export type InsertReview = z.infer<typeof insertReviewSchema>
export type Review = z.infer<typeof insertReviewSchema> & {
  id: string
  createdAt: Date
  user?: { name: string }
}

// ui
export type IconType = {
  name: keyof typeof icons
  props?: LucideProps
}
