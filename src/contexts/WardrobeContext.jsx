import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
  wardrobeItems: [],
  selectedItems: [],
  favorites: [],
  outfits: [],
  currentCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
};

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_WARDROBE_ITEMS: 'SET_WARDROBE_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEMS: 'DELETE_ITEMS',
  TOGGLE_SELECTION: 'TOGGLE_SELECTION',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_SEARCH: 'SET_SEARCH',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  SAVE_OUTFIT: 'SAVE_OUTFIT',
  DELETE_OUTFIT: 'DELETE_OUTFIT',
};

// Reducer
function wardrobeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null,
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        selectedItems: [],
        error: null,
      };
    
    case ACTIONS.SET_WARDROBE_ITEMS:
      return { ...state, wardrobeItems: action.payload };
    
    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        wardrobeItems: [...state.wardrobeItems, action.payload],
      };
    
    case ACTIONS.DELETE_ITEMS:
      return {
        ...state,
        wardrobeItems: state.wardrobeItems.filter(
          item => !action.payload.includes(item.id)
        ),
        selectedItems: [],
      };
    
    case ACTIONS.TOGGLE_SELECTION:
      const itemId = action.payload;
      const isSelected = state.selectedItems.includes(itemId);
      return {
        ...state,
        selectedItems: isSelected
          ? state.selectedItems.filter(id => id !== itemId)
          : [...state.selectedItems, itemId],
      };
    
    case ACTIONS.CLEAR_SELECTION:
      return { ...state, selectedItems: [] };
    
    case ACTIONS.SET_CATEGORY:
      return { ...state, currentCategory: action.payload };
    
    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: action.payload };
    
    case ACTIONS.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    
    case ACTIONS.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };
    
    case ACTIONS.SAVE_OUTFIT:
      return {
        ...state,
        outfits: [...state.outfits, action.payload],
        selectedItems: [],
      };
    
    case ACTIONS.DELETE_OUTFIT:
      return {
        ...state,
        outfits: state.outfits.filter(outfit => outfit.id !== action.payload),
      };
    
    default:
      return state;
  }
}

// Create context
const WardrobeContext = createContext();

// Provider component
export function WardrobeProvider({ children }) {
  const [state, dispatch] = useReducer(wardrobeReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedUser = localStorage.getItem('ewardrobe_user');
        const savedItems = localStorage.getItem('ewardrobe_items');
        const savedFavorites = localStorage.getItem('ewardrobe_favorites');
        const savedOutfits = localStorage.getItem('ewardrobe_outfits');

        if (savedUser) {
          dispatch({ type: ACTIONS.LOGIN, payload: savedUser });
        }

        if (savedItems) {
          dispatch({ type: ACTIONS.SET_WARDROBE_ITEMS, payload: JSON.parse(savedItems) });
        } else {
          // Load default items
          const defaultItems = [
            { id: 1, name: 'Blue Denim Shirt', category: 'tops', image: '👔', color: 'blue', brand: 'Levi\'s', size: 'M' },
            { id: 2, name: 'White T-Shirt', category: 'tops', image: '👕', color: 'white', brand: 'Uniqlo', size: 'L' },
            { id: 3, name: 'Black Hoodie', category: 'tops', image: '🧥', color: 'black', brand: 'Nike', size: 'M' },
            { id: 4, name: 'Black Jeans', category: 'bottoms', image: '👖', color: 'black', brand: 'Zara', size: '32' },
            { id: 5, name: 'Blue Shorts', category: 'bottoms', image: '🩳', color: 'blue', brand: 'H&M', size: 'M' },
            { id: 6, name: 'White Sneakers', category: 'shoes', image: '👟', color: 'white', brand: 'Adidas', size: '10' },
            { id: 7, name: 'Brown Boots', category: 'shoes', image: '🥾', color: 'brown', brand: 'Timberland', size: '9' },
            { id: 8, name: 'Watch', category: 'accessories', image: '⌚', color: 'silver', brand: 'Apple', size: 'One Size' },
            { id: 9, name: 'Sunglasses', category: 'accessories', image: '🕶️', color: 'black', brand: 'Ray-Ban', size: 'One Size' },
            { id: 10, name: 'Baseball Cap', category: 'accessories', image: '🧢', color: 'red', brand: 'Nike', size: 'One Size' },
          ];
          dispatch({ type: ACTIONS.SET_WARDROBE_ITEMS, payload: defaultItems });
        }

        if (savedFavorites) {
          dispatch({ type: ACTIONS.SET_FAVORITES, payload: JSON.parse(savedFavorites) });
        }

        if (savedOutfits) {
          dispatch({ type: ACTIONS.SET_OUTFITS, payload: JSON.parse(savedOutfits) });
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load data' });
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (state.wardrobeItems.length > 0) {
      localStorage.setItem('ewardrobe_items', JSON.stringify(state.wardrobeItems));
    }
  }, [state.wardrobeItems]);

  useEffect(() => {
    if (state.favorites.length > 0) {
      localStorage.setItem('ewardrobe_favorites', JSON.stringify(state.favorites));
    }
  }, [state.favorites]);

  useEffect(() => {
    if (state.outfits.length > 0) {
      localStorage.setItem('ewardrobe_outfits', JSON.stringify(state.outfits));
    }
  }, [state.outfits]);

  // Action creators
  const actions = {
    login: (username) => {
      dispatch({ type: ACTIONS.LOGIN, payload: username });
      localStorage.setItem('ewardrobe_user', username);
    },
    
    logout: () => {
      dispatch({ type: ACTIONS.LOGOUT });
      localStorage.removeItem('ewardrobe_user');
    },
    
    addItem: (item) => {
      const newItem = {
        ...item,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: ACTIONS.ADD_ITEM, payload: newItem });
    },
    
    deleteItems: (itemIds) => {
      dispatch({ type: ACTIONS.DELETE_ITEMS, payload: itemIds });
    },
    
    toggleSelection: (itemId) => {
      dispatch({ type: ACTIONS.TOGGLE_SELECTION, payload: itemId });
    },
    
    clearSelection: () => {
      dispatch({ type: ACTIONS.CLEAR_SELECTION });
    },
    
    setCategory: (category) => {
      dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
    },
    
    setSearch: (query) => {
      dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
    },
    
    addToFavorites: (itemId) => {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: itemId });
    },
    
    removeFromFavorites: (itemId) => {
      dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: itemId });
    },
    
    saveOutfit: (outfit) => {
      const newOutfit = {
        ...outfit,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: ACTIONS.SAVE_OUTFIT, payload: newOutfit });
    },
    
    deleteOutfit: (outfitId) => {
      dispatch({ type: ACTIONS.DELETE_OUTFIT, payload: outfitId });
    },
  };

  return (
    <WardrobeContext.Provider value={{ state, actions }}>
      {children}
    </WardrobeContext.Provider>
  );
}

// Custom hook to use the context
export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
}
