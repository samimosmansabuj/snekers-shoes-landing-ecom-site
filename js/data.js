/* ═══════════════════════════════════════════════════
   ZENXONE — data.js
   Mock Product Data
   পরে API থেকে fetch করতে চাইলে এই ফাইলটি replace করুন
   অথবা products.js এ fetchProducts() function যোগ করুন
   ═══════════════════════════════════════════════════ */

'use strict';

const PRODUCTS = [
  {
    id: 1,
    name: 'Aether Low',
    badge: 'Best Seller',
    description: 'A minimalist low-top silhouette crafted from full-grain Italian leather with a cloud-cushion sole.',
    features: [
      'Full-grain Italian leather upper',
      'Memory foam insole',
      'Rubber lug outsole',
      'Hand-stitched welt construction',
    ],
    rating: 4.9,
    reviews: 312,
    colors: [
      { name: 'Midnight', hex: '#1a1a2e' },
      { name: 'Ivory',    hex: '#f0ece0' },
      { name: 'Cognac',   hex: '#8b4513' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 8500,
    salePrice: 6800,
    discount: '20%',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
  },
  {
    id: 2,
    name: 'Meridian Runner',
    badge: 'New Arrival',
    description: 'A technical runner reimagined for everyday life. Engineered mesh upper meets an ultra-responsive foam platform.',
    features: [
      'Engineered mesh upper',
      'Ultra-light responsive foam',
      'Padded ankle collar',
      'Reflective details',
    ],
    rating: 4.7,
    reviews: 198,
    colors: [
      { name: 'Navy',  hex: '#0b1120' },
      { name: 'Slate', hex: '#708090' },
      { name: 'Chalk', hex: '#e8e4da' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 7200,
    salePrice: 5900,
    discount: '18%',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
    ],
  },
  {
    id: 3,
    name: 'Veld Chelsea',
    badge: 'Limited Edition',
    description: 'An elevated Chelsea boot with elastic side panels and a sleek pointed toe — the definition of effortless luxury.',
    features: [
      'Suede leather upper',
      'Elastic gore panels',
      'Leather lining',
      'Stacked heel construction',
    ],
    rating: 4.8,
    reviews: 145,
    colors: [
      { name: 'Black', hex: '#0d0d0d' },
      { name: 'Mocha', hex: '#6b4226' },
      { name: 'Sand',  hex: '#c4a882' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 11000,
    salePrice: 8900,
    discount: '19%',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=80',
    ],
  },
  {
    id: 4,
    name: 'Solstice Slip',
    badge: 'New Arrival',
    description: 'Effortless entry, premium feel. A slip-on mule sculpted from nappa leather with a featherweight platform.',
    features: [
      'Nappa leather upper',
      'Elasticated back strap',
      'EVA platform sole',
      'Leather footbed',
    ],
    rating: 4.6,
    reviews: 87,
    colors: [
      { name: 'White', hex: '#f5f5f0' },
      { name: 'Blush', hex: '#e8b4a0' },
      { name: 'Ebony', hex: '#2c2c2c' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 6500,
    salePrice: 5200,
    discount: '20%',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
    ],
  },
  {
    id: 5,
    name: 'Obsidian High',
    badge: 'New Arrival',
    description: 'A high-top statement piece built for the bold. Full-grain leather meets contrast stitching for a look that commands attention.',
    features: [
      'Full-grain leather upper',
      'Contrast stitching detail',
      'Cushioned leather insole',
      'Vulcanized rubber sole',
    ],
    rating: 4.5,
    reviews: 64,
    colors: [
      { name: 'Black', hex: '#0d0d0d' },
      { name: 'White', hex: '#f5f5f0' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 9500,
    salePrice: 7600,
    discount: '20%',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
      'https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
    ],
  },
  {
    id: 6,
    name: 'Dune Derby',
    badge: 'Best Seller',
    description: 'Classic Derby silhouette reimagined with a contemporary sole. Perfect from boardroom to evening.',
    features: [
      'Vegetable-tanned leather',
      'Brogue detailing',
      'Cork-cushioned insole',
      'Leather-wrapped heel',
    ],
    rating: 4.8,
    reviews: 221,
    colors: [
      { name: 'Tan',   hex: '#c4a882' },
      { name: 'Black', hex: '#0d0d0d' },
      { name: 'Wine',  hex: '#722f37' },
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    originalPrice: 10200,
    salePrice: 7999,
    discount: '22%',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
      'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800&q=80',
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    ],
  },
];
