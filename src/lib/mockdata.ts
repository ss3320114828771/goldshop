// ============== Types ==============

export interface MockUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'vendor'
  avatar?: string
  emailVerified: boolean
  createdAt: string
}

export interface MockProduct {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  category: string
  categoryId: string
  subcategory?: string
  images: MockImage[]
  thumbnail: string
  sku: string
  inventory: MockInventory
  attributes: MockAttribute[]
  tags: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isFeatured: boolean
  isOnSale: boolean
  discount?: number
  createdAt: string
}

export interface MockImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export interface MockInventory {
  quantity: number
  lowStockThreshold: number
  isInStock: boolean
}

export interface MockAttribute {
  name: string
  value: string
}

export interface MockCategory {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  subcategories?: MockSubcategory[]
}

export interface MockSubcategory {
  id: string
  name: string
  slug: string
  productCount: number
}

export interface MockOrder {
  id: string
  orderNumber: string
  userId: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: MockOrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  shippingAddress: MockAddress
  billingAddress: MockAddress
  paymentMethod: string
  createdAt: string
}

export interface MockOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface MockAddress {
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface MockReview {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  images?: string[]
  verifiedPurchase: boolean
  helpful: number
  createdAt: string
}

export interface MockBlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorAvatar?: string
  coverImage: string
  category: string
  tags: string[]
  readTime: number
  publishedAt: string
  featured: boolean
}

export interface MockCoupon {
  id: string
  code: string
  description: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder?: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit?: number
  usedCount: number
}

// ============== Mock Users ==============

export const mockUsers: MockUser[] = [
  {
    id: 'usr_1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    emailVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'usr_2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    emailVerified: true,
    createdAt: '2024-01-20T14:45:00Z',
  },
  {
    id: 'usr_3',
    email: 'robert.johnson@example.com',
    name: 'Robert Johnson',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    emailVerified: false,
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    id: 'usr_4',
    email: 'emily.wilson@example.com',
    name: 'Emily Wilson',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    emailVerified: true,
    createdAt: '2024-02-10T16:20:00Z',
  },
  {
    id: 'usr_5',
    email: 'admin@jweelary.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'usr_6',
    email: 'vendor@jweelary.com',
    name: 'Vendor User',
    role: 'vendor',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    emailVerified: true,
    createdAt: '2024-01-05T11:00:00Z',
  },
]

// ============== Mock Categories ==============

export const mockCategories: MockCategory[] = [
  {
    id: 'cat_1',
    name: 'Rings',
    slug: 'rings',
    description: 'Discover our exquisite collection of rings for every occasion',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
    productCount: 124,
    subcategories: [
      { id: 'subcat_1', name: 'Engagement Rings', slug: 'engagement-rings', productCount: 34 },
      { id: 'subcat_2', name: 'Wedding Bands', slug: 'wedding-bands', productCount: 28 },
      { id: 'subcat_3', name: 'Promise Rings', slug: 'promise-rings', productCount: 22 },
      { id: 'subcat_4', name: 'Eternity Rings', slug: 'eternity-rings', productCount: 18 },
      { id: 'subcat_5', name: 'Statement Rings', slug: 'statement-rings', productCount: 22 },
    ],
  },
  {
    id: 'cat_2',
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Elegant necklaces and pendants to elevate your style',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
    productCount: 89,
    subcategories: [
      { id: 'subcat_6', name: 'Pendants', slug: 'pendants', productCount: 24 },
      { id: 'subcat_7', name: 'Chokers', slug: 'chokers', productCount: 18 },
      { id: 'subcat_8', name: 'Chains', slug: 'chains', productCount: 15 },
      { id: 'subcat_9', name: 'Pearl Necklaces', slug: 'pearl-necklaces', productCount: 12 },
      { id: 'subcat_10', name: 'Diamond Necklaces', slug: 'diamond-necklaces', productCount: 20 },
    ],
  },
  {
    id: 'cat_3',
    name: 'Earrings',
    slug: 'earrings',
    description: 'From classic studs to dramatic chandeliers',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
    productCount: 156,
    subcategories: [
      { id: 'subcat_11', name: 'Stud Earrings', slug: 'stud-earrings', productCount: 45 },
      { id: 'subcat_12', name: 'Hoop Earrings', slug: 'hoop-earrings', productCount: 32 },
      { id: 'subcat_13', name: 'Drop Earrings', slug: 'drop-earrings', productCount: 28 },
      { id: 'subcat_14', name: 'Chandelier Earrings', slug: 'chandelier-earrings', productCount: 24 },
      { id: 'subcat_15', name: 'Ear Cuffs', slug: 'ear-cuffs', productCount: 27 },
    ],
  },
  {
    id: 'cat_4',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Beautiful bracelets and bangles for every wrist',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
    productCount: 67,
    subcategories: [
      { id: 'subcat_16', name: 'Bangles', slug: 'bangles', productCount: 18 },
      { id: 'subcat_17', name: 'Cuffs', slug: 'cuffs', productCount: 15 },
      { id: 'subcat_18', name: 'Tennis Bracelets', slug: 'tennis-bracelets', productCount: 12 },
      { id: 'subcat_19', name: 'Charm Bracelets', slug: 'charm-bracelets', productCount: 14 },
      { id: 'subcat_20', name: 'Link Bracelets', slug: 'link-bracelets', productCount: 8 },
    ],
  },
  {
    id: 'cat_5',
    name: 'Watches',
    slug: 'watches',
    description: 'Timeless timepieces for men and women',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    productCount: 45,
    subcategories: [
      { id: 'subcat_21', name: 'Luxury Watches', slug: 'luxury-watches', productCount: 15 },
      { id: 'subcat_22', name: 'Dress Watches', slug: 'dress-watches', productCount: 12 },
      { id: 'subcat_23', name: 'Sports Watches', slug: 'sports-watches', productCount: 10 },
      { id: 'subcat_24', name: 'Smart Watches', slug: 'smart-watches', productCount: 8 },
    ],
  },
]

