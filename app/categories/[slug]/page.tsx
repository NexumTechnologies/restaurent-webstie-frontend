import { notFound } from 'next/navigation'

import { HomeNavbar } from '@/components/home/home-navbar'
import { SiteFooter } from '@/components/home/site-footer'
import { CategoryPage } from '@/components/category/category-page'

import {
  CATEGORY_CONFIGS,
  CATEGORY_LIST,
  type CategorySlug,
} from '@/lib/categories'

export function generateStaticParams() {
  return CATEGORY_LIST.map(
    (category) => ({
      slug: category.slug,
    }),
  )
}

type CategoryPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryRoute({
  params,
}: CategoryPageProps) {
  const { slug } = await params

  if (
    !Object.prototype.hasOwnProperty.call(
      CATEGORY_CONFIGS,
      slug,
    )
  ) {
    notFound()
  }

  const category =
    CATEGORY_CONFIGS[
      slug as CategorySlug
    ]

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <HomeNavbar />

      <main className="flex-1">
        <CategoryPage
          category={category}
        />
      </main>

      <SiteFooter />
    </div>
  )
}