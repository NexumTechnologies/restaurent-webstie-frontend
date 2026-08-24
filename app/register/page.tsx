import { AuthLayout } from '@/components/auth/auth-layout'
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <AuthLayout
      brandTitle={
        <>
          Create Your <span className="text-brand">Account</span>
        </>
      }
      brandDescription="Join FoodFlow and enjoy delicious meals delivered to your door. It's quick, easy and hassle-free."
    >
      <RegisterForm />
    </AuthLayout>
  )
}
