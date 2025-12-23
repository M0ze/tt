
export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO'
}

export interface User {
  id: string;
  name: string;
  tier: SubscriptionTier;
  usageCount: number;
}

export interface TrendItem {
  id: string;
  title: string;
  category: string;
  growth: number;
  views: string;
  hashtags: string[];
  sound: string;
}

export interface VideoIdea {
  title: string;
  script: string;
  sound: string;
  hashtags: string[];
  whyViral: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
