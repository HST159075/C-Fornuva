import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Package, Plus } from '@/components/ui/Icons';
import toast from 'react-hot-toast';
import { Category, CreateProductPayload, productService } from '@/services/product.service';

const parseImageUrls = (raw: string): string[] =>
  raw
    .split(/[,|\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);

const ManagerProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    discountPrice: '',
    categoryId: '',
    sku: '',
    stock: '0',
    brand: '',
    imagesRaw: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
        if (cats[0]?.id) {
          setForm((f) => ({ ...f, categoryId: f.categoryId || cats[0].id }));
        }
      } catch {
        toast.error('Could not load categories');
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);
    if (!form.name.trim() || !form.description.trim() || !form.sku.trim() || !form.categoryId) {
      toast.error('Name, description, SKU, and category are required');
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      toast.error('Enter a valid price');
      return;
    }
    if (!Number.isFinite(stock) || stock < 0) {
      toast.error('Enter a valid stock amount');
      return;
    }

    const discountParsed = form.discountPrice.trim() ? parseFloat(form.discountPrice) : undefined;
    const payload: CreateProductPayload = {
      name: form.name.trim(),
      description: form.description.trim(),
      shortDescription: form.shortDescription.trim() || undefined,
      price,
      categoryId: form.categoryId,
      sku: form.sku.trim(),
      stock,
      brand: form.brand.trim() || undefined,
      images: parseImageUrls(form.imagesRaw),
    };
    if (discountParsed !== undefined && Number.isFinite(discountParsed) && discountParsed >= 0) {
      payload.discountPrice = discountParsed;
    }

    setSubmitting(true);
    try {
      await productService.createProduct(payload);
      toast.success('Listing published');
      setForm((f) => ({
        ...f,
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        discountPrice: '',
        sku: '',
        stock: '0',
        brand: '',
        imagesRaw: '',
      }));
    } catch (err: unknown) {
      const msg =
        typeof err === 'object' &&
        err &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
          ? (err as { response: { data: { message: string } } }).response.data.message
          : 'Failed to create product';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="MANAGER">
      <div className="space-y-10 pb-12 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold dark:text-white flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                <Plus size={24} />
              </span>
              Add product listing
            </h1>
            <p className="text-[var(--muted)] font-medium">
              Create a catalog item visible in the storefront (same permissions as admin for new products).
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-[var(--border)] shadow-sm p-8 md:p-12 space-y-8"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-[var(--border)]">
            <Package size={22} className="text-[var(--primary)]" />
            <h2 className="text-xl font-bold dark:text-white">Product details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Product name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Description</span>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow resize-y"
              />
            </label>

            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Short description (optional)</span>
              <input
                value={form.shortDescription}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Price (BDT)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Discount price (optional)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.discountPrice}
                onChange={(e) => setForm((f) => ({ ...f, discountPrice: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">SKU</span>
              <input
                required
                value={form.sku}
                onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Stock units</span>
              <input
                type="number"
                min="0"
                required
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Category</span>
              <select
                required
                disabled={loadingCats || categories.length === 0}
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              >
                {categories.length === 0 ? (
                  <option value="">No categories — seed the database first</option>
                ) : (
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </label>

            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Brand (optional)</span>
              <input
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow"
              />
            </label>

            <label className="space-y-2 block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Image URLs (comma or newline separated)</span>
              <textarea
                rows={2}
                placeholder="https://..."
                value={form.imagesRaw}
                onChange={(e) => setForm((f) => ({ ...f, imagesRaw: e.target.value }))}
                className="w-full px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-[var(--primary)] outline-none transition-shadow resize-y"
              />
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={submitting || loadingCats || categories.length === 0} className="btn-primary !py-4 !px-10">
              {submitting ? 'Publishing…' : 'Publish listing'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProductsPage;
