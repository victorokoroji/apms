export const formatPrice = (price: number) => {
  try {
    const formattedNumber = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 0,
    }).format(price);
    return `₦${formattedNumber}`;
  } catch {
    return `₦${Number(price).toLocaleString()}`;
  }
};

export const formatPriceWithSuffix = (price: number) => {
  let displayValue: number;
  let suffix: string;

  if (price >= 1_000_000) {
    // Millions
    displayValue = price / 1_000_000;
    suffix = 'M';
  } else if (price >= 1_000) {
    // Thousands
    displayValue = price / 1_000;
    suffix = 'k';
  } else {
    // Less than 1000
    displayValue = price;
    suffix = '';
  }

  // Round to 1 decimal place, then check if it's a whole number
  const rounded = Math.round(displayValue * 10) / 10;
  const decimals = rounded % 1 === 0 ? 0 : 1;

  // Format number with commas and add Naira symbol
  try {
    const formattedNumber = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(rounded);

    return `₦${formattedNumber}${suffix}`;
  } catch {
    return `₦${rounded.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  }
};
// Helper function to format price with commas
export const formatPrice1 = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return numericPrice.toLocaleString();
};

// Helper function to remove formatting from price (for form submission)
export const unformatPrice = (formattedPrice: string): string => {
  return formattedPrice.replace(/,/g, '');
};
