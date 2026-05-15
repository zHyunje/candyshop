import { faker } from '@faker-js/faker'
faker.seed(123)

import Bolos from '@/assets/doces/bolos_e_tortas.png'
import Brigadeiro from '@/assets/doces/brigadeiro.png'
import Cafes from '@/assets/doces/cafés.png'
import Caixas from '@/assets/doces/caixas.png'
import Chocolates from '@/assets/doces/chocolates.png'
import Cookies from '@/assets/doces/cookies.png'
import DocesGourmet from '@/assets/doces/doces_gourmet.png'
import Salgados from '@/assets/doces/salgados.png'

import {
  brigadeiros,
  docesChocolate,
  docesGourmet,
  salgados,
  cookies,
  bolos,
  bebidas,
  caixas,
} from './static/prodData'

const imagens = [
  'https://images.unsplash.com/photo-1519869325930-281384150729',
  'https://images.unsplash.com/photo-1511381939415-e44015466834',
  'https://images.unsplash.com/photo-1519676867240-f03562e64548',
  'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a',
  'https://images.unsplash.com/photo-1488477181946-6428a0291777',
]

export type Items = {
  id: string
  name: string
  description: string
  price: number
  rating: number
  stock: number
  image: string
}

const generateProducts = (items: string[], category: string) => {
  return items.map(() => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(items),
    description: faker.commerce.productDescription(),

    price: Number(
      faker.commerce.price({
        min: 6,
        max: 75,
      }),
    ),

    rating: faker.number.float({
      min: 3.5,
      max: 5,
      fractionDigits: 1,
    }),

    stock: faker.number.int({
      min: 0,
      max: 100,
    }),

    image: `${faker.helpers.arrayElement(imagens)}?w=600&auto=format&fit=crop&q=80`,
  }))
}

export const productsByCategory = [
  {
    title: 'Brigadeiros',
    image: Brigadeiro,
    products: generateProducts(brigadeiros, 'brigadeiros'),
  },

  {
    title: 'Doces Gourmet',
    image: DocesGourmet,
    products: generateProducts(docesGourmet, 'doces-gourmet'),
  },

  {
    title: 'Salgados',
    image: Salgados,
    products: generateProducts(salgados, 'salgados'),
  },

  {
    title: 'Doces de Chocolate',
    image: Chocolates,
    products: generateProducts(docesChocolate, 'doces-chocolate'),
  },

  {
    title: 'Cookies',
    image: Cookies,
    products: generateProducts(cookies, 'cookies'),
  },

  {
    title: 'Bolos e Tortas',
    image: Bolos,
    products: generateProducts(bolos, 'bolos-e-tortas'),
  },

  {
    title: 'Bebidas',
    image: Cafes,
    products: generateProducts(bebidas, 'bebidas'),
  },

  {
    title: 'Caixas Especiais',
    image: Caixas,
    products: generateProducts(caixas, 'caixas-especiais'),
  },
]
