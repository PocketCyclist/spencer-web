import { Input } from '@/components/ui/Input/Input'

export const FooterSubscribe = () => (
  <form>
    <h5 className="mb-4 font-serif font-bold text-footer-title">
      Subscribe for newsletter
    </h5>
    <Input placeholder="Enter your email" size="sm" type="email" />
  </form>
)
