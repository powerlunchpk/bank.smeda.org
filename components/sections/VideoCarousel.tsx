'use client';

import React from 'react';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';
import { MOCK_VIDEOS } from '@/lib/data';

export default function VideoCarousel() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl text-smeda-blue mb-2">Video Tutorials</h2>
            <p className="text-slate-500">Enhance your financial literacy with our step-by-step guides.</p>
          </div>
          <button className="text-sm font-bold text-smeda-blue hover:underline">View All Tutorials</button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {MOCK_VIDEOS.map((video) => (
            <div key={video.id} className="flex-shrink-0 w-[300px] snap-start group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-md">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white transition-all group-hover:scale-110" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-smeda-blue transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
