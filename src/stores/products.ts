import { defineStore } from 'pinia'
import axios from 'redaxios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    vendors: [],
    categories: [],
    cart: [],
    filters: [],
  }),
  persist: true,

  actions: {
    async getProducts(filter: string = '?limit=0') {
      // somehow the params object wont work in this version?
      await axios
        .get(`https://dummyjson.com/product${filter}`)
        .then((response: { data: string }) => {
          const data = JSON.parse(response.data)
          this.products = data.products
          // console.log(this.products.length)
        })
        .catch((error: unknown) => {
          console.log(error)
        })
    },

    getVendors() {
      axios
        .get('https://dummyjson.com/users?limit=0', {
          params: {
            limit: 0,
          },
        })
        .then((response: { data: string }) => {
          const data = JSON.parse(response.data)
          this.vendors = data.users
        })
        .catch((error: unknown) => {
          console.log(error)
        })
    },

    async getCategory(url: string) {
      await axios
        .get(url, {
          params: {
            limit: 0,
          },
        })
        .then((response: { data: string }) => {
          const json = JSON.parse(response.data)
          this.products = json.products
        })
        .catch((error: unknown) => {
          console.log(error)
        })
    },

    getProductCategories() {
      axios
        .get('https://dummyjson.com/products/categories')
        .then((response: { data: string }) => {
          const data = JSON.parse(response.data)
          this.categories = data
        })
        .catch((error: unknown) => {
          console.log(error)
        })
    },

    addToCart(productId: number, amount: number) {
      const index = this.cart.findIndex((item) => item.id === productId)
      // product already in the cart => update amount
      if (index >= 0) {
        const oldAmount = this.cart[index].amount
        console.log('old', oldAmount)

        this.cart[index] = { id: productId, amount: oldAmount + amount }
        return
      }

      this.cart.push({ id: productId, amount })
    },

    updateCart(productId: number, amount: number) {
      console.log('updateCart', productId, amount)

      const index = this.cart.findIndex((item) => item.id === productId)
      this.cart[index] = { id: productId, amount }
    },

    clearCart() {
      this.cart = []
    },

    setFilter(filterName: string, value: string | number | number[]) {
      this.filters[filterName] = value
    },

    clearFilter(filterName?: string) {
      if (filterName) {
        delete this.filters[filterName]
        return
      }
      this.filters = []
    },
  },
})
