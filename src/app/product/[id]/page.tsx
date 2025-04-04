import { FC } from 'react'

import fs from 'node:fs/promises'
import { Article } from '@/components/product/Article'
import { products } from '@/data'
import { ImageType } from '@/types/ImageType'
import Image from 'next/image'
import Link from 'next/link'
import { getPlaiceholder } from 'plaiceholder'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'

const getImages = async (): Promise<ImageType[]> => {
  return Promise.all(
    products[0].images.map(async (image) => {
      const src = `public/assets/${image}`
      const buffer = await fs.readFile(src)

      const { ...plaiceholder } = await getPlaiceholder(buffer)

      return { ...plaiceholder, img: { id: uuidv4(), src: `/assets/${image}` } }
    }),
  )
}

type ProductPageProps = Readonly<{ params: { id: string } }>

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const images = await getImages()

  return (
    <main className="w-full outline-none max-w-7xl my-0 mx-auto pt-10 px-9 pb-16">
      <ul className="p-0 mb-8 flex gap-2 items-center">
        <li className="inline text-sm font-normal">
          <span>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              ホーム
            </Link>
          </span>
        </li>
        <IoIosArrowForward className="my-0 mx-0.5 text-slate-500" />
        <li className="inline text-sm font-normal">
          <span>
            <Link
              href="/category"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {products[0].category}
            </Link>
          </span>
        </li>
        <IoIosArrowForward className="my-0 mx-0.5 text-slate-500" />
        <li className="inline text-sm font-normal">
          <span>
            <Link
              href={`/product/${params.id}`}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {products[0].name}
            </Link>
          </span>
        </li>
      </ul>
      <article className="mb-6">
        <Article images={images} />
      </article>
    </main>
  )
}

export default ProductPage
