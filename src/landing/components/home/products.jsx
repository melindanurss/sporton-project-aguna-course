const products = [
  { name: "Raket Green Tennis", price: 300000, icon: "🎾", bg: "bg-green-50" },
  { name: "SportOn Basketball", price: 120000, icon: "🏀", bg: "bg-orange-50" },
  { name: "SportOn HyperSoccer V2", price: 330000, icon: "⚽", bg: "bg-purple-50" },
  { name: "SportOn Hyperloft Shoes", price: 99000, icon: "👟", bg: "bg-blue-50" },
  { name: "SportOn Skidwalk", price: 99900, icon: "👟", bg: "bg-gray-50" },
  { name: "SportOn Buckets Tennis", price: 99800, icon: "🎾", bg: "bg-green-50" },
  { name: "SportOn Hyperlooper v2", price: 49900, icon: "🏀", bg: "bg-orange-50" },
  { name: "SportOn Hyperlooper v3", price: 99000, icon: "⚽", bg: "bg-purple-50" },
];

const Products = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold italic text-center mb-12">
          <span className="text-primary">OUR</span> PRODUCTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              {/* Product Image Area */}
              <div className={`${product.bg} p-8 text-center relative`}>
                <div className="text-7xl">{product.icon}</div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-primary">
                    Rp{product.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <button className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;