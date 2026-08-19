/* ═══════════════════════════════════════════════════
   ZENXONE — data.js
   Dynamic Product Data from API
   ═══════════════════════════════════════════════════ */

'use strict';

let PRODUCTS = [];

const API_BASE_URL = 'https://api.zenxone.com';
const API_LIST_URL = 'https://api.zenxone.com/api/ecom/products/';

/**
 * Fetch all products and their details to populate the PRODUCTS array
 */
async function fetchProducts() {
  try {
    // 1. Fetch product list
    const listRes = await fetch(API_LIST_URL);
    if (!listRes.ok) throw new Error('Failed to fetch product list');
    const listData = await listRes.json();

    // The list data might be in listData.results.data or listData.data
    const productsData = listData.results?.data || listData.data || [];

    // 2. Fetch full details for each product (to get variants & sizes)
    const detailPromises = productsData.map(async p => {
      try {
        const detailRes = await fetch(`${API_LIST_URL}${p.slug}/`);
        if (!detailRes.ok) throw new Error(`Failed to fetch details for ${p.slug}`);
        const detailData = await detailRes.json();
        const productDetail = detailData.data || detailData;
        return transformProductData(productDetail);
      } catch (err) {
        console.error(err);
        return null;
      }
    });

    // 3. Wait for all product details and filter out any failed ones
    const detailedProducts = await Promise.all(detailPromises);
    PRODUCTS = detailedProducts.filter(p => p !== null);

  } catch (err) {
    console.error('Error in fetchProducts:', err);
    PRODUCTS = [];
  }
}

/**
 * Transform the raw API product data into the format expected by the frontend
 */
function transformProductData(apiData) {
  // Fix image URLs if they are relative paths
  const rawImages = apiData.images && apiData.images.length > 0
    ? apiData.images
    : [apiData.image];

  const images = rawImages.map(img => {
    if (!img) return '';
    return img.startsWith('/') ? `${API_BASE_URL}${img}` : img;
  }).filter(Boolean);

  // Extract sizes from variants
  let sizes = [];
  if (apiData.variants && apiData.variants.length > 0) {
    sizes = apiData.variants
      .map(v => v.attributes?.size)
      .filter(Boolean);

    // Remove duplicates just in case
    sizes = [...new Set(sizes)];
  }

  // Fallback if no sizes are found
  if (sizes.length === 0) {
    sizes = ['One Size'];
  }

  // Price calculations
  const originalPrice = apiData.price || 0;
  const salePrice = apiData.discount_price || originalPrice;

  // Calculate discount percentage
  let discountStr = '';
  if (originalPrice > salePrice && originalPrice > 0) {
    const pct = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    discountStr = `${pct}%`;
  }

  // Create a default color since API variants don't provide color (based on user request context)
  const colors = [
    { name: 'Default', hex: '#0d0d0d' }
  ];

  return {
    id: apiData.id,
    slug: apiData.slug,
    name: apiData.name,
    badge: apiData.is_bestseller ? 'Best Seller' : '',
    description: apiData.description || apiData.name,
    features: apiData.features || [],
    rating: apiData.rating || 5.0,
    reviews: apiData.review_count || 0,
    faqs: apiData.faqs || [],
    reviewsList: apiData.reviews || [],
    colors: colors,
    sizes: sizes,
    originalPrice: originalPrice,
    salePrice: salePrice,
    discount: discountStr,
    images: images
  };
}
