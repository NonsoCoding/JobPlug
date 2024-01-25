// export function formatMoney(number) {
//     const parts = number.toFixed(2).toString().split('.');
//     const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return  integerPart + '.' + parts[1];
// }
export function formatMoney(number) {
    // Check if 'number' is a valid number
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Invalid number';
    }
  
    // Continue with formatting if 'number' is valid
    const parts = number.toFixed(2).toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return  integerPart + '.' + parts[1];
  }