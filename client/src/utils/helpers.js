// Format Date (e.g., "12 Oct 2024")
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format Relative Time (e.g., "2 days ago")
export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Map company name to local high-res vector logo
const KNOWN_COMPANY_LOGOS = {
  flipkart: '/logos/flipkart.svg',
  swiggy: '/logos/swiggy.svg',
  tcs: '/logos/tcs.svg',
  tata: '/logos/tcs.svg',
  google: '/logos/google.svg',
  microsoft: '/logos/microsoft.svg',
  amazon: '/logos/amazon.svg',
  zomato: '/logos/zomato.svg',
  razorpay: '/logos/razorpay.svg',
  infosys: '/logos/infosys.svg',
  accenture: '/logos/accenture.svg',
  wipro: '/logos/wipro.svg',
  'tech mahindra': '/logos/techmahindra.svg',
};

export const getCompanyLogo = (logo, companyName = '') => {
  const normalized = (companyName || '').toLowerCase();
  
  for (const [key, path] of Object.entries(KNOWN_COMPANY_LOGOS)) {
    if (normalized.includes(key)) {
      return path;
    }
  }

  if (logo && typeof logo === 'string' && logo.trim()) {
    // If it's a broken Wikimedia link that blocked hotlinking, use fallback
    if (logo.includes('wikimedia.org') && (normalized.includes('flipkart') || normalized.includes('swiggy') || normalized.includes('tcs'))) {
      if (normalized.includes('flipkart')) return '/logos/flipkart.svg';
      if (normalized.includes('swiggy')) return '/logos/swiggy.svg';
      if (normalized.includes('tcs') || normalized.includes('tata')) return '/logos/tcs.svg';
    }
    return logo;
  }

  return '/logos/flipkart.svg';
};

