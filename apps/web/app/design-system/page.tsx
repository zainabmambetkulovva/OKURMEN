'use client';

import { Button } from '@/components/ui/Button';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">OKURMEN Design System</h1>
          <p className="text-xl text-white/90">
            Premium Modern EdTech • WHITE + BLUE + ORANGE
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Colors */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">🎨 Colors</h2>

          {/* Primary Blue */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              Primary Blue
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-full h-24 rounded-lg bg-primary-${shade} mb-2 shadow-sm`}
                    ></div>
                    <p className="text-sm font-semibold text-dark-700">
                      {shade}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Accent Orange */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              Accent Orange
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-full h-24 rounded-lg bg-accent-${shade} mb-2 shadow-sm`}
                    ></div>
                    <p className="text-sm font-semibold text-dark-700">
                      {shade}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Dark (Neutral) */}
          <div>
            <h3 className="text-2xl font-bold text-dark-900 mb-4">
              Dark (Text & Neutrals)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-full h-24 rounded-lg bg-dark-${shade} mb-2 shadow-sm`}
                    ></div>
                    <p className="text-sm font-semibold text-dark-700">
                      {shade}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            📝 Typography
          </h2>

          <div className="space-y-8 bg-gray-50 rounded-2xl p-8">
            <div>
              <p className="text-sm text-dark-600 mb-2">H1 / Hero Title</p>
              <h1 className="text-5xl sm:text-6xl font-bold text-dark-900 leading-tight">
                Transform Your Future with OKURMEN
              </h1>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">H2 / Section Title</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-dark-900">
                Why Choose OKURMEN?
              </h2>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">H3 / Subsection</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark-900">
                Premium IT Education
              </h3>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">H4 / Card Title</p>
              <h4 className="text-xl font-bold text-dark-900">
                Personal Mentor
              </h4>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">Body Large</p>
              <p className="text-lg text-dark-700 leading-relaxed">
                Hybrid format, personal mentor, and real results. Modern IT
                education for everyone.
              </p>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">Body Regular</p>
              <p className="text-base text-dark-700 leading-relaxed">
                OKURMEN is a modern IT education project founded in May 2022.
                We provide quality education with personal mentors.
              </p>
            </div>

            <div>
              <p className="text-sm text-dark-600 mb-2">Small Text</p>
              <p className="text-sm text-dark-600">
                Additional information and details in small text format.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            🔘 Buttons
          </h2>

          <div className="space-y-8">
            {/* Variants */}
            <div>
              <h3 className="text-xl font-bold text-dark-900 mb-4">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary (Orange)</Button>
                <Button variant="secondary">Secondary (Blue)</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xl font-bold text-dark-900 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="text-xl font-bold text-dark-900 mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button className="hover:shadow-orange">Hover Me</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            🎴 Cards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                🎓
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Default Card
              </h3>
              <p className="text-dark-600">
                Clean card with soft shadow and border.
              </p>
            </div>

            {/* Hover Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Hover Card
              </h3>
              <p className="text-dark-600">Hover me to see the effect!</p>
            </div>

            {/* Accent Card */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-4">
                💡
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Accent Card
              </h3>
              <p className="text-dark-700">Card with blue accent background.</p>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            ✨ Shadows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h3 className="text-xl font-bold text-dark-900 mb-2">Soft</h3>
              <p className="text-dark-600 text-sm">shadow-soft</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft-lg">
              <h3 className="text-xl font-bold text-dark-900 mb-2">
                Soft Large
              </h3>
              <p className="text-dark-600 text-sm">shadow-soft-lg</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-orange">
              <h3 className="text-xl font-bold text-dark-900 mb-2">Orange</h3>
              <p className="text-dark-600 text-sm">shadow-orange</p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            ⭕ Border Radius
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-full h-24 bg-primary-500 rounded-lg mb-2"></div>
              <p className="text-sm font-semibold">lg (8px)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary-500 rounded-xl mb-2"></div>
              <p className="text-sm font-semibold">xl (12px)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary-500 rounded-2xl mb-2"></div>
              <p className="text-sm font-semibold">2xl (16px)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-primary-500 rounded-3xl mb-2"></div>
              <p className="text-sm font-semibold">3xl (24px)</p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            📏 Spacing Scale
          </h2>

          <div className="space-y-3">
            {[
              { value: 1, px: 4 },
              { value: 2, px: 8 },
              { value: 3, px: 12 },
              { value: 4, px: 16 },
              { value: 6, px: 24 },
              { value: 8, px: 32 },
              { value: 12, px: 48 },
              { value: 16, px: 64 },
              { value: 24, px: 96 },
            ].map((spacing) => (
              <div key={spacing.value} className="flex items-center gap-4">
                <div className="w-20 text-sm font-semibold text-dark-700">
                  {spacing.value} ({spacing.px}px)
                </div>
                <div
                  className="bg-primary-500 h-8 rounded"
                  style={{ width: `${spacing.px}px` }}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* Icons */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            🎨 Icon Containers
          </h2>

          <div className="flex flex-wrap gap-6">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-3xl">
              🎓
            </div>
            <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center text-3xl">
              🚀
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
              💡
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-4xl text-white shadow-soft">
              ⭐
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            🏷️ Badges & Tags
          </h2>

          <div className="flex flex-wrap gap-4">
            <span className="px-5 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Primary Badge
            </span>
            <span className="px-5 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold">
              Accent Badge
            </span>
            <span className="px-5 py-2 bg-white border border-gray-200 text-dark-700 rounded-full text-sm font-semibold shadow-soft">
              White Badge
            </span>
            <span className="px-5 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full text-sm font-semibold">
              Gradient Badge
            </span>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-dark-900 mb-8">
            📝 Form Elements
          </h2>

          <div className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-semibold text-dark-800 mb-2">
                Input Field
              </label>
              <input
                type="text"
                placeholder="Enter text here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-800 mb-2">
                Select
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-800 mb-2">
                Textarea
              </label>
              <textarea
                rows={4}
                placeholder="Enter message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
              ></textarea>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80">
            OKURMEN Design System v1.0.0 • Premium Modern EdTech
          </p>
        </div>
      </footer>
    </div>
  );
}
