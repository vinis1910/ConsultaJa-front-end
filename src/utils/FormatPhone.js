export const FormatPhone = (phone) => {
    if (!phone) return '';

    const cleaned = phone.toString().replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  };