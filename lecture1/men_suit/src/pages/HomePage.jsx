import React from 'react'
import MainCarousel from '../sections/MainCarousel'
import CategoryNav from '../sections/CategoryNav'
import NewArrival from '../sections/NewArrival'
import LookbookSection from '../sections/LookbookSection'
import MDPick from '../sections/MDPick'
import TPOGrid from '../sections/TPOGrid'

export default function HomePage() {
  return (
    <div>
      <MainCarousel />
      <CategoryNav />
      <NewArrival />
      <LookbookSection />
      <MDPick />
      <TPOGrid />
    </div>
  )
}
