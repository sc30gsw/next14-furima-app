import { Copyright } from '@/components/footer/Copyright'
import { FooterSection } from '@/components/footer/FooterSection'
import { Sns } from '@/components/footer/Sns'
import { tv } from 'tailwind-variants'

const footerStyles = tv(
  {
    slots: {
      base: '',
      sections: '',
      bottomContents: 'items-center py-6 px-9',
    },
    compoundSlots: [
      {
        slots: ['base', 'bottomContents'],
        class: 'border-t border-solid border-t-slate-400',
      },
      { slots: ['sections', 'bottomContents'], class: 'flex' },
    ],
    variants: {
      direction: {
        col: {
          sections: 'flex-col py-6 px-4',
        },
        row: {
          sections: 'flex-row py-8 px-9',
        },
      },
    },
  },
  { responsiveVariants: ['lg'] },
)

export const Footer = () => {
  const { base, sections, bottomContents } = footerStyles({
    direction: { initial: 'col', lg: 'row' },
  })

  return (
    <footer className={base()}>
      <div className={sections()}>
        <FooterSection
          label="カリカリについて"
          links={[
            '会社概要(運営会社)',
            '採用情報',
            'プレスリリース',
            '公式ブログ',
            'プレスキット',
            'カリカリUS',
            'カリカリShops',
            'カリカリShops会社概要（運営会社）',
            'カリカリShopsプレスリリース',
          ]}
        />
        <FooterSection
          label="ヘルプ"
          links={[
            'ヘルプセンター（ガイド・お問い合わせ）',
            'カリカリShops出店者向けガイド',
            'お問い合わせ一覧',
            'フリーワードから商品をさがす',
          ]}
        />
        <FooterSection
          label="プライバシーと利用規約"
          links={[
            'プライバシーポリシー',
            '外部送信ポリシー',
            'カリカリ利用規約',
            'カリカリShops利用規約',
            'カリカリカード利用規約',
            'カリカリスマートマネー利用規約',
            'カリカリスマートマネープライバシーポリシー',
            'カリカリアンバサダー利用規約',
            '電磁交付規約',
            'コンプライアンスポリシー',
            '個人データの安全管理に係る基本方針',
            '特定商取引に関する表記',
            '資金決済法に基づく表示',
            '法令遵守と犯罪防止のために',
            'カリカリあんしん・あんぜん宣言！',
            'ニセブランド品撲滅への取り組み',
          ]}
        />
      </div>
      <div className={bottomContents()}>
        <Sns />
        <Copyright />
      </div>
    </footer>
  )
}
