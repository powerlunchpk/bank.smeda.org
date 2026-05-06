import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
