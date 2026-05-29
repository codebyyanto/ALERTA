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