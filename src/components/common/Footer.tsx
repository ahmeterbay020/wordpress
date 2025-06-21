export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Özpinarlar İnşaat. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
