'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Search,
  Bell,
  HelpCircle,
  Plus,
  Edit3,
  Trash2,
  X,
  UserPlus,
  Users as UsersIcon,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

const roleFilters = ['Semua Pengguna', 'ADMIN', 'USER'];

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua Pengguna');

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('USER');

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function resetForm() {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormPassword('');
    setFormRole('USER');
    setCurrentUser(null);
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/users', {
        name: formName,
        email: formEmail,
        phone: formPhone || undefined,
        password: formPassword || undefined,
        role: formRole,
      });
      setUsers([res.data, ...users]);
      setIsAddOpen(false);
      resetForm();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal menambahkan pengguna';
      alert(msg);
      console.error(err);
    }
  }

  function openEditModal(user: any) {
    setCurrentUser(user);
    setFormName(user.name || '');
    setFormEmail(user.email || '');
    setFormPhone(user.phone || '');
    setFormRole(user.role || 'USER');
    setFormPassword('');
    setIsEditOpen(true);
  }

  async function handleEditUser(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUser) return;
    try {
      const res = await api.patch(`/users/${currentUser.id}`, {
        name: formName,
        email: formEmail,
        phone: formPhone || undefined,
        password: formPassword || undefined,
        role: formRole,
      });
      setUsers(users.map(u => u.id === currentUser.id ? res.data : u));
      setIsEditOpen(false);
      resetForm();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal memperbarui pengguna';
      alert(msg);
      console.error(err);
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini secara permanen?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Gagal menghapus pengguna');
      console.error(err);
    }
  }

  const getInitials = (name: string) => {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-emerald-500',
      'bg-amber-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = (u.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesRole = activeFilter === 'Semua Pengguna' ||
      u.role?.toUpperCase() === activeFilter.toUpperCase();
    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;
  const standardCount = users.filter(u => u.role === 'USER').length;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Top Header Area */}
        <header className="flex items-center justify-between mb-12">
          <div className="relative w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau email pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#E0F2FE]/50 border-none rounded-2xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-[#C8102E]/10"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#C8102E] rounded-full border-2 border-white" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <HelpCircle size={22} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <span className="text-[14px] font-black text-slate-800">ALERTA CMS</span>
          </div>
        </header>

        {/* Title Area */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-[32px] font-black text-slate-800 tracking-tighter italic uppercase">
              Manajemen Pengguna
            </h1>
            <p className="text-slate-500 font-medium">
              Kelola akun administrator panel dan akun masyarakat pengguna aplikasi mobile ALERTA.
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setIsAddOpen(true); }}
            className="bg-[#C8102E] text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-red-200 hover:bg-[#b00e28] transition-all active:scale-[0.98]"
          >
            <UserPlus size={18} />
            Tambah Pengguna Baru
          </button>
        </div>

        {/* Dynamic Cards Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UsersIcon size={26} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Pengguna</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{totalUsers}</h3>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#C8102E]">
              <ShieldAlert size={26} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Administrator Panel</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{adminCount}</h3>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserCheck size={26} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pengguna Mobile (User)</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{standardCount}</h3>
            </div>
          </div>
        </div>

        {/* Filter & Main Grid Content */}
        <div className="space-y-6">
          <div className="flex gap-2">
            {roleFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-6 py-2.5 rounded-full font-bold text-xs transition-all tracking-wider uppercase border",
                    isActive
                      ? "bg-[#C8102E] border-[#C8102E] text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  )}
                >
                  {filter === 'Semua Pengguna' ? 'Semua Pengguna' : `${filter} (${users.filter(u => u.role === filter).length})`}
                </button>
              );
            })}
          </div>

          {/* Users Table */}
          <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#C8102E]/30 border-t-[#C8102E] rounded-full animate-spin mb-4" />
                <span className="text-slate-500 font-bold">Memuat daftar pengguna...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <span className="text-slate-400 font-bold text-lg">Tidak ada pengguna yang cocok</span>
                <span className="text-slate-400 text-sm mt-1">Coba gunakan kata kunci atau filter lain</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-8">Pengguna</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Telepon</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Terdaftar Pada</th>
                      <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest pr-8 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
                        {/* Avatar & Name */}
                        <td className="p-6 pl-8 flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm",
                            getAvatarColor(user.name || '')
                          )}>
                            {getInitials(user.name || '')}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-slate-800">{user.name || 'Anonymous'}</p>
                            <span className={cn(
                              "text-[8px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase inline-block mt-1",
                              user.role === 'ADMIN' ? "bg-red-50 text-[#C8102E]" : "bg-emerald-50 text-emerald-600"
                            )}>
                              {user.role}
                            </span>
                          </div>
                        </td>
                        {/* Email */}
                        <td className="p-6 text-[14px] font-medium text-slate-600">{user.email}</td>
                        {/* Phone */}
                        <td className="p-6 text-[14px] font-medium text-slate-600">{user.phone || '-'}</td>
                        {/* Registered Date */}
                        <td className="p-6 text-[14px] font-medium text-slate-400">
                          {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        {/* Actions */}
                        <td className="p-6 pr-8 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="p-2 text-slate-400 hover:text-[#C8102E] hover:bg-slate-50 rounded-xl transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            {user.email !== 'admin@alerta.go.id' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ADD USER MODAL --- */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[560px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 italic uppercase">Tambah Pengguna Baru</h3>
                <p className="text-sm text-slate-400 font-medium">Buat akun admin panel atau masyarakat mobile</p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nomor Telepon</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Kata Sandi</label>
                  <input
                    type="password"
                    required
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Peran (Role)</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  >
                    <option value="USER">USER (Masyarakat Mobile)</option>
                    <option value="ADMIN">ADMIN (Panel Kontrol CMS)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-5 py-3 border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C8102E] text-white rounded-2xl font-bold text-sm hover:bg-[#b00e28] shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                >
                  Buat Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-[999] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-[560px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-800 italic uppercase">Ubah Informasi Pengguna</h3>
                <p className="text-sm text-slate-400 font-medium">Perbarui profil atau ubah peran pengguna</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Budi Santoso"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Nomor Telepon</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Ubah Kata Sandi (Opsional)</label>
                  <input
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="Biarkan kosong jika tidak diubah"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Peran (Role)</label>
                  <select
                    value={formRole}
                    disabled={currentUser?.email === 'admin@alerta.go.id'}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 disabled:opacity-50"
                  >
                    <option value="USER">USER (Masyarakat Mobile)</option>
                    <option value="ADMIN">ADMIN (Panel Kontrol CMS)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-3 border border-slate-200 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C8102E] text-white rounded-2xl font-bold text-sm hover:bg-[#b00e28] shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
