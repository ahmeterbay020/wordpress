export interface Project {
  id: number;
  slug: string; // <-- Bunu ekleyin
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    location: string;
    status: 'devam-eden' | 'tamamlanan';
    featured_image: number;
    proje_baslangic_tarihi?: string;
    featured_image_url?: string;
    // Yeni eklenen alanlar
    kategori?: string;
    yil?: string;
    blok?: string;
    daire?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}