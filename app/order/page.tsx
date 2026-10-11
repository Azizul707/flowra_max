'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  RefreshCw, 
  LogOut, 
  Phone, 
  Package, 
  Clock, 
  Truck, 
  Check, 
  X, 
  Trash2, 
  ExternalLink, 
  Store, 
  ShieldCheck, 
  AlertTriangle,
  Send,
  DollarSign,
  FileSpreadsheet
} from 'lucide-react';
import { getOrders, updateOrderStatus, deleteOrder } from '@/actions/orderAction';

interface OrderItem {
  id: string | number;
  created_at?: string;
  name: string;
  phone: string;
  address: string;
  package_name: string;
  delivery_zone: string;
  total_price: number;
  status?: string;
  isDemo?: boolean;
}

const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: 'GA-1092',
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    name: 'তানভীর আহমেদ',
    phone: '01712345678',
    address: 'বাড়ি ১২, রোড ৫, সেক্টর ৩, উত্তরা, ঢাকা',
    package_name: 'Pack 2 (Double Combo)',
    delivery_zone: 'Inside Dhaka',
    total_price: 499,
    status: 'Pending',
    isDemo: true,
  },
  {
    id: 'GA-1091',
    created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    name: 'ফারহানা ইসলাম',
    phone: '01898765432',
    address: 'সদর রোড, বরিশাল',
    package_name: 'Pack 3 (Mega Combo)',
    delivery_zone: 'Outside Dhaka',
    total_price: 699,
    status: 'Confirmed',
    isDemo: true,
  },
  {
    id: 'GA-1090',
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    name: 'মাহমুদুল হাসান',
    phone: '01911223344',
    address: 'জিইসি মোড়, চট্টগ্রাম',
    package_name: 'Pack 1 (Trial Pack)',
    delivery_zone: 'Outside Dhaka',
    total_price: 400,
    status: 'Shipped',
    isDemo: true,
  },
  {
    id: 'GA-1089',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    name: 'সাবরিনা আক্তার',
    phone: '01555667788',
    address: 'ধানমন্ডি ২৭, ঢাকা',
    package_name: 'Pack 2 (Double Combo)',
    delivery_zone: 'Inside Dhaka',
    total_price: 499,
    status: 'Delivered',
    isDemo: true,
  },
];

const REQUIRED_EMAIL = 'arafinazizul@gmail.com';
const REQUIRED_PASSWORD = 'Tahmid@tashrif2023';

const subscribeStorage = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getAuthSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('ga_admin_authenticated') === 'true';
};

const getAuthServerSnapshot = () => false;