// ============== Mock Products ==============

export const mockProducts: MockProduct[] = [
  {
    id: 'prod_1',
    name: 'Classic Diamond Engagement Ring',
    slug: 'classic-diamond-engagement-ring',
    description: 'A timeless symbol of love, featuring a brilliant-cut diamond set in 18k white gold. This classic engagement ring showcases exceptional craftsmanship and superior quality diamonds.',
    shortDescription: 'Brilliant-cut diamond engagement ring in 18k white gold',
    price: 4999.99,
    compareAtPrice: 5999.99,
    category: 'Rings',
    categoryId: 'cat_1',
    subcategory: 'Engagement Rings',
    images: [
      {
        id: 'img_1',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
        alt: 'Classic Diamond Engagement Ring',
        isPrimary: true,
      },
      {
        id: 'img_2',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&angle=1',
        alt: 'Classic Diamond Engagement Ring - Side View',
        isPrimary: false,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200',
    sku: 'RNG-ENG-001',
    inventory: {
      quantity: 15,
      lowStockThreshold: 5,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '18k White Gold' },
      { name: 'Diamond Weight', value: '1.5 ct' },
      { name: 'Diamond Clarity', value: 'VS1' },
      { name: 'Diamond Color', value: 'G' },
      { name: 'Ring Size', value: '6' },
    ],
    tags: ['diamond', 'engagement', 'wedding', 'luxury'],
    rating: 4.9,
    reviewCount: 124,
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discount: 16,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'prod_2',
    name: 'Pearl Strand Necklace',
    slug: 'pearl-strand-necklace',
    description: 'Elegant freshwater pearl necklace with 14k gold clasp. Each pearl is carefully selected for its luster and uniformity, creating a timeless piece that never goes out of style.',
    shortDescription: 'Freshwater pearl necklace with 14k gold clasp',
    price: 899.99,
    compareAtPrice: 1199.99,
    category: 'Necklaces',
    categoryId: 'cat_2',
    subcategory: 'Pearl Necklaces',
    images: [
      {
        id: 'img_3',
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
        alt: 'Pearl Strand Necklace',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200',
    sku: 'NCK-PRL-001',
    inventory: {
      quantity: 28,
      lowStockThreshold: 8,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '14k Gold' },
      { name: 'Pearl Size', value: '8mm' },
      { name: 'Length', value: '18"' },
      { name: 'Pearl Type', value: 'Freshwater' },
    ],
    tags: ['pearl', 'necklace', 'classic', 'elegant'],
    rating: 4.7,
    reviewCount: 56,
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discount: 25,
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 'prod_3',
    name: 'Diamond Stud Earrings',
    slug: 'diamond-stud-earrings',
    description: 'Classic round brilliant diamond stud earrings set in 18k white gold. Perfect for everyday elegance or special occasions.',
    shortDescription: 'Round brilliant diamond stud earrings',
    price: 1299.99,
    compareAtPrice: 1599.99,
    category: 'Earrings',
    categoryId: 'cat_3',
    subcategory: 'Stud Earrings',
    images: [
      {
        id: 'img_4',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
        alt: 'Diamond Stud Earrings',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200',
    sku: 'ERR-DIA-001',
    inventory: {
      quantity: 32,
      lowStockThreshold: 10,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '18k White Gold' },
      { name: 'Diamond Weight', value: '1.0 ct' },
      { name: 'Diamond Clarity', value: 'VS2' },
      { name: 'Diamond Color', value: 'H' },
    ],
    tags: ['diamond', 'earrings', 'studs', 'classic'],
    rating: 4.8,
    reviewCount: 89,
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discount: 19,
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    id: 'prod_4',
    name: 'Gold Tennis Bracelet',
    slug: 'gold-tennis-bracelet',
    description: 'Elegant 14k gold tennis bracelet featuring round brilliant diamonds. A versatile piece that adds sparkle to any outfit.',
    shortDescription: '14k gold diamond tennis bracelet',
    price: 2499.99,
    compareAtPrice: 2999.99,
    category: 'Bracelets',
    categoryId: 'cat_4',
    subcategory: 'Tennis Bracelets',
    images: [
      {
        id: 'img_5',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
        alt: 'Gold Tennis Bracelet',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200',
    sku: 'BRC-TEN-001',
    inventory: {
      quantity: 12,
      lowStockThreshold: 5,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '14k Gold' },
      { name: 'Diamond Weight', value: '2.0 ct' },
      { name: 'Length', value: '7"' },
    ],
    tags: ['gold', 'diamond', 'bracelet', 'tennis'],
    rating: 4.9,
    reviewCount: 42,
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discount: 17,
    createdAt: '2024-02-10T11:45:00Z',
  },
  {
    id: 'prod_5',
    name: 'Luxury Automatic Watch',
    slug: 'luxury-automatic-watch',
    description: 'Swiss-made automatic watch with sapphire crystal and leather strap. Features a chronograph function and date display.',
    shortDescription: 'Swiss automatic chronograph watch',
    price: 3999.99,
    compareAtPrice: 4999.99,
    category: 'Watches',
    categoryId: 'cat_5',
    subcategory: 'Luxury Watches',
    images: [
      {
        id: 'img_6',
        url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
        alt: 'Luxury Automatic Watch',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200',
    sku: 'WCH-LUX-001',
    inventory: {
      quantity: 8,
      lowStockThreshold: 3,
      isInStock: true,
    },
    attributes: [
      { name: 'Movement', value: 'Automatic' },
      { name: 'Case Material', value: 'Stainless Steel' },
      { name: 'Case Size', value: '42mm' },
      { name: 'Strap', value: 'Leather' },
      { name: 'Water Resistance', value: '100m' },
    ],
    tags: ['watch', 'luxury', 'automatic', 'swiss'],
    rating: 4.9,
    reviewCount: 34,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    discount: 20,
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'prod_6',
    name: 'Sapphire Halo Ring',
    slug: 'sapphire-halo-ring',
    description: 'Stunning sapphire center stone surrounded by diamond halo in 18k white gold. A unique and colorful alternative to traditional diamond rings.',
    shortDescription: 'Sapphire and diamond halo ring',
    price: 3299.99,
    compareAtPrice: 3899.99,
    category: 'Rings',
    categoryId: 'cat_1',
    subcategory: 'Statement Rings',
    images: [
      {
        id: 'img_7',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&c=blue',
        alt: 'Sapphire Halo Ring',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&c=blue',
    sku: 'RNG-STT-002',
    inventory: {
      quantity: 6,
      lowStockThreshold: 3,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '18k White Gold' },
      { name: 'Center Stone', value: 'Sapphire' },
      { name: 'Center Stone Weight', value: '1.2 ct' },
      { name: 'Diamond Weight', value: '0.5 ct' },
    ],
    tags: ['sapphire', 'diamond', 'halo', 'colored'],
    rating: 4.8,
    reviewCount: 23,
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    discount: 15,
    createdAt: '2024-03-05T14:20:00Z',
  },
  {
    id: 'prod_7',
    name: 'Hoops Earrings',
    slug: 'hoop-earrings',
    description: 'Classic 14k gold hoop earrings with secure hinge-back closure. Perfect for everyday wear.',
    shortDescription: '14k gold hoop earrings',
    price: 449.99,
    compareAtPrice: 599.99,
    category: 'Earrings',
    categoryId: 'cat_3',
    subcategory: 'Hoop Earrings',
    images: [
      {
        id: 'img_8',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&c=hoop',
        alt: 'Gold Hoop Earrings',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&c=hoop',
    sku: 'ERR-HOP-001',
    inventory: {
      quantity: 45,
      lowStockThreshold: 15,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: '14k Gold' },
      { name: 'Diameter', value: '25mm' },
      { name: 'Closure', value: 'Hinge-back' },
    ],
    tags: ['gold', 'hoops', 'everyday'],
    rating: 4.6,
    reviewCount: 78,
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    discount: 25,
    createdAt: '2024-02-15T16:30:00Z',
  },
  {
    id: 'prod_8',
    name: 'Silver Charm Bracelet',
    slug: 'silver-charm-bracelet',
    description: 'Sterling silver charm bracelet with initial charms. Customizable with various charm options.',
    shortDescription: 'Personalized silver charm bracelet',
    price: 299.99,
    compareAtPrice: 399.99,
    category: 'Bracelets',
    categoryId: 'cat_4',
    subcategory: 'Charm Bracelets',
    images: [
      {
        id: 'img_9',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&c=silver',
        alt: 'Silver Charm Bracelet',
        isPrimary: true,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&c=silver',
    sku: 'BRC-CHM-001',
    inventory: {
      quantity: 52,
      lowStockThreshold: 20,
      isInStock: true,
    },
    attributes: [
      { name: 'Metal', value: 'Sterling Silver' },
      { name: 'Length', value: '7.5"' },
      { name: 'Charm', value: 'Initial' },
    ],
    tags: ['silver', 'charm', 'personalized'],
    rating: 4.5,
    reviewCount: 67,
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    discount: 25,
    createdAt: '2024-02-20T12:15:00Z',
  },
]

// ============== Mock Orders ==============

export const mockOrders: MockOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'ORD-2024-001',
    userId: 'usr_1',
    status: 'delivered',
    items: [
      {
        productId: 'prod_1',
        name: 'Classic Diamond Engagement Ring',
        price: 4999.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100',
      },
    ],
    subtotal: 4999.99,
    discount: 800.00,
    shipping: 0,
    tax: 336.00,
    total: 4535.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-02-15T10:30:00Z',
  },
  {
    id: 'ord_2',
    orderNumber: 'ORD-2024-002',
    userId: 'usr_2',
    status: 'shipped',
    items: [
      {
        productId: 'prod_2',
        name: 'Pearl Strand Necklace',
        price: 899.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100',
      },
      {
        productId: 'prod_3',
        name: 'Diamond Stud Earrings',
        price: 1299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100',
      },
    ],
    subtotal: 2199.98,
    discount: 440.00,
    shipping: 10.00,
    tax: 140.80,
    total: 1910.78,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90001',
    },
    billingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zipCode: '90001',
    },
    paymentMethod: 'PayPal',
    createdAt: '2024-03-01T14:45:00Z',
  },
  {
    id: 'ord_3',
    orderNumber: 'ORD-2024-003',
    userId: 'usr_4',
    status: 'processing',
    items: [
      {
        productId: 'prod_5',
        name: 'Luxury Automatic Watch',
        price: 3999.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100',
      },
    ],
    subtotal: 3999.99,
    discount: 800.00,
    shipping: 0,
    tax: 256.00,
    total: 3455.99,
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
    },
    billingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zipCode: '60601',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-03-10T09:15:00Z',
  },
]

// ============== Mock Reviews ==============

export const mockReviews: MockReview[] = [
  {
    id: 'rev_1',
    productId: 'prod_1',
    userId: 'usr_1',
    userName: 'John Doe',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 5,
    title: 'Absolutely stunning!',
    content: 'The ring is even more beautiful in person. The diamond is brilliant and the setting is exquisite. My fiancée loves it!',
    verifiedPurchase: true,
    helpful: 24,
    createdAt: '2024-02-20T11:30:00Z',
  },
  {
    id: 'rev_2',
    productId: 'prod_1',
    userId: 'usr_3',
    userName: 'Robert Johnson',
    rating: 4,
    title: 'Beautiful ring, great value',
    content: 'Excellent quality for the price. The diamond is clear and the gold setting is well-crafted. Shipping was fast.',
    verifiedPurchase: true,
    helpful: 12,
    createdAt: '2024-02-25T15:45:00Z',
  },
  {
    id: 'rev_3',
    productId: 'prod_2',
    userId: 'usr_2',
    userName: 'Jane Smith',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 5,
    title: 'Classic elegance',
    content: 'These pearls are gorgeous! Perfect luster and matching. The gold clasp is secure and elegant. Highly recommend!',
    verifiedPurchase: true,
    helpful: 18,
    createdAt: '2024-03-01T09:20:00Z',
  },
  {
    id: 'rev_4',
    productId: 'prod_3',
    userId: 'usr_4',
    userName: 'Emily Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 5,
    title: 'Everyday luxury',
    content: 'These diamond studs are perfect for daily wear. They sparkle beautifully and the setting is secure. Great purchase!',
    verifiedPurchase: true,
    helpful: 15,
    createdAt: '2024-03-05T16:10:00Z',
  },
  {
    id: 'rev_5',
    productId: 'prod_4',
    userId: 'usr_1',
    userName: 'John Doe',
    rating: 5,
    title: 'Stunning bracelet',
    content: 'The tennis bracelet is gorgeous. The diamonds are brilliant and the gold is high quality. Excellent craftsmanship.',
    verifiedPurchase: true,
    helpful: 9,
    createdAt: '2024-03-08T13:25:00Z',
  },
]

// ============== Mock Blog Posts ==============

export const mockBlogPosts: MockBlogPost[] = [
  {
    id: 'blog_1',
    title: 'How to Choose the Perfect Engagement Ring',
    slug: 'how-to-choose-perfect-engagement-ring',
    excerpt: 'A comprehensive guide to selecting the ring that will make your proposal unforgettable.',
    content: 'Choosing an engagement ring is one of the most important decisions you\'ll make. From the 4 Cs of diamonds to metal choices and setting styles, we cover everything you need to know...',
    author: 'Sarah Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    coverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    category: 'Engagement',
    tags: ['engagement', 'diamonds', 'ring guide'],
    readTime: 8,
    publishedAt: '2024-03-01T10:00:00Z',
    featured: true,
  },
  {
    id: 'blog_2',
    title: 'The Ultimate Guide to Pearl Jewelry',
    slug: 'ultimate-guide-pearl-jewelry',
    excerpt: 'Learn about different types of pearls, how to care for them, and how to style pearl jewelry.',
    content: 'Pearls have been treasured for centuries for their natural beauty and elegance. This guide covers everything from freshwater to Akoya pearls, and how to keep them looking their best...',
    author: 'Emily Chen',
    authorAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    category: 'Education',
    tags: ['pearls', 'care guide', 'styling'],
    readTime: 6,
    publishedAt: '2024-03-05T14:30:00Z',
    featured: true,
  },
  {
    id: 'blog_3',
    title: 'Watch Maintenance 101: Keep Your Timepiece Ticking',
    slug: 'watch-maintenance-101',
    excerpt: 'Essential tips for maintaining your luxury watches and ensuring they last for generations.',
    content: 'Whether you own an automatic or quartz watch, proper maintenance is key to longevity. Learn about servicing intervals, storage, and daily care routines...',
    author: 'Michael Zhang',
    authorAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    coverImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    category: 'Watches',
    tags: ['watches', 'maintenance', 'care'],
    readTime: 5,
    publishedAt: '2024-03-08T09:15:00Z',
    featured: false,
  },
]

// ============== Mock Coupons ==============

export const mockCoupons: MockCoupon[] = [
  {
    id: 'coup_1',
    code: 'WELCOME10',
    description: '10% off your first order',
    discount: 10,
    type: 'percentage',
    minOrder: 100,
    maxDiscount: 500,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    usageLimit: 1000,
    usedCount: 245,
  },
  {
    id: 'coup_2',
    code: 'SPRING20',
    description: '20% off spring collection',
    discount: 20,
    type: 'percentage',
    minOrder: 200,
    maxDiscount: 1000,
    validFrom: '2024-03-01T00:00:00Z',
    validUntil: '2024-05-31T23:59:59Z',
    usageLimit: 500,
    usedCount: 78,
  }
]

// ============== Export All Mock