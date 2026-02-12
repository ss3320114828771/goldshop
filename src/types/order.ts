// ============== Order Status Enums ==============

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  ON_HOLD = 'on_hold',
  FAILED = 'failed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum FulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

// ============== Core Types ==============

export interface OrderAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  email?: string
}

export interface OrderItem {
  productId: string
  name: string
  sku: string
  quantity: number
  price: number
  total: number
  image?: string
}

// ============== Main Order Type ==============

export interface Order {
  // Core
  id: string
  orderNumber: string
  userId?: string
  
  // Status
  status: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  
  // Dates
  createdAt: string
  updatedAt: string
  
  // Customer
  customerEmail: string
  customerName?: string
  customerPhone?: string
  
  // Items
  items: OrderItem[]
  itemCount: number
  
  // Addresses
  shippingAddress: OrderAddress
  billingAddress?: OrderAddress
  
  // Shipping
  shippingMethod?: string
  trackingNumber?: string
  trackingUrl?: string
  shippingCost: number
  
  // Payment
  paymentMethod: string
  transactionId?: string
  
  // Pricing
  subtotal: number
  discountTotal: number
  shippingTotal: number
  taxTotal: number
  grandTotal: number
  currency: string
  
  // Notes
  notes?: string
  
  // Flags
  isPaid: boolean
  isShipped: boolean
  isDelivered: boolean
  isCancelled: boolean
}

// ============== Request/Response Types ==============

export interface CreateOrderRequest {
  items: Array<{
    productId: string
    quantity: number
  }>
  shippingAddress: OrderAddress
  billingAddress?: OrderAddress
  paymentMethodId: string
  shippingMethodId?: string
  couponCode?: string
  notes?: string
}

export interface UpdateOrderRequest {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  fulfillmentStatus?: FulfillmentStatus
  trackingNumber?: string
  trackingUrl?: string
  notes?: string
}

export interface OrderResponse {
  success: boolean
  data?: Order
  error?: string
}

export interface OrderListResponse {
  success: boolean
  data: Order[]
  total: number
  page: number
  limit: number
}

// ============== Filter Types ==============

export interface OrderFilters {
  status?: OrderStatus[]
  userId?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

// ============== Summary Type ==============

export type OrderSummary = Pick<Order,
  | 'id'
  | 'orderNumber'
  | 'status'
  | 'createdAt'
  | 'grandTotal'
  | 'currency'
  | 'customerEmail'
  | 'itemCount'
>

// ============== Constants ==============

export const ORDER_CONSTANTS = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
  MIN_PRICE: 0,
  MAX_PRICE: 999999,
} as const

export const ORDER_ERRORS = {
  NOT_FOUND: 'Order not found',
  INVALID_STATUS: 'Invalid order status',
  INVALID_QUANTITY: 'Invalid quantity',
  INSUFFICIENT_STOCK: 'Insufficient stock',
  PAYMENT_FAILED: 'Payment failed',
  UNAUTHORIZED: 'Unauthorized access',
} as const

// ============== Export ==============

export type {
  
  
  
  

  
  
  
}