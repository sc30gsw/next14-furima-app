import { FC } from 'react'

import { Product } from '@/components/product/Product'
import { Product as ProductType } from '@/types/Product'
import { tv } from 'tailwind-variants'
import { v4 as uuidv4 } from 'uuid'

const products = [
  {
    id: uuidv4(),
    price: 500,
    images: ['kids-socks.jpeg'],
    name: '子供用靴下',
    description: '商品説明です。',
    category: 'ベビー・キッズ',
    size: '11cm',
    color: 'ピンク',
    status: '目立った傷や汚れなし',
    shippingCharges: '送料込み(出品者負担)',
    region: '沖縄県',
    shippingDate: '2〜3日で発送',
    isSoldOut: false,
  },
  {
    id: uuidv4(),
    price: 99999999,
    images: ['mens-cloth.jpeg'],
    name: '白紺ボーダーニット',
    description: '商品説明です。',
    category: 'メンズ',
    size: 'M',
    color: '紺',
    status: '目立った傷や汚れなし',
    shippingCharges: '送料込み(出品者負担)',
    region: '埼玉県',
    shippingDate: '2〜3日で発送',
    isSoldOut: true,
  },
  {
    id: uuidv4(),
    price: 100000,
    images: ['nike.jpeg'],
    name: 'NIKE スニーカー',
    description: '商品説明です。',
    category: 'メンズ',
    size: '26.5cm',
    color: '白',
    status: '未使用に近い',
    shippingCharges: '着払い(購入者負担)',
    region: '北海道',
    shippingDate: '1〜2日で発送',
    isSoldOut: false,
  },
] as const satisfies ProductType[]

const homeStyles = tv(
  {
    slots: {
      base: 'min-h-dvh',
      container: 'max-w-7xl my-0 mx-auto px-9 pt-10 pb-16',
      headingWrapper:
        'flex items-end gap-4 mb-4 text-left text-xl font-bold text-gray-400',
      minorHeadingWrapper: 'p-0',
      heading: 'm-0 p-0',
      contents: 'grid',
    },
    compoundSlots: [
      { slots: ['container', 'minorHeadingWrapper'], class: 'w-full' },
    ],
    variants: {
      grid: {
        sm: {
          contents: 'grid-cols-3 gap-3',
        },
        md: {
          contents: 'grid-cols-5 gap-6',
        },
        default: {
          contents: 'grid-cols-1 gap-0.5',
        },
      },
    },
  },
  { responsiveVariants: ['sm', 'md'] },
)

type HomeProps = Readonly<{
  searchParams: Readonly<Record<'keyword', string | undefined>>
}>

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const {
    base,
    container,
    headingWrapper,
    minorHeadingWrapper,
    heading,
    contents,
  } = homeStyles({ grid: { initial: 'default', md: 'md', sm: 'sm' } })

  return (
    <div className={base()}>
      <main className={container()}>
        <div>
          <section>
            <div className={headingWrapper()}>
              <div className={minorHeadingWrapper()}>
                <h2 className={heading()}>商品一覧</h2>
              </div>
            </div>
            <section>
              <div>
                <ul className={contents()}>
                  {products.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </ul>
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
