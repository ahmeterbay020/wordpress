import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-gray-600">
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-gray-600">
            Projeler
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-600">
            Hakkımızda
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-600">
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  );
}
