'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Star,
  UserCircle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  GraduationCap,
  BookOpen,
  BarChart3,
  Shield,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function EmployeeLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/signin');
  };

  // Navigation based on role
  const getNavigation = () => {
    const baseNav = [
      { name: t('nav.dashboard'), href: '/employee', icon: LayoutDashboard },
    ];

    // Куратор/Менеджер - видит заявки и студентов
    if (user?.position === 'CURATOR' || user?.position === 'MANAGER') {
      baseNav.push(
        { name: 'Заявки', href: '/employee/applications', icon: FileText },
        { name: 'Студенты', href: '/employee/students', icon: GraduationCap },
        { name: 'Сообщения', href: '/employee/messages', icon: MessageSquare },
      );
    }

    // Ментор
    if (user?.position === 'MENTOR') {
      baseNav.push(
        { name: 'Моя Группа', href: '/employee/group', icon: Users },
        { name: 'Студенты', href: '/employee/students', icon: GraduationCap },
        { name: 'Разрешения', href: '/employee/permissions', icon: Shield },
        { name: 'Аналитика', href: '/employee/analytics', icon: BarChart3 },
      );
    }

    // Учитель
    if (user?.position === 'TEACHER') {
      baseNav.push(
        { name: 'Курсы', href: '/employee/courses', icon: BookOpen },
        { name: 'Уроки', href: '/employee/lessons', icon: GraduationCap },
      );
    }

    // Общие для всех
    baseNav.push(
      { name: 'Расписание', href: '/employee/schedule', icon: Calendar },
      { name: 'Отзывы', href: '/employee/reviews', icon: Star },
    );

    return baseNav;
  };

  const navigation = getNavigation();

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'ky', name: 'Кыргызча' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/employee" className="flex items-center space-x-3 group">
              <img 
                src={theme === 'dark' ? '/logo.svg' : '/logo.svg'}
                alt="ОКУРМЕН" 
                className="w-10 h-10 flex-shrink-0"
              />
              {sidebarOpen && (
                <div>
                  <h1 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-[#FF6B00]'
                  }`}>
                    ОКУРМЭН
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.position === 'CURATOR' ? 'Куратор' : 
                     user.position === 'MANAGER' ? 'Менеджер' :
                     user.position === 'MENTOR' ? 'Ментор' : 'Учитель'}
                  </p>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User & Settings */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {user && sidebarOpen && (
              <div className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            )}
            
            <Link
              href="/employee/profile"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                pathname === '/employee/profile'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <UserCircle className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Профиль</span>}
            </Link>

            <Link
              href="/employee/settings"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                pathname === '/employee/settings'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <SettingsIcon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Настройки</span>}
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Выйти</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {navigation.find((item) => item.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                
                {langMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            language === lang.code
                              ? 'text-orange-600 dark:text-orange-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
