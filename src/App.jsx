import Header from './landing/components/layouts/header'
import Hero from './landing/components/home/hero'
import Categories from './landing/components/home/categories'
import Products from './landing/components/home/products'
import Footer from './landing/components/layouts/footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <Products />
      </main>
      <Footer />
    </div>
  )
}

export default App