import { useEffect, useState } from "react";
import { WORDPRESS_API_URL } from "../lib/wordpress";
import Image from 'next/image';
import ProjectCard from "../components/projects/ProjectCard";
import type { Project } from "../types";

export default function HomePage() {
  const [banner, setBanner] = useState<string | null>(null);
  const [slogan, setSlogan] = useState<string | null>(null);
  const [intro, setIntro] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [about, setAbout] = useState<string | null>(null);

  useEffect(() => {
    // Banner ve slogan
    fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=ana-sayfa`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          setBanner(data[0].acf?.banner_gorsel || null);
          setSlogan(data[0].acf?.slogan || null);
          setIntro(data[0].content?.rendered || null);
        }
      });

    // Öne çıkan projeler
    fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/projects?per_page=3&status=publish`)
      .then(res => res.json())
      .then(setProjects);

    // Hakkımızda özeti
    fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=hakkimizda`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) setAbout(data[0].content?.rendered || null);
      });
  }, []);

  return (
    <div>
      {/* Banner */}
      {banner && (
        <div className="relative w-full h-72 md:h-96 mb-8">
          <Image
            src={banner}
            alt="Banner"
            fill
            className="object-cover"
          />
          {slogan && (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-3xl md:text-5xl font-bold bg-black bg-opacity-50 px-6 py-2 rounded">{slogan}</h1>
            </div>
          )}
        </div>
      )}

      {/* Kısa Tanıtım */}
      {intro && (
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center text-lg" dangerouslySetInnerHTML={{ __html: intro }} />
        </div>
      )}

      {/* Öne Çıkan Projeler */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">Öne Çıkan Projeler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Hakkımızda Özeti */}
      {about && (
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Hakkımızda</h2>
          <div dangerouslySetInnerHTML={{ __html: about }} />
        </div>
      )}
    </div>
  );
}
