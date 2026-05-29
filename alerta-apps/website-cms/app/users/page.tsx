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