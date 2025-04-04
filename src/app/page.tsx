import { FC } from 'react'

import { Product } from '@/components/product/Product'
import { products } from '@/data'
import { tv } from 'tailwind-variants'

const homeStyles = tv(
  {
    slots: {
      base: 'max-w-7xl my-0 mx-auto px-9 pt-10 pb-16',
      headingWrapper:
        'flex items-end gap-4 mb-4 text-left text-xl font-bold text-gray-400',
      minorHeadingWrapper: 'p-0',
      heading: 'm-0 p-0',
      contents: 'grid',
    },
    compoundSlots: [
      { slots: ['base', 'minorHeadingWrapper'], class: 'w-full' },
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
  const { base, headingWrapper, minorHeadingWrapper, heading, contents } =
    homeStyles({ grid: { initial: 'default', md: 'md', sm: 'sm' } })

  return (
    <main className={base()}>
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
  )
}

export default Home
