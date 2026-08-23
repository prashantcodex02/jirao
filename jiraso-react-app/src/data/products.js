export const productsData = [
  {
    id: 'mustard',
    category: 'cooking',
    bg: '#1B4332',
    name: 'Black Mustard oil',
    fullName: 'Wood Pressed Black Mustard Oil',
    tagline: 'Asli kachi ghani kali sarson ka tel — Bold, pungent & deeply traditional.',
    priceHeader: '₹399',
    badge: 'Best Seller',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/mustard.png?_a=BAMCr6WO0',
    sizeLabel: '1 L',
    skus: [
      { size: '500 ml', price: 219, dataPrice: '219', selected: false },
      { size: '1 L', price: 399, dataPrice: '399', selected: true }
    ],
    ingredients: [
      'Mustard Seeds', 'Natural Omega-3', 'Vitamin E', 'Antioxidants'
    ],
    outOfStock: false,
    link: '/products/mustard',
    cartDesc: 'Bold, pungent wood-pressed black mustard for authentic Indian cooking.',
    delay: 1,
  },
  {
    id: 'sesame',
    category: 'wellness',
    bg: '#E8E4D9',
    name: 'Sesame Oil',
    fullName: 'Wood Pressed Sesame Oil',
    tagline: 'Pure, nutty aroma — deeply nourishing for South Indian delicacies and holistic wellness.',
    priceHeader: 'Sold Out',
    badge: 'Popular',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/sesame.png?_a=BAMCr6WO0',
    sizeLabel: '1 L',
    skus: [
      { size: '500 ml', price: 249, dataPrice: '249', selected: false },
      { size: '1 L', price: 450, dataPrice: '450', selected: true }
    ],
    ingredients: [
      'Sesame Seeds', 'Calcium', 'Iron', 'Sesamin'
    ],
    outOfStock: true,
    link: '/products/sesame',
    cartDesc: 'Rich aroma ideal for South Indian & wellness cooking.',
    headerTextColor: 'var(--color-navy)',
    delay: 2,
  },
  {
    id: 'coconut',
    category: 'tropical',
    bg: '#AEC6CF',
    name: 'Coconut Oil',
    fullName: 'Wood Pressed Coconut Oil',
    tagline: 'Cold-extracted tropical goodness — light, aromatic, and perfect for skin, hair, and cooking.',
    priceHeader: 'Sold Out',
    badge: 'Popular',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/coconut.png?_a=BAMCr6WO0',
    sizeLabel: '1 L',
    skus: [
      { size: '500 ml', price: 199, dataPrice: '199', selected: false },
      { size: '1 L', price: 320, dataPrice: '320', selected: true }
    ],
    ingredients: [
      'Coconuts', 'Lauric Acid', 'MCTs'
    ],
    outOfStock: true,
    link: '/products/coconut',
    cartDesc: 'Pure tropical oil for cooking, skin and holistic health.',
    headerTextColor: 'var(--color-navy)',
    delay: 3,
  },
  {
    id: 'groundnut',
    category: 'cooking',
    bg: '#8B3A3A',
    name: 'Groundnut Oil',
    fullName: 'Wood Pressed Groundnut Oil',
    tagline: 'Versatile and golden — the perfect companion for everyday deep frying and sautéing.',
    priceHeader: 'Sold Out',
    badge: 'Popular',
    img: 'https://res.cloudinary.com/dphinzmi/image/upload/f_auto,q_auto/v1/jiraso_assets/groundnut.png?_a=BAMCr6WO0',
    sizeLabel: '1 L',
    skus: [
      { size: '500 ml', price: 179, dataPrice: '179', selected: false },
      { size: '1 L', price: 280, dataPrice: '280', selected: true }
    ],
    ingredients: [
      'Peanuts', 'Vitamin A', 'Vitamin E'
    ],
    outOfStock: true,
    link: '/products/groundnut',
    cartDesc: 'Light, versatile oil for everyday home cooking.',
    delay: 4,
  }
];
