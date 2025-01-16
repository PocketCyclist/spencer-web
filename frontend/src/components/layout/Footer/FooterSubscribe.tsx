import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'

export const FooterSubscribe = () => (
  <form>
    <h5 className="mb-4 font-serif text-footer-title font-bold">
      Subscribe for newsletter
    </h5>
    <Input placeholder="Enter your email" size="sm" type="email" />
    <Button variant={'form'} className="mt-2 w-full rem:h-[40px]">
      Send
    </Button>
  </form>
)
