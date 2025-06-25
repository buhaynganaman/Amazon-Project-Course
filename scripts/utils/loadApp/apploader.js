import { loadProductsFetch } from "../../../data/products.js";

export async function loadApp(callbacks = []) {
  try {
    // First load the products
    await loadProductsFetch();

    // Then run all the callback functions
    callbacks.forEach(cb => {
      if (typeof cb === "function") {
        cb();
      }
    });
  } catch (error) {
    console.error("Something went wrong loading the app:", error);
  }
}
