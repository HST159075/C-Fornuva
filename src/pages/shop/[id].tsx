import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Star, Minus, Plus, ArrowRight } from '@/components/ui/Icons';
import { productService, Product } from '@/services/product.service';
import { reviewService, Review } from '@/services/review.service';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import toast from 'react-hot-toast';
import ProductCard from '@/components/shop/ProductCard';

const ProductDetailsPage = () => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isFavorite = product ? isInWishlist(product.id) : false;

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage wishlist');
      router.push('/auth/login');
      return;
    }
    if (product) {
      toggleItem(product);
      if (!isFavorite) {
        toast.success('Added to wishlist!');
      } else {
        toast.success('Removed from wishlist');
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
      fetchReviews();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const data = await productService.getProductById(id as string);
      setProduct(data);
      // Fetch related products from same category
      if (data.categoryId) {
        const related = await productService.getProducts({ category: data.categoryId, limit: 4 });
        setRelatedProducts(related.products.filter(p => p.id !== data.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getReviewsByProduct(id as string);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      router.push('/auth/login');
      return;
    }
    if (reviewRating === 0) {
      toast.error('Please select a star rating');
      return;
    }
    if (!reviewComment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    setIsSubmittingReview(true);
    try {
      await reviewService.createReview({
        productId: product!.id,
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      toast.success('Review submitted!');
      setReviewRating(0);
      setReviewHover(0);
      setReviewComment('');
      await fetchReviews();
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) return <Layout><div className="min-h-screen flex items-center justify-center">Loading...</div></Layout>;
  if (!product) return <Layout><div className="min-h-screen flex items-center justify-center">Product not found</div></Layout>;

  return (
    <Layout title={`${product.name} | FurNova`}>
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-[var(--muted)] mb-8">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[3rem] overflow-hidden bg-white border border-[var(--border)] shadow-xl"
              >
                <img 
                  src={product.images[selectedImage] || 'https://via.placeholder.com/800'} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-[var(--primary)] shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold rounded-full uppercase tracking-wider">
                  {product.category?.name}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--secondary)]">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(product.ratings) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{product.ratings} / 5.0</span>
                  <span className="text-sm text-[var(--muted)]">({reviews.length} Customer Reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-[var(--primary)]">
                  ${Number(product.discountPrice || product.price).toFixed(2)}
                </span>
                {product.discountPrice && (
                  <span className="text-xl text-[var(--muted)] line-through">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-[var(--muted)] leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="pt-6 space-y-6 border-t border-[var(--border)]">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-[var(--border)] rounded-full p-1 bg-white">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error('Please login to add items to cart');
                        router.push('/auth/login');
                        return;
                      }
                      addItem(product, quantity);
                      toast.success('Added to cart!');
                    }}
                    className="btn-primary flex-grow !py-4 flex items-center justify-center space-x-3"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button 
                    onClick={handleToggleWishlist}
                    className={`p-4 border border-[var(--border)] rounded-full transition-all ${isFavorite ? 'bg-red-50 border-red-200 text-red-500 shadow-inner' : 'hover:bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-y border-[var(--border)]">
                  <div className="flex items-center space-x-3 text-sm font-medium">
                    <Truck size={20} className="text-[var(--primary)]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-medium">
                    <RefreshCw size={20} className="text-[var(--primary)]" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-medium">
                    <ShieldCheck size={20} className="text-[var(--primary)]" />
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-12">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {reviews.length > 0 ? reviews.map((review) => (
                  <div key={review.id} className="bg-white p-8 rounded-3xl border border-[var(--border)] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center font-bold text-[var(--primary)]">
                          {review.user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold">{review.user.name}</h4>
                          <p className="text-xs text-[var(--muted)]">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    {review.title && <h5 className="font-bold">{review.title}</h5>}
                    <p className="text-[var(--muted)]">{review.comment}</p>
                  </div>
                )) : (
                  <p className="text-[var(--muted)] text-center py-12 bg-white rounded-3xl border border-dashed border-[var(--border)]">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-[var(--border)] h-fit space-y-6">
                <h3 className="text-xl font-bold text-center">Add a Review</h3>
                <div className="space-y-4">
                  <p className="text-sm text-center text-[var(--muted)]">Your rating matters!</p>
                  <div className="flex justify-center space-x-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        onMouseEnter={() => setReviewHover(s)}
                        onMouseLeave={() => setReviewHover(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={28}
                          fill={(reviewHover || reviewRating) >= s ? 'currentColor' : 'none'}
                          className="transition-all cursor-pointer hover:scale-110"
                        />
                      </button>
                    ))}
                  </div>
                  {reviewRating > 0 && (
                    <p className="text-center text-xs font-bold text-[var(--primary)]">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewRating]}
                    </p>
                  )}
                  <textarea
                    placeholder="Share your thoughts..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--primary)] min-h-[120px] resize-none"
                  />
                  <button
                    onClick={handleSubmitReview}
                    disabled={isSubmittingReview}
                    className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 space-y-12">
              <div className="flex items-end justify-between border-b border-[var(--border)] pb-8">
                <div className="space-y-4">
                  <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">More to Explore</span>
                  <h2 className="text-4xl font-bold dark:text-white">Related Products</h2>
                </div>
                <Link href="/shop" className="text-sm font-bold text-[var(--primary)] flex items-center hover:underline">
                  View All Shop <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
