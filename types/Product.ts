export interface Product {
  id: number
  status: 'active' | 'inactive' | 'draft'
  date_created: string
  name: string
  category: string
  price: number
  stock: number
}
