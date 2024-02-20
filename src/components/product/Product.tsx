import { FC } from 'react'

import fs from 'node:fs/promises'
import { Product as ProductType } from '@/types/Product'
import Image from 'next/image'
import Link from 'next/link'
import { getPlaiceholder } from 'plaiceholder'
import { tv } from 'tailwind-variants'

const productStyles = tv({
  slots: {
    base: '',
    link: '',
    thumbnailWrapper: 'h-48 relative',
    thumbnail: 'rounded object-contain bg-slate-800',
    soldOut:
      'w-0 h-0 border-solid border-t-0 border-r-0 border-b-[70px] border-l-[70px] border-t-transparent border-r-transparent border-b-transparent border-l-red-500',
    soldOutText: 'top-9 right-7 -rotate-45 origin-top-left',
    priceWrapper: 'flex justify-end',
    priceContents:
      'items-baseline my-2 px-0.5 py-2 bg-gray-600 opacity-80 rounded-r-[30px] whitespace-nowrap text-xl break-all',
    priceIcon: 'ml-1',
    price: 'ml-2',
    productName: 'h-[392.px] mt-2 break-words',
  },
  compoundSlots: [
    { slots: ['base', 'link', 'thumbnail', 'priceWrapper'], class: 'h-full' },
    {
      slots: ['link', 'thumbnailWrapper', 'thumbnail', 'priceWrapper'],
      class: 'w-full',
    },
    { slots: ['link', 'priceWrapper'], class: 'flex-col' },
    { slots: ['soldOut', 'soldOutText', 'priceWrapper'], class: 'absolute' },
    { slots: ['soldOut', 'priceWrapper'], class: 'top-0 left-0' },
    { slots: ['soldOutText', 'priceContents'], class: 'text-white font-bold' },
    { slots: ['soldOutText', 'productName'], class: 'text-sm' },
    { slots: ['link', 'priceContents'], class: 'inline-flex' },
    {
      slots: ['priceContents', 'productName'],
      class: 'overflow-hidden text-ellipsis',
    },
  ],
})

type ProductProps = Readonly<{ product: ProductType }>

export const Product: FC<ProductProps> = async ({ product }) => {
  const {
    base,
    link,
    thumbnailWrapper,
    thumbnail,
    soldOut,
    soldOutText,
    priceWrapper,
    priceContents,
    priceIcon,
    price,
    productName,
  } = productStyles()

  const file = await fs.readFile(`public/assets/${product.images[0]}`)
  const { base64 } = await getPlaiceholder(file)

  return (
    <li className={base()}>
      <div>
        <Link href={`/product${product.id}`} className={link()}>
          <div className={thumbnailWrapper()}>
            <Image
              src={`/assets/${product.images[0]}`}
              alt="items_thumbnail"
              fill={true}
              placeholder="blur"
              blurDataURL={base64}
              className={thumbnail()}
            />
            {product.isSoldOut && (
              <div className={soldOut()}>
                <span className={soldOutText()}>SOLD</span>
              </div>
            )}
            <div className={priceWrapper()}>
              <span className={priceContents()}>
                <span className={priceIcon()}>¥</span>
                <span className={price()}>
                  {new Intl.NumberFormat('ja-JP').format(product.price)}
                </span>
              </span>
            </div>
          </div>
          <span className={productName()}>{product.name}</span>
        </Link>
      </div>
    </li>
  )
}
