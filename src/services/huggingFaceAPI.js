// src/services/huggingFaceAPI.js
const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

class HuggingFaceAPI {
  
  static MODELS = {
    REMOVE_BG: "briaai/RMBG-1.4",
    CARTOONIZE: "google/ddpm-cifar10-32", 
  };

  // Remove background from image
  static async removeBackground(imageFile) {
    const API_URL = `https://api-inference.huggingface.co/models/${this.MODELS.REMOVE_BG}`;
    
    console.log("🎨 Starting background removal...");
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_KEY}`,
        },
        body: imageFile
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      console.log("✅ Background removed successfully!");
      return imageUrl;
    } catch (error) {
      console.error("❌ Background removal failed:", error);
      throw error;
    }
  }

  // Transform to cartoon style
  static async transformToCartoon(imageFile) {
    console.log("🎨 Cartoon transformation not fully supported yet");
    console.log("📸 Returning original image for now");
    
    // For now, return the original image as a URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(imageFile);
    });
  }

  // Transform to anime style  
  static async transformToAnime(imageFile) {
    console.log("🎨 Anime transformation not fully supported yet");
    console.log("📸 Returning original image for now");
    
    // For now, return the original image as a URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(imageFile);
    });
  }
}

export default HuggingFaceAPI;
