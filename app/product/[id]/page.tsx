import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "../../components/product-detail/product-actions";
import { productList } from "../../utils/products-data";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export async function generateStaticParams() {
  return productList.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = productList.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto py-40 flex gap-12">
      {/* Image Section - DIPAKSA 1:1 */}
      <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center overflow-hidden">
        <Image
          src={`/images/${product.imgUrl}`}
          width={550}
          height={550}
          alt={product.name}
          className="w-full h-full object-contain"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Product Info Section */}
      <div className="w-full py-7">
        <h1 className="font-bold text-5xl mb-6">{product.name}</h1>
        <div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
          {product.category}
        </div>
        <p className="leading-loose mb-8">{product.description}</p>
        <div className="text-primary text-[32px] font-semibold mb-12">
          {formatPrice(product.price)}
        </div>
        <ProductActions product={product} />
      </div>
    </main>
  );
};

export default ProductDetailPage;