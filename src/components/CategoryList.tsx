import { Category } from '@/components/Category'
import { Category as CategoryType } from '@/types/Category'
import { tv } from 'tailwind-variants'

const categories = [
  { label: 'すべて見る', path: '/' },
  { label: 'マイリスト', path: '/myList' },
  { label: 'ゲーム・おもちゃ・グッズ', path: '/hobbies' },
  { label: '本・雑誌・漫画', path: '/books' },
  { label: 'メンズ', path: '/mens' },
  { label: 'レディース', path: '/ladies' },
  { label: 'ベビー・キッズ', path: '/kids' },
] as const satisfies CategoryType[]

const categoryListStyles = tv(
  {
    base: 'box-border justify-center w-full max-w-7xl h-11 overflow-scroll hidden-scrollbar border-b-0 border-t border-solid border-t-transparent px-9 py-0 mx-auto mt-5 mb-0',
    variants: {
      hidden: {
        true: 'hidden',
        false: 'flex',
      },
    },
  },
  { responsiveVariants: ['md'] },
)

export const CategoryList = () => {
  return (
    <ul
      className={categoryListStyles({
        hidden: { initial: true, md: false },
      })}
    >
      {categories.map((category) => (
        <Category key={category.label} category={category} />
      ))}
    </ul>
  )
}
