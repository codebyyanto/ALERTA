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
      <div className="p-8"></div>
      {/* Top Header Area */}
      <header className="flex items-center justify-between mb-12"></header>
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
      <div className="flex items-center gap-6"></div>
      {/* Title Area */}
      <div className="flex items-end justify-between mb-10"></div>
      <button
        onClick={() => { resetForm(); setIsAddOpen(true); }}
        {/* Dynamic Cards Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="flex gap-2">
          {roleFilters.map((filter) => {