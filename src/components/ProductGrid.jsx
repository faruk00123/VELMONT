import ProductCard from './ProductCard.jsx'

/** Responsive product grid wrapper with a built-in empty slot. */
export default function ProductGrid({
  products = [],
  columns = 4,
  emptyState = null,
  eagerCount = 0,
}) {
  if (!products.length) return emptyState

  const colClass =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : columns === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

  return (
    <div className={`grid grid-cols-1 gap-5 sm:gap-6 ${colClass}`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} eager={i < eagerCount} />
      ))}
    </div>
  )
}
