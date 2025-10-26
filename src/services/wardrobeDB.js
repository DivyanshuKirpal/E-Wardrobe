// Database service for wardrobe management
class WardrobeDB {
  constructor() {
    this.data = null;
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('/src/data/wardrobe.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading wardrobe data:', error);
      // Fallback to default data
      this.data = {
        users: [],
        categories: ["upper", "lower", "bottom", "accessories"]
      };
    }
  }

  // User operations
  getUserByUsername(username) {
    return this.data?.users?.find(user => user.username === username) || null;
  }

  createUser(username, email) {
    const newUser = {
      id: Date.now(),
      username,
      email,
      wardrobe: {
        upper: [],
        lower: [],
        bottom: [],
        accessories: []
      },
      outfits: [],
      favorites: []
    };
    
    if (!this.data.users) {
      this.data.users = [];
    }
    this.data.users.push(newUser);
    this.saveData();
    return newUser;
  }

  // Wardrobe operations
  addItemToWardrobe(username, category, itemData) {
    const user = this.getUserByUsername(username);
    if (!user) return null;

    const newItem = {
      id: Date.now(),
      name: itemData.name || `Item ${category} ${user.wardrobe[category].length + 1}`,
      image: itemData.image || null,
      category,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    user.wardrobe[category].push(newItem);
    this.saveData();
    return newItem;
  }

  getWardrobeItems(username, category) {
    const user = this.getUserByUsername(username);
    return user?.wardrobe[category] || [];
  }

  removeItemFromWardrobe(username, category, itemId) {
    const user = this.getUserByUsername(username);
    if (!user) return false;

    const itemIndex = user.wardrobe[category].findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      user.wardrobe[category].splice(itemIndex, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Outfit operations
  createOutfit(username, outfitData) {
    const user = this.getUserByUsername(username);
    if (!user) return null;

    const newOutfit = {
      id: Date.now(),
      name: outfitData.name,
      items: outfitData.items || [],
      dateCreated: new Date().toISOString().split('T')[0]
    };

    user.outfits.push(newOutfit);
    this.saveData();
    return newOutfit;
  }

  getOutfits(username) {
    const user = this.getUserByUsername(username);
    return user?.outfits || [];
  }

  // Favorites operations
  toggleFavorite(username, itemId) {
    const user = this.getUserByUsername(username);
    if (!user) return false;

    const favoriteIndex = user.favorites.indexOf(itemId);
    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
    } else {
      user.favorites.push(itemId);
    }
    this.saveData();
    return true;
  }

  getFavorites(username) {
    const user = this.getUserByUsername(username);
    if (!user) return [];

    // Get all favorite items from all categories
    const allItems = [];
    Object.values(user.wardrobe).forEach(categoryItems => {
      allItems.push(...categoryItems);
    });

    return allItems.filter(item => user.favorites.includes(item.id));
  }

  // Statistics
  getWardrobeStats(username) {
    const user = this.getUserByUsername(username);
    if (!user) return null;

    const stats = {
      totalItems: 0,
      outfitsCreated: user.outfits.length,
      favorites: user.favorites.length,
      categories: {}
    };

    Object.keys(user.wardrobe).forEach(category => {
      const count = user.wardrobe[category].length;
      stats.categories[category] = count;
      stats.totalItems += count;
    });

    return stats;
  }

  // Save data (in a real app, this would be an API call)
  saveData() {
    // In a real application, this would make an API call to save data
    // For now, we'll just log that data would be saved
    console.log('Data would be saved:', this.data);
    
    // Store in localStorage as a fallback
    try {
      localStorage.setItem('wardrobe-data', JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Load from localStorage on initialization
  loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('wardrobe-data');
      if (savedData) {
        this.data = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}

// Create a singleton instance
const wardrobeDB = new WardrobeDB();

export default wardrobeDB;
