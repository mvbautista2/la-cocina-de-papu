import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { API_URL, CART } from "../utils/constants";

export async function getProductCartApi() {
  try {
    const cart = await AsyncStorage.getItem(CART);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch (error) {
    return null;
  }
}

export async function addProductCartApi(slug, quantity) {
  try {
    const cart = await getProductCartApi();
    if (!cart) throw "Error al obtener el carrito";

    if (size(cart) === 0) {
      cart.push({
        slug,
        quantity,
      });
    } else {
      let found = false;
      map(cart, (product) => {
        if (product.slug === slug) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          slug,
          quantity,
        });
      }
    }
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteProductCartApi(slug) {
  try {
    const cart = await getProductCartApi();
    const newCart = filter(cart, (product) => {
      return product.slug !== slug;
    });
    await AsyncStorage.setItem(CART, JSON.stringify(newCart));
    return true;
  } catch (error) {
    return null;
  }
}

export async function increaseProductCartApi(slug) {
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.slug === slug) {
        return (product.quantity += 1);
      }
    });
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {}
}

export async function decreaseProductCartApi(slug) {
  let isDelete = false;

  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.slug === slug) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });
    if (isDelete) {
      await deleteProductCartApi(slug);
    } else {
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
    }
    return true;
  } catch (error) {
    return null;
  }
}

export async function paymentCartApi(auth, tokenStripe, products, address) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;

    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        tokenStripe,
        products,
        idUser: auth.idUser,
        addressShipping,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function deleteCartApi() {
  try {
    await AsyncStorage.removeItem(CART);
    return true;
  } catch (error) {
    return null;
  }
}
