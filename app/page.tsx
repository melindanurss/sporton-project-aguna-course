import HeroSection from "./(website)/components/home/hero";
import CategoriesSection from "./(website)/components/home/categories";
import ProductsSection from "./(website)/components/home/products";
import { getAllCategories } from "./services/category.service";
import { getAllProducts } from "./services/product.service";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts()
  ]);

  return (
    <main>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
    </main>
  );
}