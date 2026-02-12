// ============== Order Types ==============

// ============== Order Status Enums ==============

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  PACKING = 'packing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  ON_HOLD = 'on_hold',
  FAILED = 'failed',
  DRAFT = 'draft',
}

export enum OrderPaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
  VOIDED = 'voided',
}

export enum OrderFulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  RESTOCKED = 'restocked',
  READY_FOR_PICKUP = 'ready_for_pickup',
  PICKED_UP = 'picked_up',
}

export enum OrderCancellationReason {
  CUSTOMER_REQUEST = 'customer_request',
  PAYMENT_FAILED = 'payment_failed',
  FRAUD_SUSPECTED = 'fraud_suspected',
  OUT_OF_STOCK = 'out_of_stock',
  SHIPPING_DELAY = 'shipping_delay',
  DUPLICATE_ORDER = 'duplicate_order',
  OTHER = 'other',
}

export enum OrderRefundReason {
  CUSTOMER_REQUEST = 'customer_request',
  DAMAGED_ITEM = 'damaged_item',
  WRONG_ITEM = 'wrong_item',
  MISSING_ITEM = 'missing_item',
  NOT_AS_DESCRIBED = 'not_as_described',
  SHIPPING_DELAY = 'shipping_delay',
  CANCELLED = 'cancelled',
  OTHER = 'other',
}

// ============== Order Item Types ==============

export interface OrderItemAttribute {
  name: string
  value: string
  displayName?: string
}

export interface OrderItemOption {
  optionId: string
  optionName: string
  valueId: string
  valueName: string
  price?: number
  sku?: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  variantId?: string
  sku: string
  name: string
  description?: string
  quantity: number
  price: number
  compareAtPrice?: number
  cost?: number
  discount: number
  discountType?: 'percentage' | 'fixed'
  discountAmount: number
  total: number
  subtotal: number
  tax: number
  taxRate: number
  shipping: number
  weight: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  metadata?: Record<string, unknown>
  image?: string
  attributes?: OrderItemAttribute[]
  options?: OrderItemOption[]
  fulfillmentStatus?: OrderFulfillmentStatus
  refundStatus?: 'none' | 'requested' | 'approved' | 'refunded'
  refundId?: string
  reviewSubmitted?: boolean
  reviewId?: string
  createdAt: string
  updatedAt: string
}

// ============== Order Address Types ==============

export interface OrderAddress {
  id?: string
  orderId?: string
  userId?: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  countryCode: string
  phone?: string
  email?: string
  instructions?: string
  type: 'shipping' | 'billing'
  isDefault?: boolean
  createdAt?: string
  updatedAt?: string
}

// ============== Order Fulfillment Types ==============

export interface OrderFulfillmentItem {
  id: string
  fulfillmentId: string
  orderItemId: string
  productId: string
  sku: string
  name: string
  quantity: number
  quantityFulfilled: number
  createdAt: string
  updatedAt: string
}

