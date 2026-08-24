import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <AuthLayout
      brandTitle={
        <>
          Delicious Food Delivered{' '}
          <span className="text-brand">To Your Door</span>
        </>
      }
      brandDescription="Order your favorite meals from the best restaurants near you. Fast delivery, easy payment, happy you!"
    >
      <LoginForm />
    </AuthLayout>
  )
}
