import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'
import { addCustomer } from '@/lib/shopify'
import isEmailValidator from 'validator/lib/isEmail'

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test(
      'is-valid',
      (message) => `${message.path} is invalid`,
      (value) =>
        value
          ? isEmailValidator(value)
          : new yup.ValidationError('Invalid value'),
    ),
})

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!schema.isValidSync({ email })) {
    return new NextResponse(null, { status: 400 })
  }

  await addCustomer({ email, tags: ['handpan_website'] })

  return NextResponse.json({ success: true }, { status: 200 })
}
