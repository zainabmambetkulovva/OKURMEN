'use client';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ОКУРМЭН IT</h3>
            <p className="text-gray-400">
              Современное IT-образование в Кыргызстане
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('#about')} className="hover:text-white transition-colors">
                  О нас
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#courses')} className="hover:text-white transition-colors">
                  Курсы
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('#contacts')} className="hover:text-white transition-colors">
                  Контакты
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Бишкек, Кыргызстан</li>
              <li>
                <a href="tel:+996990686889" className="hover:text-white transition-colors">
                  +996 990 686 889
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ОКУРМЭН IT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
