import { z } from 'zod'

const phoneNumberRegex = /^\d{10,11}$/

const isFullWidth = (value: string) =>
  /^[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\u3400-\u4DBF]+$/.test(
    value,
  )
const isKatakana = (value: string) => /^[\u30A0-\u30FF]+$/.test(value)

const birthDateSchema = z.string().refine(
  (value) => {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/

    if (!regex.test(value)) {
      return false
    }

    const [year, month, day] = value.split('/').map(Number)
    const birthDate = new Date(year, month - 1, day)
    const now = new Date()
    const earliestDate = new Date(1900, 0, 1)

    // 日付が実際に存在するか（例: 2月30日は存在しない）
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() + 1 !== month ||
      birthDate.getDate() !== day
    ) {
      return false
    }

    // 年が1900〜現在の年の間にあるか
    if (year < 1900 || year > now.getFullYear()) {
      return false
    }

    // 日付が過去であることのチェック
    if (birthDate > now || birthDate < earliestDate) {
      return false
    }

    return true
  },
  {
    message:
      '生年月日は実際に存在するyyyy/mm/ddの形式で入力してください（1900年以降）',
  },
)

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(1, 'ユーザー名は必須入力です')
    .max(20, 'ユーザー名は20文字以下で入力してください'),
  email: z
    .string()
    .email('メールアドレスは必須入力です')
    .max(128, 'メールアドレスは128文字以下で入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してくだい')
    .max(128, 'パスワードは128文字以下で入力してください')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'パスワードは半角英数字の両方を含めてください',
    ),
  jpLastName: z
    .string()
    .min(1, '姓は必須入力です')
    .max(128)
    .refine(isFullWidth, '姓は全角で入力してください'),
  jpFirstName: z
    .string()
    .min(1, '名は必須入力です')
    .max(128)
    .refine(isFullWidth, '名は全角で入力してください'),
  lastName: z
    .string()
    .min(1, '姓(カナ)は必須入力です')
    .max(128)
    .refine(isKatakana, '姓(カナ)は全角カタカナで入力してください'),
  firstName: z
    .string()
    .min(1, '名(カナ)は必須入力です')
    .max(128)
    .refine(isKatakana, '名(カナ)は全角カタカナで入力してください'),
  phoneNumber: z
    .string()
    .min(1, '電話番号は必須入力です')
    .max(11, '電話番号は10桁または11桁の数字で入力してください')
    .regex(
      phoneNumberRegex,
      '電話番号は10桁または11桁の数字で入力してください',
    ),
  birthDay: birthDateSchema,
  prefecture: z.string().min(1, '都道府県を選択してください').max(128),
})

export type SignUpFormInput = z.infer<typeof signUpFormSchema>
