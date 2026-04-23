'use client';

import { Activity, Users, TrendingUp, BarChart3 } from "lucide-react"
import { useApi } from '@/hooks/useApi';
import { useEffect, useState } from 'react';

interface VisitorData {
  visitor_by_day: number;
  visitor_by_month: number;
  visitor_by_year: number;
  visitor_all_year: number;
  trend?: 'up' | 'down' | 'neutral';
  trend_percentage?: number;
  peak_hour?: string;
}

function FlipDigit({ digit }: { digit: string }) {
  const [displayed, setDisplayed] = useState(digit);
  const [incoming, setIncoming] = useState(digit);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (digit === displayed) return;
    setIncoming(digit);
    setAnimating(true);
    const timer = setTimeout(() => {
      setDisplayed(digit);
      setAnimating(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [digit, displayed]);

  if (digit === "." || digit === ",") {
    return <span className="opacity-50">{digit}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden leading-[1.1] h-[1.1em]">
      <span className={`block transition-all duration-700 ${animating ? '-translate-y-[120%] opacity-0' : 'translate-y-0 opacity-100'}`}>
        {displayed}
      </span>
      <span className={`absolute top-0 left-0 right-0 block transition-all duration-700 ${animating ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}>
        {incoming}
      </span>
    </span>
  );
}

function FlipNumber({ value }: { value: string }) {
  const chars = value.split("");
  const len = chars.length;
  return (
    <span className="inline-flex items-end tabular-nums">
      {chars.map((char, i) => (
        <FlipDigit key={len - i} digit={char} />
      ))}
    </span>
  );
}

export function VisitorStatsClient() {
  const { data, loading } = useApi<VisitorData>('/views', {
    cache: true,
    cacheTTL: 60000, // 1 minute cache
    immediate: true,
  });

  const stats = [
    { id: 'day', label: 'Hari Ini', value: data?.visitor_by_day, icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
    { id: 'month', label: 'Bulan Ini', value: data?.visitor_by_month, icon: Users, color: 'text-purple-400', bgColor: 'bg-purple-400/20' },
    { id: 'year', label: 'Tahun Ini', value: data?.visitor_by_year, icon: TrendingUp, color: 'text-pink-400', bgColor: 'bg-pink-400/20' },
    { id: 'total', label: 'Total', value: data?.visitor_all_year, icon: BarChart3, color: 'text-[#33b962]', bgColor: 'bg-[#33b962]/20', highlight: true },
  ];

  return (
    <div className="mt-20 p-8 glass rounded-3xl border-gray-200/5 bg-gray-50/50 dark:bg-white/5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b dark:border-white/10 border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center bg-[#33b962]/15">
            <Activity className="w-6 h-6 text-[#33b962]" />
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-xs dark:text-white text-gray-900">Statistik Pengunjung</p>
            <p className="text-[10px] font-bold uppercase text-gray-600 dark:text-gray-400">Data Real-time</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {loading && !data ? (
          <div className="col-span-4 py-8 text-center text-xs uppercase tracking-widest animate-pulse">Memuat data...</div>
        ) : (
          stats.map((stat) => (
            <div key={stat.id} className="p-4 rounded-xl border bg-white dark:bg-white/5 border-gray-200 dark:border-white/10">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`font-black text-lg sm:text-xl dark:text-white text-gray-900 ${stat.highlight ? stat.color : ''}`}>
                <FlipNumber value={stat.value?.toLocaleString('id-ID') ?? '0'} />
              </p>
              <p className="text-[10px] font-black uppercase tracking-tighter text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
