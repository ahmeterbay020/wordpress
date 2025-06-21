import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl =
    project.acf?.featured_image_url ||
    project._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/images/default-project.jpg';
  const imageAlt = project.title.rendered.replace(/<[^>]+>/g, '') + ' proje görseli';
  const projectStatus =
    project.acf?.status === 'devam-eden'
      ? 'Devam Eden'
      : project.acf?.status === 'tamamlanan'
      ? 'Tamamlanan'
      : '';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} title={project.title.rendered.replace(/<[^>]+>/g, '')} className="flex flex-col h-full">
        {/* Image and Status Badge */}
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            title={imageAlt}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {projectStatus && (
            <span
              className={`absolute top-4 left-4 rounded border bg-white px-3 py-1 text-sm font-semibold shadow-md ${
                project.acf?.status === 'devam-eden'
                  ? 'border-green-500 text-green-700'
                  : 'border-gray-400 text-gray-700'
              }`}
            >
              {projectStatus}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Title */}
          <h2
            className="text-2xl font-bold text-gray-800"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />

          {/* Location */}
          {project.acf?.location && (
            <div className="mt-2 flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{project.acf.location}</span>
            </div>
          )}

          {/* Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.acf?.kategori && (
              <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                {project.acf.kategori}
              </span>
            )}
            {project.acf?.yil && (
              <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                {project.acf.yil}
              </span>
            )}
            {project.acf?.blok && (
              <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                {project.acf.blok}
              </span>
            )}
            {project.acf?.daire && (
              <span className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                {project.acf.daire}
              </span>
            )}
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow" />

          {/* Separator and Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-end">
              <span className="font-semibold text-blue-600 group-hover:text-blue-800">
                İNCELE →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
