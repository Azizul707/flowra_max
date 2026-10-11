export interface FlowerItem {
  id: number;
  bnId: string;
  name: string;
  subtitle: string;
  iconBg: string;
  color: string;
}

export const FLOWER_LIST: FlowerItem[] = [
  {
    id: 1,
    bnId: '০১',
    name: '১. নয়নতারা',
    subtitle: 'সহজ পরিচর্যা, বারোমাসি',
    iconBg: '#fce7f3',
    color: '#ec4899',
  },
  {
    id: 2,
    bnId: '০২',
    name: '২. জিনিয়া',
    subtitle: 'উজ্জ্বল রঙ দারুণ পাপড়ি',
    iconBg: '#fdf2f8',
    color: '#db2777',
  },
  {
    id: 3,
    bnId: '০৩',
    name: '৩. সূর্যমুখী',
    subtitle: 'উজ্জ্বল ফুল, টবের কানায় সেরা',
    iconBg: '#fff7ed',
    color: '#ea580c',
  },
  {
    id: 4,
    bnId: '০৪',
    name: '৪. ফ্রেঞ্চ গাঁদা',
    subtitle: 'ঝাঁকড়া bloom ও সুবাস',
    iconBg: '#fef3c7',
    color: '#d97706',
  },
  {
    id: 5,
    bnId: '০৫',
    name: '৫. কসমস',
    subtitle: 'বাতাসে দোলানো প্রজাপতি',
    iconBg: '#f3e8ff',
    color: '#9333ea',
  },
  {
    id: 6,
    bnId: '০৬',
    name: '৬. সানফ্লাওয়ার',
    subtitle: 'সোনালী গ্রোথ ছাদে সুন্দর',
    iconBg: '#fef9c3',
    color: '#ca8a04',
  },
  {
    id: 7,
    bnId: '০৭',
    name: '৭. দোলনচাঁপা',
    subtitle: 'সাদা মিষ্টি সুবাসের স্নিগ্ধতা',
    iconBg: '#ccfbf1',
    color: '#0d9488',
  },
  {
    id: 8,
    bnId: '০৮',
    name: '৮. সূর্যমুখী',
    subtitle: 'বড় আকারের আকর্ষণীয় ফুল',
    iconBg: '#fef3c7',
    color: '#b45309',
  },
  {
    id: 9,
    bnId: '০৯',
    name: '৯. মর্নিং গ্লোরি',
    subtitle: 'লতানো স্বভাব, ভোরবেলার bloom',
    iconBg: '#e0e7ff',
    color: '#4f46e5',
  },
  {
    id: 10,
    bnId: '১০',
    name: '১০. গন্দা',
    subtitle: 'ছোট পাত্র বা বারান্দায় চমৎকার',
    iconBg: '#e0f2fe',
    color: '#0284c7',
  },
];

