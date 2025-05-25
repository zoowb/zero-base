import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const keyword = ref('')
  const category = ref('')
  const maxPrice = ref(null)

  return { keyword, category, maxPrice }
})
