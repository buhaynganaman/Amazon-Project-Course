import { loadProductsFetch } from "../../../data/products.js";

export async function loadApp(callbacks = []) {
  try {
    // First load the products
    await loadProductsFetch();

    // Run all the callbacks, whether they are functions or objects with a callback method
    callbacks.forEach(cb => {
      if (typeof cb === "function") {
        cb(); // normal function
      } else if (typeof cb === "object" && typeof cb.callback === "function") {
        cb.init(); // object with a callback method
      } else {
        console.warn('⚠️ Unknown callback format:', cb);
      }
    });

  } catch (error) {
    console.error("SOMETHING WENT WRONG LOADING THE APP:", error);
  }
}