export interface PackageTier {
  id: string;
  badge?: string;
  topBadge?: string;
  tag: string;
  title: string;
  subtitle: string;
  price: number;
  regularPrice: number;
  deliveryNote: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export const PACKAGES: PackageTier[] = [
  {
    id: 'single',
    tag: 'ট্রায়াল প্যাক',
    title: '১ প্যাক — শুরুটা এখান থেকেই',
    subtitle: '১০টি জাতের কম্বো সেট (১০ প্যাকেট বীজ)',
    price: 280,
    regularPrice: 0,
    deliveryNote: '🚚 + ৳৮০ ডেলিভারি চার্জ',
    features: [
      '✓ একই ১০টি জাতের ১০ প্যাকেট বীজ',
      '✓ Planting Guide PDF ফ্রি',
      '✓ Cash on Delivery',
    ],
    ctaText: '১ প্যাক নেব',
  },
  {
    id: 'double',
    tag: 'ডাবল সেভিংস',
    badge: 'FREE DELIVERY',
    topBadge: '★ সবচেয়ে জনপ্রিয়',
    title: '২ প্যাক — DOUBLE COMBO',
    subtitle: 'একই ১০টি প্রিমিয়াম জাত, কিন্তু বেশি টব ও বড় বাগানের জন্য দ্বিগুণ বীজ সাশ্রয়ী দামে।',
    price: 499,
    regularPrice: 660,
    deliveryNote: '✓ সম্পূর্ণ ফ্রি ডেলিভারি',
    features: [
      '✓ ১০টি জাতেরই ডাবল পরিমাণ বীজ (মোট ২০ প্যাকেট)',
      '✓ Free Delivery সারা দেশে',
      '✓ Planting Guide PDF ফ্রি',
      '✓ Cash on Delivery',
    ],
    ctaText: '★ ২ প্যাক নেব →',
    isPopular: true,
  },
  {
    id: 'triple',
    tag: 'মেগা সেভার',
    badge: 'FREE DELIVERY',
    title: '৩ প্যাক — MEGA COMBO',
    subtitle: 'বড় ছাদবাগানের জন্য একই ১০টি জাতের ৩ গুণ বীজ, প্রতি প্যাকে সবচেয়ে বেশি সাশ্রয়।',
    price: 650,
    regularPrice: 940,
    deliveryNote: '✓ সম্পূর্ণ ফ্রি ডেলিভারি',
    features: [
      '✓ ১০টি জাতেরই ট্রিপল পরিমাণ বীজ (মোট ৩০ প্যাকেট)',
      '✓ Free Delivery সারা দেশে',
      '✓ Planting Guide PDF ফ্রি',
      '✓ Cash on Delivery',
    ],
    ctaText: '🌸 ৩ প্যাক নেব',
  },
];

export const TRUST_POINTS = [
  {
    icon: 'flask',
    title: 'নিজস্বভাবে germination test করা',
    description:
      'প্যাকেজিংয়ের পূর্বে প্রতিটি ব্যাচের অঙ্কুরোদগম ক্ষমতা আমাদের নিজস্ব নার্সারি সেন্টারে নির্ভরযোগ্য টেস্ট করা হয়।',
  },
  {
    icon: 'shield',
    title: '৯০%+ অঙ্কুরোদগম',
    description:
      'সঠিক আলো, আর্দ্রতা ও নির্দেশিকা অনুসরণ করলে ১০-১৫ দিনের মধ্যে বীজ সফলভাবে অঙ্কুরিত হয়ে গাছে পরিণত হতে শুরু করবে।',
  },
  {
    icon: 'plane',
    title: 'Thailand থেকে imported seed',
    description:
      'আন্তর্জাতিক মানসম্পন্ন নার্সারির পরীক্ষিত হাইব্রিড ভ্যারাইটি, যা উষ্ণ ও আর্দ্র আবহাওয়াতেও প্রচুর ফুল দেয়।',
  },
];

export const WHY_US_ITEMS = [
  {
    icon: 'plant',
    title: 'ভালো বীজ, ভালো শুরু',
    desc: 'নিজস্ব testing-এ ৯০%+ germination পাওয়া গেছে—সঠিকভাবে লাগালে ভালো চারা পাওয়ার সুযোগ অনেক বেশি।',
  },
  {
    icon: 'book',
    title: 'নতুন হলেও পারবেন',
    desc: 'Step-by-step Planting Guide-এ শুরু থেকে পরিচর্যা পর্যন্ত সহজভাবে দেখানো থাকবে। মাটি তৈরি থেকে সার দেওয়ার নিয়ম সব অন্তর্ভুক্ত।',
  },
  {
    icon: 'sun',
    title: 'বাংলাদেশে লাগানোর জন্য',
    desc: 'বাংলাদেশের rooftop, balcony ও টবের environment মাথায় রেখেই variety selection করা হয়েছে যা আমাদের জলবায়ুতে দ্রুত বাড়ে।',
  },
  {
    icon: 'box',
    title: 'Airtight Packaging',
    desc: 'প্রতিটি seed packet airtight moisture-protected packaging-এ রাখা, যাতে বীজের আর্দ্রতা ও অঙ্কুরোদগম সতেজতা অক্ষুণ্ণ থাকে।',
  },
];

export const THREE_STEPS = [
  {
    step: '১',
    title: 'অর্ডার করুন',
    desc: 'ফর্ম পূরণ করুন মাত্র ১ মিনিটে। কোনো অগ্রিম পেমেন্ট করতে হবে না।',
  },
  {
    step: '২',
    title: 'পার্সেল হাতে নিন',
    desc: 'ডেলিভারিম্যানের সামনে চেক করে ক্যাশ দিন। নিশ্চিন্ত ক্যাশ অন ডেলিভারি।',
  },
  {
    step: '৩',
    title: 'বীজ লাগানো শুরু করুন',
    desc: 'WhatsApp-এ পাওয়া গাইড দেখে টবে বা পাত্রে রোপণ করুন।',
  },
];

export const FAQ_LIST = [
  {
    id: 1,
    question: 'বীজ লাগানোর পর ৭ দিনেও চারা না উঠলে?',
    answer: 'আমাদের Thailand থেকে imported বীজগুলো ৯০%+ germination পরীক্ষিত। তবে মাটির আর্দ্রতা, তাপমাত্রা ও বীজ খুব বেশি গভীরে দিলে চারা বের হতে ১০-১৫ দিন পর্যন্ত সময় লাগতে পারে। এরপরেও কোনো সমস্যা হলে আমাদের ক্লেইম পলিসি অনুযায়ী যোগাযোগ করলে সমাধান পেয়ে যাবেন।',
  },
  {
    id: 2,
    question: 'কত দিনে গাছে ফুল পাবে?',
    answer: 'জাতভেদে ৩০ থেকে ৪৫ দিনের মধ্যে গাছে কুঁড়ি আসতে শুরু করে এবং ৩৫ থেকে ৫০ দিনের মধ্যে গাছ ফুলে ফুলে ভরে ওঠে। আমাদের দেওয়া Planting Guide-এ প্রতিটি জাতের জন্য নির্দিষ্ট সময় উল্লেখ আছে।',
  },
  {
    id: 3,
    question: 'আগে কি টাকা দিতে হবে?',
    answer: 'না, কোনো প্রকার অগ্রিম টাকা দিতে হবে না। ডেলিভারিম্যান পার্সেল নিয়ে গেলে আপনি প্যাকেট দেখে বুঝে নিয়ে সম্পূর্ণ ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধ করবেন।',
  },
];
