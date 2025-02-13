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
  name: yup.string().required(),
  message: yup.string().required(),
})

export async function POST(req: NextRequest) {
  const { email, name, message } = await req.json()

  if (!schema.isValidSync({ email, name, message })) {
    return new NextResponse(null, { status: 400 })
  }

  await addCustomer({
    email,
    name,
    message,
    tags: ['handpan_website', 'contact-form'],
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