export interface OrderFulfillment {
  id: string
  orderId: string
  fulfillmentNumber: string
  status: OrderFulfillmentStatus
  items: OrderFulfillmentItem[]
  trackingNumber?: string
  trackingUrl?: string
  carrier?: string
  shippingMethod?: string
  shippingCost: number
  shippedAt?: string
  deliveredAt?: string
  notes?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Refund Types ==============

export interface OrderRefundItem {
  id: string
  refundId: string
  orderItemId: string
  productId: string
  sku: string
  name: string
  quantity: number
  quantityRefunded: number
  price: number
  discount: number
  tax: number
  total: number
  reason?: string
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'damaged'
  restocked: boolean
  restockedAt?: string
  createdAt: string
  updatedAt: string
}

export interface OrderRefund {
  id: string
  orderId: string
  refundNumber: string
  status: 'pending' | 'approved' | 'processed' | 'rejected' | 'failed'
  reason: OrderRefundReason
  reasonDetails?: string
  items: OrderRefundItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  method: string
  transactionId?: string
  notes?: string
  requestedBy?: string
  requestedAt: string
  approvedBy?: string
  approvedAt?: string
  processedAt?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Return Types ==============

export interface OrderReturnItem {
  id: string
  returnId: string
  orderItemId: string
  productId: string
  sku: string
  name: string
  quantity: number
  quantityReturned: number
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'damaged'
  reason: string
  resolution: 'refund' | 'exchange' | 'store_credit' | 'repair'
  refundId?: string
  exchangeOrderId?: string
  createdAt: string
  updatedAt: string
}

export interface OrderReturn {
  id: string
  orderId: string
  returnNumber: string
  status: 'requested' | 'approved' | 'rejected' | 'received' | 'completed' | 'cancelled'
  reason: string
  items: OrderReturnItem[]
  shippingMethod?: string
  trackingNumber?: string
  trackingUrl?: string
  notes?: string
  requestedAt: string
  approvedAt?: string
  receivedAt?: string
  completedAt?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Exchange Types ==============

export interface OrderExchangeItem {
  id: string
  exchangeId: string
  productId: string
  variantId?: string
  sku: string
  name: string
  quantity: number
  price: number
  total: number
  attributes?: OrderItemAttribute[]
}

export interface OrderExchange {
  id: string
  orderId: string
  exchangeNumber: string
  status: 'requested' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  returnItems: OrderReturnItem[]
  exchangeItems: OrderExchangeItem[]
  shippingMethod?: string
  trackingNumber?: string
  trackingUrl?: string
  additionalPayment?: number
  refundAmount?: number
  notes?: string
  requestedAt: string
  approvedAt?: string
  shippedAt?: string
  completedAt?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Invoice Types ==============

export interface OrderInvoice {
  id: string
  orderId: string
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  paid: number
  balance: number
  currency: string
  notes?: string
  sentAt?: string
  paidAt?: string
  pdfUrl?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Note Types ==============

export interface OrderNote {
  id: string
  orderId: string
  userId?: string
  userName?: string
  type: 'internal' | 'customer' | 'system'
  visibility: 'public' | 'private' | 'admin'
  content: string
  attachments?: string[]
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order History Types ==============

export interface OrderHistory {
  id: string
  orderId: string
  userId?: string
  userName?: string
  action: string
  field?: string
  oldValue?: string
  newValue?: string
  ip?: string
  userAgent?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

// ============== Order Discount Types ==============

export interface OrderDiscount {
  id: string
  orderId: string
  type: 'coupon' | 'promotion' | 'loyalty' | 'store_credit' | 'gift_card'
  code?: string
  name: string
  description?: string
  amount: number
  amountType: 'percentage' | 'fixed'
  percentage?: number
  appliedTo: 'order' | 'shipping' | 'items'
  applicableItems?: string[]
  metadata?: Record<string, unknown>
  createdAt: string
}

// ============== Order Fee Types ==============

export interface OrderFee {
  id: string
  orderId: string
  type: 'shipping' | 'handling' | 'insurance' | 'gift_wrap' | 'routing' | 'custom'
  name: string
  description?: string
  amount: number
  taxable: boolean
  tax: number
  total: number
  metadata?: Record<string, unknown>
  createdAt: string
}

// ============== Order Tax Types ==============

export interface OrderTax {
  id: string
  orderId: string
  name: string
  rate: number
  amount: number
  jurisdiction?: string
  jurisdictionType?: 'country' | 'state' | 'county' | 'city'
  taxType?: 'sales' | 'vat' | 'gst' | 'hst' | 'pst' | 'qst'
  taxableAmount: number
  metadata?: Record<string, unknown>
  createdAt: string
}

// ============== Order Tracking Types ==============

export interface OrderTrackingEvent {
  id: string
  trackingId: string
  status: string
  statusCode: string
  location?: string
  description: string
  date: string
  time?: string
  timezone?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface OrderTracking {
  id: string
  orderId: string
  fulfillmentId?: string
  carrier: string
  carrierCode: string
  trackingNumber: string
  trackingUrl: string
  status: string
  statusCode: string
  estimatedDelivery?: string
  actualDelivery?: string
  events: OrderTrackingEvent[]
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// ============== Order Main Type ==============

export interface Order {
  id: string
  orderNumber: string
  orderKey?: string
  userId?: string
  email: string
  phone?: string
  
  // Status
  status: OrderStatus
  paymentStatus: OrderPaymentStatus
  fulfillmentStatus: OrderFulfillmentStatus
  
  // Dates
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  datePaid?: string
  dateCompleted?: string
  dateCancelled?: string
  
  // Items
  items: OrderItem[]
  itemCount: number
  uniqueItemCount: number
  
  // Addresses
  shippingAddress: OrderAddress
  billingAddress: OrderAddress
  sameAsShipping?: boolean
  
  // Shipping
  shippingMethod?: string
  shippingMethodId?: string
  shippingMethodName?: string
  shippingCarrier?: string
  shippingAmount: number
  shippingTax: number
  shippingTotal: number
  estimatedDelivery?: string
  trackingNumber?: string
  trackingUrl?: string
  
  // Payment
  paymentMethod: string
  paymentMethodId?: string
  paymentMethodName?: string
  paymentDate?: string
  
  // Pricing
  subtotal: number
  discount: number
  discountDetails?: OrderDiscount[]
  shipping: number
  shippingDiscount: number
  tax: number
  taxDetails?: OrderTax[]
  fees: number
  feeDetails?: OrderFee[]
  total: number
  totalPaid: number
  totalRefunded: number
  balance: number
  currency: string
  currencyRate?: number
  
  // Coupons
  couponCode?: string
  couponDiscount?: number
  
  // Gift
  giftMessage?: string
  giftWrap?: boolean
  giftWrapAmount?: number
  
  // Notes
  customerNote?: string
  internalNote?: string
  notes?: OrderNote[]
  
  // Metadata
  ip?: string
  userAgent?: string
  source?: 'web' | 'mobile' | 'admin' | 'api' | 'pos'
  channel?: string
  campaign?: string
  metadata?: Record<string, unknown>
  
  // Relations
  fulfillments?: OrderFulfillment[]
  refunds?: OrderRefund[]
  returns?: OrderReturn[]
  exchanges?: OrderExchange[]
  invoices?: OrderInvoice[]
  history?: OrderHistory[]
  
  // Flags
  isPaid: boolean
  isShipped: boolean
  isDelivered: boolean
  isCompleted: boolean
  isCancelled: boolean
  isRefunded: boolean
  isPartiallyRefunded: boolean
  isOnHold: boolean
  isGift: boolean
  isTaxable: boolean
}

// ============== Order Request/Response Types ==============

export interface CreateOrderItemRequest {
  productId: string
  variantId?: string
  quantity: number
  attributes?: OrderItemAttribute[]
}

export interface CreateOrderRequest {
  userId?: string
  email: string
  phone?: string
  items: CreateOrderItemRequest[]
  shippingAddress: Omit<OrderAddress, 'id' | 'orderId' | 'userId' | 'type' | 'createdAt' | 'updatedAt'>
  billingAddress?: Omit<OrderAddress, 'id' | 'orderId' | 'userId' | 'type' | 'createdAt' | 'updatedAt'>
  sameAsShipping?: boolean
  shippingMethodId?: string
  paymentMethodId: string
  couponCode?: string
  giftMessage?: string
  giftWrap?: boolean
  customerNote?: string
  source?: string
  channel?: string
  metadata?: Record<string, unknown>
}

export interface UpdateOrderRequest {
  status?: OrderStatus
  paymentStatus?: OrderPaymentStatus
  fulfillmentStatus?: OrderFulfillmentStatus
  shippingAddress?: Partial<OrderAddress>
  billingAddress?: Partial<OrderAddress>
  shippingMethodId?: string
  trackingNumber?: string
  trackingUrl?: string
  customerNote?: string
  internalNote?: string
  metadata?: Record<string, unknown>
}

export interface OrderResponse {
  order: Order
}

export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface OrderStatsResponse {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  ordersByStatus: Record<OrderStatus, number>
  revenueByPeriod: Array<{
    period: string
    orders: number
    revenue: number
  }>
  topProducts: Array<{
    productId: string
    productName: string
    quantity: number
    revenue: number
  }>
}

// ============== Order Filter Types ==============

export interface OrderFilter {
  status?: OrderStatus | OrderStatus[]
  paymentStatus?: OrderPaymentStatus | OrderPaymentStatus[]
  fulfillmentStatus?: OrderFulfillmentStatus | OrderFulfillmentStatus[]
  userId?: string
  email?: string
  dateFrom?: string
  dateTo?: string
  totalMin?: number
  totalMax?: number
  couponCode?: string
  paymentMethod?: string
  shippingMethod?: string
  source?: string
  channel?: string
  search?: string
  orderNumber?: string
  trackingNumber?: string
  isPaid?: boolean
  isShipped?: boolean
  isDelivered?: boolean
  isCancelled?: boolean
}

export interface OrderSortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface OrderExportOptions {
  format: 'csv' | 'json' | 'xml' | 'pdf'
  fields: string[]
  dateFrom?: string
  dateTo?: string
  status?: OrderStatus[]
  includeItems?: boolean
  includeAddresses?: boolean
}

// ============== Order Constants ==============

export const ORDER_CONSTANTS = {
  VERSION: '1.0.0',
  
  STATUSES: Object.values(OrderStatus),
  PAYMENT_STATUSES: Object.values(OrderPaymentStatus),
  FULFILLMENT_STATUSES: Object.values(OrderFulfillmentStatus),
  
  ALLOWED_STATUS_TRANSITIONS: {
    [OrderStatus.DRAFT]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
    [OrderStatus.PENDING]: [
      OrderStatus.PROCESSING,
      OrderStatus.CONFIRMED,
      OrderStatus.ON_HOLD,
      OrderStatus.CANCELLED,
      OrderStatus.FAILED,
    ],
    [OrderStatus.PROCESSING]: [
      OrderStatus.CONFIRMED,
      OrderStatus.PACKING,
      OrderStatus.ON_HOLD,
      OrderStatus.CANCELLED,
    ],
    [OrderStatus.CONFIRMED]: [
      OrderStatus.PACKING,
      OrderStatus.SHIPPED,
      OrderStatus.ON_HOLD,
      OrderStatus.CANCELLED,
    ],
    [OrderStatus.PACKING]: [OrderStatus.SHIPPED, OrderStatus.ON_HOLD, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.ON_HOLD, OrderStatus.CANCELLED],
    [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED, OrderStatus.REFUNDED, OrderStatus.PARTIALLY_REFUNDED],
    [OrderStatus.COMPLETED]: [OrderStatus.REFUNDED, OrderStatus.PARTIALLY_REFUNDED],
    [OrderStatus.ON_HOLD]: [OrderStatus.PROCESSING, OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
    [OrderStatus.FAILED]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: [],
    [OrderStatus.PARTIALLY_REFUNDED]: [],
  },
  
  CANCELLATION_REASONS: Object.values(OrderCancellationReason),
  REFUND_REASONS: Object.values(OrderRefundReason),
  
  DEFAULT_SORT: 'createdAt',
  DEFAULT_SORT_DIRECTION: 'desc',
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

export const ORDER_VALIDATION = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
  MIN_PRICE: 0,
  MAX_PRICE: 999999.99,
  MIN_DISCOUNT: 0,
  MAX_DISCOUNT: 100,
  MAX_ITEMS: 50,
  MAX_NOTES_LENGTH: 1000,
  MAX_GIFT_MESSAGE_LENGTH: 500,
} as const

export const ORDER_ERROR_CODES = {
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  ORDER_CANNOT_BE_UPDATED: 'ORDER_CANNOT_BE_UPDATED',
  ORDER_CANNOT_BE_CANCELLED: 'ORDER_CANNOT_BE_CANCELLED',
  ORDER_ALREADY_CANCELLED: 'ORDER_ALREADY_CANCELLED',
  ORDER_ALREADY_COMPLETED: 'ORDER_ALREADY_COMPLETED',
  ORDER_ALREADY_PAID: 'ORDER_ALREADY_PAID',
  ORDER_ALREADY_SHIPPED: 'ORDER_ALREADY_SHIPPED',
  ORDER_ITEM_NOT_FOUND: 'ORDER_ITEM_NOT_FOUND',
  ORDER_ITEM_OUT_OF_STOCK: 'ORDER_ITEM_OUT_OF_STOCK',
  INVALID_ORDER_STATUS: 'INVALID_ORDER_STATUS',
  INVALID_ORDER_STATUS_TRANSITION: 'INVALID_ORDER_STATUS_TRANSITION',
  INVALID_PAYMENT_STATUS: 'INVALID_PAYMENT_STATUS',
  INVALID_FULFILLMENT_STATUS: 'INVALID_FULFILLMENT_STATUS',
  INVALID_SHIPPING_ADDRESS: 'INVALID_SHIPPING_ADDRESS',
  INVALID_BILLING_ADDRESS: 'INVALID_BILLING_ADDRESS',
  INVALID_PAYMENT_METHOD: 'INVALID_PAYMENT_METHOD',
  INVALID_SHIPPING_METHOD: 'INVALID_SHIPPING_METHOD',
  INVALID_COUPON: 'INVALID_COUPON',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_DECLINED: 'PAYMENT_DECLINED',
  SHIPPING_NOT_AVAILABLE: 'SHIPPING_NOT_AVAILABLE',
  REFUND_FAILED: 'REFUND_FAILED',
  CANCELLATION_FAILED: 'CANCELLATION_FAILED',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const

export type OrderErrorCode = keyof typeof ORDER_ERROR_CODES

// ============== Order Summary Type ==============

export type OrderSummary = {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: OrderPaymentStatus
  fulfillmentStatus: OrderFulfillmentStatus
  createdAt: string
  total: number
  currency: string
  itemCount: number
  email: string
  customerName: string
  itemsSummary: string
}

// ============== Order Timeline Event Type ==============

export interface OrderTimelineEvent {
  id: string
  orderId: string
  type: 'status_change' | 'payment' | 'shipment' | 'fulfillment' | 'refund' | 'return' | 'note' | 'system'
  title: string
  description?: string
  metadata?: Record<string, unknown>
  createdAt: string
  createdBy?: string
}

// ============== Order Status Transition Type ==============

export interface OrderStatusTransition {
  from: OrderStatus
  to: OrderStatus
  allowed: boolean
  requiresAction?: boolean
  requiresPayment?: boolean
  requiresShipment?: boolean
  requiresRefund?: boolean
}

// ============== Export ==============

export default {
  OrderStatus,
  OrderPaymentStatus,
  OrderFulfillmentStatus,
  OrderCancellationReason,
  OrderRefundReason,
  ORDER_CONSTANTS,
  ORDER_VALIDATION,
  ORDER_ERROR_CODES,
}