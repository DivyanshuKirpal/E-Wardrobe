import { CATEGORY_EMOJIS } from './constants';

export const getCategoryEmoji = (category) => {
  return CATEGORY_EMOJIS[category] || '👔';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const filterItems = (items, category, searchQuery) => {
  return items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.color?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const sortItems = (items, sortBy) => {
  const sortedItems = [...items];
  
  switch (sortBy) {
    case 'name':
      return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    case 'brand':
      return sortedItems.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
    case 'date':
      return sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'category':
      return sortedItems.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sortedItems;
  }
};
