import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from '../ui/Icons';
import { Product } from '@/services/product.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.discountPrice 
    ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100) 
    : 0;

  const { isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const router = useRouter();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/auth/login');
      return;
    }
    addItem(product, 1);
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to manage wishlist');
      router.push('/auth/login');
      return;
    }
    toggleItem(product);
    if (!isFavorite) {
      toast.success('Added to wishlist!');
    } else {
      toast.success('Removed from wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x500?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingCart size={20} />
          </button>
          <Link href={`/shop/${product.id}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--secondary)] hover:bg-[var(--primary)] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <Eye size={20} />
          </Link>
          <button 
            onClick={handleToggleWishlist}
            className={`w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150 ${isFavorite ? 'text-red-500' : 'text-[var(--secondary)] hover:bg-red-50'}`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-[var(--muted)] uppercase tracking-widest font-medium">
            {product.category?.name || 'Furniture'}
          </p>
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-bold text-lg text-[var(--secondary)] hover:text-[var(--primary)] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[var(--primary)]">
              ${Number(product.discountPrice || product.price).toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-[var(--muted)] line-through">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-xs font-bold ml-1">{product.ratings}</span>
            <span className="text-[10px] text-[var(--muted)] ml-1">({product.numReviews})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
