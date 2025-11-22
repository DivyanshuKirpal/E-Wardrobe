// src/services/cartoonAPI.js
// Replaces HuggingFace API with OpenCV backend

const cartoonAPI = {
  /**
   * Transform image to cartoon style using OpenCV backend
   * @param {File} file - Image file to cartoonize
   * @returns {Promise<string>} - Data URL of cartoonized image
   */
  async transformToCartoon(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5001/api/cartoonize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ msg: 'Cartoonization failed' }));
        throw new Error(error.msg || 'Failed to cartoonize image');
      }

      // Convert response blob to data URL
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Cartoon API error:', error);
      throw error;
    }
  },

  /**
   * Check if cartoonization service is available
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const response = await fetch('http://localhost:5001/api/health', {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
};

export default cartoonAPI;
