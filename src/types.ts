import { ReactNode } from 'react'

export interface KDrama {
  rating: ReactNode
  id: string
  title: string
  image: string
  year: number
  genres: string[]
}
