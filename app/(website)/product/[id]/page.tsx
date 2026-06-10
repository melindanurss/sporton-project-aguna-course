import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "../../components/product-detail/product-actions";
import { getProductDetail } from "@/app/services/product.service";
import { getImageUrl } from "@/app/lib/api";
import priceFormatter from "@/app/utils/price-formatter";

export type TPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetailPage = async ({ params }: TPageProps) => {
  const { id } = await params;

  let product;
  try {
    product = await getProductDetail(id);
    console.log("Product detail:", product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  // Konversi data API ke format yang sesuai dengan tampilan lama
  const displayProduct = {
    id: product._id,
    name: product.name,
    category: product.category?.name || product.category,
    price: product.price,
    imgUrl: product.imageUrl,
    description: product.description,
  };

  return (
    <div className="container mx-auto py-16">
      <div className="flex gap-12">
        {/* Image Section - TAMPILAN LAMA */}
        <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center overflow-hidden rounded-2xl">
          <Image
            src={getImageUrl(product.imageUrl)}
            width={550}
            height={550}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info Section - TAMPILAN LAMA */}
        <div className="w-full py-4">
          <h1 className="font-bold text-5xl mb-4">{product.name}</h1>
          <div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
            {product.category?.name || product.category}
          </div>
          <p className="leading-loose mb-6 text-gray-700">{product.description}</p>
          <div className="text-primary text-[32px] font-semibold mb-8">
            {priceFormatter(product.price)}
          </div>
          <ProductActions product={displayProduct} stock={product.stock} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;