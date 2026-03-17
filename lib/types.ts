export interface Article {
  title: string;
  byline: string;
  body: string;
}

export interface Advertisement {
  brand: string;
  headline: string;
  copy: string;
  tagline: string;
}

export interface Opinion {
  title: string;
  body: string;
}

export interface Sidebar {
  title: string;
  items: string[];
}

export interface YearContent {
  year: number;
  masthead: string;
  edition: string;
  price: string;
  date: string;
  imageUrl?: string; // local path e.g. /images/years/1940.png
  // Main story
  headline: string;
  subheadline: string;
  mainArticle: {
    byline: string;
    body: string; // paragraphs separated by double newline
  };
  // Supporting stories
  secondStory: Article;
  thirdStory: Article;
  fourthStory: Article;
  // Briefs / shorts
  briefs: string[];
  // Ads
  advertisement: Advertisement;
  secondAd: Advertisement;
  // Departments
  weather: string;
  sports: string;
  culturalNote: string;
  markets: string;
  opinion: Opinion;
  sidebar: Sidebar;
  pullQuote: string;
  pullQuoteAttribution: string;
}
