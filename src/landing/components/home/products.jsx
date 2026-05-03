import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";

const productList = [
  { name: "SportOn FootFastball V1", category: "Football", price: 440000, imgUrl: "football-shoes (1) 1.png" },
  { name: "SportOn HyperFast V2", category: "Running", price: 329000, imgUrl: "shoes grey.png" },
  { name: "SportOn FootFastball V3", category: "Football", price: 458000, imgUrl: "football-shoes (1).png" },
  { name: "SportOn HyperFast V4", category: "Running", price: 230000, imgUrl: "shoes red.png" },
  { name: "SportOn Hypershirt Black", category: "Running", price: 119000, imgUrl: "sportshirt black.png" },
  { name: "SportOn Hypershirt Red", category: "Running", price: 119000, imgUrl: "sportshirt red.png" },
  { name: "SportOn Racket Green", category: "Tennis", price: 999000, imgUrl: "racket hijau.png" },
  { name: "SportOn Racket Black Red", category: "Tennis", price: 999000, imgUrl: "racket merah.png" },
  { name: "SportOn Basketball", category: "Basketball", price: 900000, imgUrl: "basketball.png" },
  { name: "SportOn Football", category: "Football", price: 1000000, imgUrl: "football.png" },
  { name: "SportOn Tennisball", category: "Tennis", price: 420000, imgUrl: "tennis ball.png" },
  { name: "SportOn Volleyball", category: "Volleyball", price: 650000, imgUrl: "volleyball.png" },
];

const ProductsSection = () => {
  return (
    <section id="products-section" className="container mx-auto mt-32 mb-20">
      <h2 className="font-bold italic text-4xl text-center mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {productList.map((product, index) => (
          <a
            href="#"
            key={index}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300"
          >
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              <img
                src={`/src/assets/${product.imgUrl}`}
                alt={product.name}
                width={300}
                height={300}
                className="aspect-square object-contain"
              />
              <Button
                variant="square" 
                size="square"
                className="w-10 h-10 p-2! absolute right-3 top-3">
                <FiPlus size={24} />
              </Button>
            </div>
            <h3 className="font-medium text-lg mb-1.5 mt-4">{product.name}</h3>
            <div className="flex justify-between mb-8">
              <div className="text-gray-500">{product.category}</div>
              <div className="font-medium text-primary">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;