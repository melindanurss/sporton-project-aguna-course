"use client";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";
import { productList } from "../../utils/products-data";

const ProductsSection = () => {
  return (
    <section id="products-section" className="container mx-auto mt-32 mb-20">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {productList.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300 cursor-pointer block"
          >
            <div 
              className="bg-primary-light w-full aspect-square relative"
              style={{ 
                backgroundImage: `url('/images/${product.imgUrl}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <Button
                className="absolute right-3 top-3 bg-orange-500! text-white! hover:bg-orange-600!"
                style={{
                  width: 39.75,
                  height: 39.75,
                  borderRadius: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 32,
                }}
              >
                <FiPlus size={24} />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">{product.category}</div>
              <div className="font-medium text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;