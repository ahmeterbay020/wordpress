import { useEffect, useState } from "react";
import { getProjects } from "../../lib/wordpress";
import type { Project } from "../../types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Hata: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projeler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
            <div className="text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
            {project.acf?.location && (
              <div className="text-sm text-gray-500 mb-1">Lokasyon: {project.acf.location}</div>
            )}
            {project.acf?.status && (
              <div className="text-sm text-gray-500 mb-1">Durum: {project.acf.status}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
