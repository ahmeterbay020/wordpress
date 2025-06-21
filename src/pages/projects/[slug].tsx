import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WORDPRESS_API_URL } from "../../lib/wordpress";
import type { Project } from "../../types";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${WORDPRESS_API_URL}/wp/v2/projects?slug=${slug}`
        );
        if (!res.ok) throw new Error("Proje bulunamadı.");
        const data = await res.json();
        setProject(data[0] || null);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Hata: {error}</div>;
  if (!project) return <div className="p-8 text-center">Proje bulunamadı.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
      <div className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
      {project.acf?.location && (
        <div className="mb-2 text-gray-600">Lokasyon: {project.acf.location}</div>
      )}
      {project.acf?.status && (
        <div className="mb-2 text-gray-600">Durum: {project.acf.status}</div>
      )}
    </div>
  );
}
