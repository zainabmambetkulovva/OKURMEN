'use client';

import { useEffect, useState } from 'react';
import { FileText, Search, Filter, Eye, CheckCircle, XCircle, Clock, Phone, Mail, Calendar } from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName?: string;
  message?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:3002/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:3002/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        fetchApplications();
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'APPROVED': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'APPROVED': return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Ожидает';
      case 'APPROVED': return 'Одобрено';
      case 'REJECTED': return 'Отклонено';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Заявки</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Всего заявок: {applications.length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по имени, email или телефону..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="ALL">Все статусы</option>
            <option value="PENDING">Ожидает</option>
            <option value="APPROVED">Одобрено</option>
            <option value="REJECTED">Отклонено</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Ожидают</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {applications.filter(a => a.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Одобрено</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {applications.filter(a => a.status === 'APPROVED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">Отклонено</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {applications.filter(a => a.status === 'REJECTED').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Заявок не найдено</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Имя
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Контакты
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Курс
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {app.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          {app.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {app.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {app.courseName || 'Курс не указан'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.createdAt).toLocaleDateString('ru-RU')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Просмотр
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Детали заявки
                </h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Полное имя</label>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{selectedApp.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedApp.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Телефон</label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedApp.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Курс</label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">{selectedApp.courseName || 'Не указан'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Дата подачи</label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {new Date(selectedApp.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Статус</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApp.status)}`}>
                      {getStatusIcon(selectedApp.status)}
                      {getStatusText(selectedApp.status)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedApp.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Сообщение</label>
                  <p className="mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    {selectedApp.message}
                  </p>
                </div>
              )}

              {selectedApp.status === 'PENDING' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'APPROVED')}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Одобрить
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'REJECTED')}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Отклонить
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