export default function OrderDashboardPage() {
  const isStoredAuth = useSyncExternalStore(subscribeStorage, getAuthSnapshot, getAuthServerSnapshot);
  const [localAuth, setLocalAuth] = useState<boolean | null>(null);

  const isAuthenticated = localAuth !== null ? localAuth : isStoredAuth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>(DEFAULT_ORDERS);
  const [isLoading, setIsLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Fetch orders from Supabase when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    let isCancelled = false;

    getOrders()
      .then((res) => {
        if (isCancelled) return;
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => ({
            ...item,
            status: item.status || 'Pending',
            isDemo: false,
          }));
          setOrders(mapped);
        } else {
          if (res.error) {
            setDbError(res.error);
          }
          setOrders(DEFAULT_ORDERS);
        }
      })
      .catch((err) => {
        if (isCancelled) return;
        setDbError(err?.message || 'ডাটাবেজ লোড করতে ত্রুটি');
        setOrders(DEFAULT_ORDERS);
      });

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated]);

  const refreshOrders = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const res = await getOrders();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map((item: any) => ({
          ...item,
          status: item.status || 'Pending',
          isDemo: false,
        }));
        setOrders(mapped);
      } else {
        if (res.error) setDbError(res.error);
        setOrders(DEFAULT_ORDERS);
      }
    } catch (err: any) {
      setDbError(err?.message || 'ডাটাবেজ লোড করতে ত্রুটি');
      setOrders(DEFAULT_ORDERS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    const enteredPassword = password.trim();

    // Check exact credentials
    if (trimmedEmail === REQUIRED_EMAIL && enteredPassword === REQUIRED_PASSWORD) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ga_admin_authenticated', 'true');
        sessionStorage.setItem('ga_admin_user', REQUIRED_EMAIL);
      }
      setLocalAuth(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('ভুল ইমেইল বা পাসওয়ার্ড।');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ga_admin_authenticated');
      sessionStorage.removeItem('ga_admin_user');
    }
    setLocalAuth(false);
    setEmail('');
    setPassword('');
    setErrorMessage(null);
  };

  const handleStatusChange = async (orderId: string | number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
      setActionSuccess(`অর্ডার #${orderId} এর স্ট্যাটাস '${newStatus}' এ পরিবর্তন হয়েছে!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDelete = async (orderId: string | number) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে #${orderId} অর্ডারটি মুছে ফেলতে চান?`)) return;

    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }

    const res = await deleteOrder(orderId);
    if (res.success) {
      setActionSuccess(`অর্ডার #${orderId} মুছে ফেলা হয়েছে।`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const exportToCSV = () => {
    if (filteredOrders.length === 0) return;
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Address', 'Delivery Zone', 'Package', 'Total Price', 'Status'];
    const rows = filteredOrders.map((o) => [
      `"${o.id}"`,
      `"${o.created_at ? new Date(o.created_at).toLocaleString() : ''}"`,
      `"${o.name.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${o.delivery_zone}"`,
      `"${o.package_name}"`,
      o.total_price,
      `"${o.status || 'Pending'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GreenAgri_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and Search logic
  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      order.name.toLowerCase().includes(q) ||
      order.phone.includes(q) ||
      order.address.toLowerCase().includes(q) ||
      String(order.id).toLowerCase().includes(q) ||
      order.package_name.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchZone = zoneFilter === 'ALL' || order.delivery_zone === zoneFilter;

    return matchSearch && matchStatus && matchZone;
  });

  // Metric Computations
  const total = orders.length;
  const pending = orders.filter((o) => (o.status || 'Pending') === 'Pending').length;
  const confirmed = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Processing').length;
  const shipped = orders.filter((o) => o.status === 'Shipped').length;
  const delivered = orders.filter((o) => o.status === 'Delivered').length;
  const cancelled = orders.filter((o) => o.status === 'Cancelled').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (Number(curr.total_price) || 0), 0);

  // ----------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex flex-col justify-center items-center px-4 py-12 font-sans-bengali">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-3">
              <Image
                src="/logo.png"
                alt="Green Agri BD"
                width={180}
                height={48}
                className="h-12 w-auto object-contain mx-auto"
                priority
              />
            </Link>
            <h1 className="text-2xl font-black text-[#1b4332] tracking-tight">
              অর্ডার ড্যাশবোর্ড লগইন
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              গ্রীন এগ্রি বিডি অ্যাডমিন প্যানেল অ্যাক্সেস করতে আপনার তথ্য দিন
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#e3dfd5] p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Message Box */}
              {errorMessage && (
                <div 
                  role="alert"
                  className="p-3.5 bg-red-50 border border-red-300 rounded-xl text-sm text-red-700 font-bold flex items-center gap-2.5 animate-shake"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  ইমেইল অ্যাড্রেস (Email)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arafinazizul@gmail.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-[#fdfcf9] border border-[#d6cfbf] rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  পাসওয়ার্ড (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 bg-[#fdfcf9] border border-[#d6cfbf] rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 bg-[#1b4332] hover:bg-[#143225] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <Lock className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>লগইন করুন</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-stone-200 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#1b4332] font-semibold transition-colors"
              >
                <Store className="w-3.5 h-3.5" />
                <span>মূল ওয়েবসাইটে ফিরে যান</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. AUTHENTICATED ORDER MANAGEMENT DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-stone-800 font-sans-bengali">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#ded7ca] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Green Agri BD"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-stone-300" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>অর্ডার পোর্টাল (/order)</span>
            </div>
          </div>

          {/* User info & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-stone-800">{REQUIRED_EMAIL}</span>
              <span className="text-[10px] text-emerald-600 font-semibold">অ্যাডমিনিস্ট্রেটর অ্যাক্সেস</span>
            </div>

            <button
              onClick={refreshOrders}
              disabled={isLoading}
              title="নতুন অর্ডার রিফ্রেশ করুন"
              className="p-2 text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              <span className="hidden sm:inline">রিফ্রেশ</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-[#1b4332] hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>ওয়েবসাইট দেখুন</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Action alert toast */}
        {actionSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-bold flex items-center justify-between shadow-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Database RLS / Connect Info notice */}
        {dbError && (
          <div className="p-3.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-bold">ডাটাবেজ সংযোগ নোটিস: </strong>
              <span>
                {dbError.includes('permission') || dbError.includes('row-level security') 
                  ? 'Supabase RLS শুধুমাত্র সার্ভিস কী বা অথেনটিকেটেড রোলকে রিড করার অনুমতি দেয়। ড্যাশবোর্ডে স্যাম্পল টেস্ট অর্ডার ডিসপ্লে করা হচ্ছে।' 
                  : dbError}
              </span>
            </div>
          </div>
        )}

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#ded7ca] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-bold">মোট অর্ডার</span>
              <Package className="w-4 h-4 text-[#1b4332]" />
            </div>
            <div className="text-2xl font-black text-stone-900">{total}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40 shadow-xs">
            <div className="flex items-center justify-between text-amber-700 mb-1">
              <span className="text-xs font-bold">পেন্ডিং</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-900">{pending}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/40 shadow-xs">
            <div className="flex items-center justify-between text-blue-700 mb-1">
              <span className="text-xs font-bold">কনফার্মড</span>
              <Check className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-900">{confirmed}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 shadow-xs">
            <div className="flex items-center justify-between text-indigo-700 mb-1">
              <span className="text-xs font-bold">শিপড</span>
              <Truck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-indigo-900">{shipped}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
            <div className="flex items-center justify-between text-emerald-700 mb-1">
              <span className="text-xs font-bold">ডেলিভার্ড</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-900">{delivered}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#ded7ca] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-bold">মোট রেভিনিউ</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-[#1b4332]">৳ {totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Filters and Actions Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ded7ca] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম, ফোন নম্বর, বা ঠিকানা দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#fdfcf9] border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b4332] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Selects & CSV Download */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-[#fdfcf9] border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              >
                <option value="ALL">সকল স্ট্যাটাস</option>
                <option value="Pending">পেন্ডিং (Pending)</option>
                <option value="Confirmed">কনফার্মড (Confirmed)</option>
                <option value="Shipped">শিপড (Shipped)</option>
                <option value="Delivered">ডেলিভার্ড (Delivered)</option>
                <option value="Cancelled">বাতিল (Cancelled)</option>
              </select>

              {/* Zone Filter */}
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="px-3 py-2 bg-[#fdfcf9] border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#1b4332]"
              >
                <option value="ALL">সকল জোন</option>
                <option value="Inside Dhaka">ঢাকার ভিতরে</option>
                <option value="Outside Dhaka">ঢাকার বাইরে</option>
              </select>

              {/* CSV Export Button */}
              <button
                onClick={exportToCSV}
                disabled={filteredOrders.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>কুরিয়ার CSV এক্সপোর্ট</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white rounded-2xl border border-[#ded7ca] shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <span>অর্ডার তালিকা</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold">
                {filteredOrders.length} টি
              </span>
            </h2>
            <span className="text-xs text-stone-500">
              সর্বশেষ চেক: {new Date().toLocaleTimeString('bn-BD')}
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-stone-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#1b4332] mb-3" />
              <p className="text-sm font-semibold">অর্ডার তথ্য লোড হচ্ছে...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-stone-500">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-bold text-stone-700">কোনো অর্ডার পাওয়া যায়নি</p>
              <p className="text-xs text-stone-400 mt-1">অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা সার্চ শব্দ পরীক্ষা করুন।</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">অর্ডার আইডি</th>
                    <th className="py-3 px-4">গ্রাহক</th>
                    <th className="py-3 px-4">ফোন নম্বর</th>
                    <th className="py-3 px-4">ঠিকানা ও জোন</th>
                    <th className="py-3 px-4">প্যাকেজ</th>
                    <th className="py-3 px-4 text-right">মূল্য</th>
                    <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((order) => {
                    const statusColors: Record<string, string> = {
                      Pending: 'bg-amber-100 text-amber-800 border-amber-300',
                      Confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
                      Processing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                      Shipped: 'bg-purple-100 text-purple-800 border-purple-300',
                      Delivered: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                      Cancelled: 'bg-red-100 text-red-800 border-red-300',
                    };

                    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
                    const waNumber = cleanPhone.startsWith('88') ? cleanPhone : `88${cleanPhone}`;
                    const waMessage = encodeURIComponent(
                      `আসসালামু আলাইকুম ${order.name}! Green Agri BD থেকে আপনার অর্ডারটি (${order.package_name}, মোট মূল্য: ৳${order.total_price}) নিশ্চিত করার জন্য যোগাযোগ করা হয়েছে। অর্ডারটি কি ঠিক আছে? অনুগ্রহ করে জানাবেন। ধন্যবাদ!`
                    );

                    return (
                      <tr 
                        key={order.id} 
                        className="hover:bg-amber-50/30 transition-colors"
                      >
                        {/* ID & Date */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                            #{order.id}
                          </span>
                          <div className="text-[11px] text-stone-400 mt-1">
                            {order.created_at ? new Date(order.created_at).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'আজ'}
                          </div>
                        </td>

                        {/* Customer Name */}
                        <td className="py-3.5 px-4 font-bold text-stone-900">
                          {order.name}
                        </td>

                        {/* Phone with Call & WhatsApp quick actions */}
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-xs font-semibold text-stone-800">
                            {order.phone}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`tel:${order.phone}`}
                              className="inline-flex items-center gap-0.5 text-[11px] text-stone-500 hover:text-emerald-700 font-semibold"
                              title="কল করুন"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>কল</span>
                            </a>
                            <span className="text-stone-300">•</span>
                            <a
                              href={`https://wa.me/${waNumber}?text=${waMessage}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-0.5 text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold"
                              title="WhatsApp মেসেজ পাঠান"
                            >
                              <Send className="w-3 h-3 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>

                        {/* Address & Zone */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-stone-700 line-clamp-2" title={order.address}>
                            {order.address}
                          </p>
                          <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            order.delivery_zone === 'Inside Dhaka' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'bg-orange-50 text-orange-700'
                          }`}>
                            {order.delivery_zone === 'Inside Dhaka' ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে'}
                          </span>
                        </td>

                        {/* Package */}
                        <td className="py-3.5 px-4">
                          <span className="text-xs font-semibold text-stone-800">
                            {order.package_name}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 text-right font-black text-stone-900">
                          ৳{order.total_price}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4 text-center">
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`text-xs font-bold py-1 px-2.5 rounded-full border cursor-pointer focus:outline-none ${
                              statusColors[order.status || 'Pending'] || 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            <option value="Pending">Pending (পেন্ডিং)</option>
                            <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                            <option value="Shipped">Shipped (কুরিয়ারে)</option>
                            <option value="Delivered">Delivered (ডেলিভার্ড)</option>
                            <option value="Cancelled">Cancelled (বাতিল)</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 text-stone-600 hover:text-emerald-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                              title="বিস্তারিত দেখুন"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="অর্ডার ডিলিট করুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  অর্ডার বিস্তারিত (#{selectedOrder.id})
                </h3>
                <span className="text-xs text-stone-500">
                  {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString('bn-BD') : ''}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              <div className="bg-stone-50 p-3.5 rounded-xl space-y-2 border border-stone-200">
                <div className="flex justify-between">
                  <span className="text-stone-500 text-xs">গ্রাহকের নাম:</span>
                  <span className="font-bold text-stone-900">{selectedOrder.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 text-xs">মোবাইল নম্বর:</span>
                  <span className="font-mono font-bold text-stone-900">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 text-xs">ডেলিভারি জোন:</span>
                  <span className="font-semibold text-stone-800">{selectedOrder.delivery_zone}</span>
                </div>
                <div className="pt-1 border-t border-stone-200">
                  <span className="text-stone-500 text-xs block mb-1">ঠিকানা:</span>
                  <p className="text-stone-800 font-medium bg-white p-2 rounded-lg border border-stone-200 text-xs">
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-900 font-semibold">অর্ডারকৃত পণ্য:</span>
                  <span className="font-bold text-emerald-950">{selectedOrder.package_name}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-200">
                  <span className="font-bold text-stone-900">সর্বমোট বিল:</span>
                  <span className="text-lg font-black text-emerald-800">৳{selectedOrder.total_price}</span>
                </div>
              </div>

              {/* Status updater */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  স্ট্যাটাস আপডেট করুন:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition-colors ${
                        selectedOrder.status === st 
                          ? 'bg-[#1b4332] text-white border-[#1b4332]' 
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
