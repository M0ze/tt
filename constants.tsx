
import { TrendItem } from './types';

export const MOCK_TRENDS: TrendItem[] = [
  {
    id: '1',
    title: 'The Kampala Weekend Challenge',
    category: 'Lifestyle',
    growth: 450,
    views: '1.2M',
    hashtags: ['#UgandaTikTok', '#KLAWeekend', '#VisitUganda'],
    sound: 'Local Afrobeat Mix - DJ Roja'
  },
  {
    id: '2',
    title: 'Boda Boda POV Storytelling',
    category: 'Comedy',
    growth: 280,
    views: '800K',
    hashtags: ['#BodaBodaChronicles', '#UgandanComedy', '#KampalaLife'],
    sound: 'Engine Revving + Catchy Hook'
  },
  {
    id: '3',
    title: 'Rolex Making Aesthetics',
    category: 'Food',
    growth: 150,
    views: '500K',
    hashtags: ['#UgandaFood', '#RolexChallenge', '#StreetFood'],
    sound: 'Sizzling Sound - ASMR'
  },
  {
    id: '4',
    title: 'Kadongo Kamu Modern Remix',
    category: 'Music',
    growth: 600,
    views: '2.1M',
    hashtags: ['#UgandanMusic', '#CultureRemix', '#KadongoKamu'],
    sound: 'Fresh Kadongo Kamu Beat 2024'
  }
];

export const CATEGORIES = ['All', 'Comedy', 'Music', 'Food', 'Dance', 'Lifestyle', 'Education'];
