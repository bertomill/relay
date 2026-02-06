export interface Theme {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Topic {
  id: string;
  theme_id: string;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Post {
  id: string;
  topic_id: string;
  platform: "x" | "medium" | "linkedin" | "instagram" | "youtube";
  title: string;
  url: string | null;
  excerpt: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

export interface TopicWithPosts extends Topic {
  posts: Post[];
}

export interface ThemeWithTopics extends Theme {
  topics: TopicWithPosts[];
}
