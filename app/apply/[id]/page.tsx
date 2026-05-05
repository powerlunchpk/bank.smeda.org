import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
import Header from '@/components/layout/Header';
import { notFound } from 'next/navigation';
import ApplyForm from './ApplyForm';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ApplyForm product={product} />
      </div>
    </main>
  );
}
