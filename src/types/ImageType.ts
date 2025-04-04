import { GetPlaiceholderReturn } from 'plaiceholder'

export type ImageType = GetPlaiceholderReturn & {
  img: {
    id: string
    src: string
  }
}
