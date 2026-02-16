import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter23() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard-ui");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("✅ کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400", title = "" }) => (
    <div className="relative my-8">
      {title && (
        <div className="mb-2 text-sm font-bold text-sky-400" dir="rtl">
          {title}
        </div>
      )}
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-gray-500">{code.split('\n').length} لائنیں</div>
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Code
        </button>
      </div>
      <pre
        className={`bg-gray-900 ${colorClass} p-5 rounded-xl text-left font-mono overflow-x-auto text-sm md:text-base border border-gray-800 shadow-lg`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  // Tabs for different sections
  const tabs = [
    { id: "dashboard-ui", label: "🎛️ Dashboard UI", color: "blue" },
    { id: "my-courses", label: "📚 My Courses", color: "green" },
    { id: "progress", label: "📊 Progress Tracking", color: "purple" },
    { id: "certificate", label: "🏆 Certificate System", color: "red" }
  ];

  // Section 23.1: Student Dashboard UI
  const dashboardUICode = `// app/dashboard/page.jsx - Student Dashboard Main Page
'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Award, TrendingUp, 
  Calendar, Target, BarChart3, PlayCircle,
  ChevronRight, Download, Share2, Star,
  CheckCircle, AlertCircle, Loader2
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  // Fetch dashboard data
  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [statsRes, activityRes, deadlinesRes, recommendationsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/activity'),
        fetch('/api/dashboard/deadlines'),
        fetch('/api/dashboard/recommendations')
      ]);
      
      const [statsData, activityData, deadlinesData, recommendationsData] = await Promise.all([
        statsRes.json(),
        activityRes.json(),
        deadlinesRes.json(),
        recommendationsRes.json()
      ]);
      
      if (statsData.success) setStats(statsData.data);
      if (activityData.success) setRecentActivity(activityData.data);
      if (deadlinesData.success) setUpcomingDeadlines(deadlinesData.data);
      if (recommendationsData.success) setRecommendedCourses(recommendationsData.data);
      
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Stats cards data
  const statCards = [
    {
      id: 'enrolled',
      title: 'Enrolled Courses',
      value: stats?.enrolledCourses || 0,
      icon: BookOpen,
      color: 'blue',
      change: '+12%',
      changeType: 'increase'
    },
    {
      id: 'hours',
      title: 'Learning Hours',
      value: stats?.learningHours || 0,
      icon: Clock,
      color: 'green',
      change: '+2.5h',
      changeType: 'increase'
    },
    {
      id: 'completed',
      title: 'Completed Courses',
      value: stats?.completedCourses || 0,
      icon: Award,
      color: 'purple',
      change: '+3',
      changeType: 'increase'
    },
    {
      id: 'streak',
      title: 'Current Streak',
      value: stats?.currentStreak || 0,
      icon: TrendingUp,
      color: 'orange',
      change: '🔥',
      changeType: 'neutral'
    }
  ];
  
  // Quick actions
  const quickActions = [
    {
      id: 'continue',
      title: 'Continue Learning',
      description: 'Resume where you left off',
      icon: PlayCircle,
      color: 'blue',
      action: () => router.push('/my-courses/continue')
    },
    {
      id: 'schedule',
      title: 'Today\'s Schedule',
      description: 'View planned study sessions',
      icon: Calendar,
      color: 'green',
      action: () => router.push('/schedule')
    },
    {
      id: 'goals',
      title: 'Learning Goals',
      description: 'Track your progress',
      icon: Target,
      color: 'purple',
      action: () => router.push('/goals')
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Detailed performance insights',
      icon: BarChart3,
      color: 'red',
      action: () => router.push('/analytics')
    }
  ];
  
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {session?.user?.name}!
              </h1>
              <p className="text-blue-100">
                Continue your learning journey today
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-blue-200">Today's Goal</p>
                <p className="text-xl font-bold">60 minutes</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
            };
            
            return (
              <div
                key={card.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={\`p-3 rounded-lg \${colorClasses[card.color]}\`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={\`text-sm font-medium px-2 py-1 rounded-full \${card.changeType === 'increase' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}\`}>
                    {card.change}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {card.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
                <button
                  onClick={() => router.push('/my-courses')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const colorClasses = {
                    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  };
                  
                  return (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all text-left"
                    >
                      <div className={\`p-3 rounded-lg \${colorClasses[action.color]}\`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Right Column - Upcoming Deadlines */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Upcoming Deadlines
              </h2>
              
              {upcomingDeadlines.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No upcoming deadlines
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingDeadlines.slice(0, 3).map((deadline) => (
                    <div
                      key={deadline.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {deadline.title}
                        </h3>
                        <span className={\`text-xs px-2 py-1 rounded-full \${deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}\`}>
                          {deadline.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {deadline.course}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {deadline.dueDate}
                        </span>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {upcomingDeadlines.length > 3 && (
                <button className="w-full mt-4 py-2 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg">
                  View All ({upcomingDeadlines.length})
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Activity & Recommended Courses */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  See All Activity
                </button>
              </div>
              
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No recent activity
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className={\`p-2 rounded-full \${activity.type === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}\`}>
                        {activity.type === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <PlayCircle className="w-5 h-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.course}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Recommended Courses */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recommended For You
              </h2>
              
              {recommendedCourses.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No recommendations yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="group cursor-pointer"
                      onClick={() => router.push(\`/courses/\${course.id}\`)}
                    >
                      <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course.instructor}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={\`w-3 h-3 \${i < course.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}\`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({course.reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button className="w-full mt-4 py-2 text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg">
                Browse More Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Section 23.2: My Courses Page
  const myCoursesCode = `// app/my-courses/page.jsx - My Courses Listing
'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, PlayCircle, CheckCircle, 
  TrendingUp, Filter, Search, Grid, List,
  ChevronRight, MoreVertical, Download, Share2,
  Loader2, AlertCircle
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MyCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all'); // all, in-progress, completed, saved
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter options
  const filters = [
    { id: 'all', label: 'All Courses', count: 0 },
    { id: 'in-progress', label: 'In Progress', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'saved', label: 'Saved for Later', count: 0 }
  ];
  
  // Fetch enrolled courses
  useEffect(() => {
    if (status === 'authenticated') {
      fetchMyCourses();
    }
  }, [status, filter]);
  
  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(\`/api/my-courses?filter=\${filter}\`);
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data.courses);
        // Update filter counts
        filters[0].count = data.data.stats.total;
        filters[1].count = data.data.stats.inProgress;
        filters[2].count = data.data.stats.completed;
        filters[3].count = data.data.stats.saved;
      }
    } catch (error) {
      console.error('Fetch courses error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate course progress
  const calculateProgress = (course) => {
    const totalLectures = course.totalLectures || 1;
    const completedLectures = course.progress?.completedLectures?.length || 0;
    return Math.round((completedLectures / totalLectures) * 100);
  };
  
  // Get course status
  const getCourseStatus = (course) => {
    const progress = calculateProgress(course);
    if (progress === 0) return 'not-started';
    if (progress === 100) return 'completed';
    return 'in-progress';
  };
  
  // Filter courses by search
  const filteredCourses = courses.filter(course => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.instructor?.name?.toLowerCase().includes(query) ||
      course.category?.name?.toLowerCase().includes(query)
    );
  });
  
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Courses
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and continue your learning journey
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/courses')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse New Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  className={\`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 \${filter === filterItem.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}\`}
                >
                  {filterItem.label}
                  <span className={\`text-xs px-1.5 py-0.5 rounded-full \${filter === filterItem.id ? 'bg-white/20' : 'bg-gray-300 dark:bg-gray-700'}\`}>
                    {filterItem.count}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Search and View Toggle */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search my courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-64"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={\`p-2 \${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}\`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={\`p-2 \${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}\`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filters[0].count}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filters[1].count}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filters[2].count}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.length > 0 
                      ? Math.round(courses.reduce((acc, course) => acc + calculateProgress(course), 0) / courses.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Courses Grid/List */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery 
                ? 'No courses match your search query'
                : filter === 'completed' 
                  ? 'You haven\'t completed any courses yet'
                  : filter === 'saved'
                    ? 'You haven\'t saved any courses for later'
                    : 'You haven\'t enrolled in any courses yet'}
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Courses
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const progress = calculateProgress(course);
              const status = getCourseStatus(course);
              
              return (
                <div
                  key={course._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(\`/my-courses/\${course._id}\`)}
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                    
                    {/* Progress Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={\`px-3 py-1 rounded-full text-sm font-medium \${status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}\`}>
                        {status === 'completed' ? 'Completed' : \`\${progress}%\`}
                      </div>
                    </div>
                    
                    {/* Continue Button */}
                    {status === 'in-progress' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(\`/my-courses/\${course._id}/continue\`);
                        }}
                        className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <PlayCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.instructor?.name || 'Unknown Instructor'}
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle more options
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={\`h-full rounded-full \${status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}\`}
                          style={{ width: \`\${progress}%\` }}
                        />
                      </div>
                    </div>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.durationInHours || 0}h</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.totalLectures || 0} lectures</span>
                      </div>
                      
                      {status === 'completed' && course.certificate?.issued && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(\`/certificates/\${course.certificate.certificateId}\`);
                          }}
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Download className="w-4 h-4" />
                          Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredCourses.map((course) => {
              const progress = calculateProgress(course);
              const status = getCourseStatus(course);
              
              return (
                <div
                  key={course._id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => router.push(\`/my-courses/\${course._id}\`)}
                >
                  <div className="flex">
                    {/* Course Thumbnail */}
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                        </div>
                      )}
                    </div>
                    
                    {/* Course Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.shortDescription || course.description?.substring(0, 150)}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.category?.name || 'Uncategorized'}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{course.durationInHours || 0} total hours</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <PlayCircle className="w-4 h-4" />
                              <span>{course.totalLectures || 0} lectures</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {/* Progress Badge */}
                          <div className={\`px-3 py-1 rounded-full text-sm font-medium \${status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}\`}>
                            {status === 'completed' ? 'Completed' : \`\${progress}% Complete\`}
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {status === 'in-progress' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(\`/my-courses/\${course._id}/continue\`);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                              >
                                <PlayCircle className="w-4 h-4" />
                                Continue
                              </button>
                            )}
                            
                            {status === 'completed' && course.certificate?.issued && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(\`/certificates/\${course.certificate.certificateId}\`);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Certificate
                              </button>
                            )}
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle more options
                              }}
                              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={\`h-full rounded-full \${status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}\`}
                            style={{ width: \`\${progress}%\` }}
                          />
                        </div>
                      </div>
                      
                      {/* Last Accessed */}
                      {course.progress?.lastAccessed && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last accessed: {new Date(course.progress.lastAccessed.timestamp).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Pagination */}
        {filteredCourses.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              
              {[1, 2, 3, '...', 10].map((page, index) => (
                <button
                  key={index}
                  className={\`w-10 h-10 flex items-center justify-center rounded-lg \${page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}\`}
                >
                  {page}
                </button>
              ))}
              
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}`;

  // Section 23.3: Progress Tracking API
  const progressTrackingCode = `// app/api/dashboard/progress/route.js - Progress Tracking API
import { connectDB } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';

export async function GET(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('range') || 'week'; // week, month, year
    
    // Get all enrollments with progress
    const enrollments = await Enrollment.find({ 
      user: userId,
      status: { $in: ['active', 'completed'] }
    })
    .populate({
      path: 'course',
      select: 'title thumbnail category instructor totalLectures',
      populate: [
        { path: 'category', select: 'name' },
        { path: 'instructor', select: 'name' }
      ]
    })
    .sort({ updatedAt: -1 })
    .lean();
    
    // Calculate overall stats
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.status === 'completed').length;
    const inProgressCourses = totalCourses - completedCourses;
    
    // Calculate total learning hours
    const totalHours = enrollments.reduce((sum, enrollment) => {
      return sum + ((enrollment.progress?.totalTimeSpent || 0) / 3600);
    }, 0);
    
    // Calculate average completion percentage
    const avgCompletion = enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, enrollment) => {
          return sum + (enrollment.progress?.completionPercentage || 0);
        }, 0) / enrollments.length)
      : 0;
    
    // Get progress over time (for charts)
    const progressOverTime = await getProgressOverTime(userId, timeRange);
    
    // Get recent activity
    const recentActivity = await getRecentActivity(userId, 10);
    
    // Get course-wise progress
    const courseProgress = enrollments.map(enrollment => ({
      courseId: enrollment.course._id,
      courseTitle: enrollment.course.title,
      thumbnail: enrollment.course.thumbnail,
      category: enrollment.course.category?.name,
      instructor: enrollment.course.instructor?.name,
      totalLectures: enrollment.course.totalLectures,
      completedLectures: enrollment.progress?.completedLectures?.length || 0,
      completionPercentage: enrollment.progress?.completionPercentage || 0,
      totalTimeSpent: enrollment.progress?.totalTimeSpent || 0,
      status: enrollment.status,
      lastAccessed: enrollment.progress?.lastAccessed?.timestamp,
      certificateIssued: enrollment.certificate?.issued
    }));
    
    // Get learning streak
    const streak = await calculateLearningStreak(userId);
    
    return Response.json({
      success: true,
      data: {
        summary: {
          totalCourses,
          completedCourses,
          inProgressCourses,
          totalHours: totalHours.toFixed(1),
          avgCompletion,
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak
        },
        progressOverTime,
        recentActivity,
        courseProgress,
        enrollments: enrollments.map(e => ({
          ...e,
          course: e.course
        }))
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Progress tracking error:', error);
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// Track lecture completion
export async function POST(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { courseId, lectureId, timeSpent = 0 } = await request.json();
    
    if (!courseId || !lectureId) {
      return Response.json(
        { success: false, message: 'Course ID and Lecture ID are required' },
        { status: 400 }
      );
    }
    
    // Find enrollment
    const enrollment = await Enrollment.findOne({
      user: session.user.id,
      course: courseId,
      status: { $in: ['active', 'completed'] }
    });
    
    if (!enrollment) {
      return Response.json(
        { success: false, message: 'Enrollment not found' },
        { status: 404 }
      );
    }
    
    // Update progress
    await enrollment.updateProgress(lectureId);
    
    // Update time spent
    enrollment.progress.totalTimeSpent = (enrollment.progress.totalTimeSpent || 0) + timeSpent;
    
    // Recalculate completion
    await enrollment.calculateCompletion();
    
    // Record learning activity
    await recordLearningActivity(session.user.id, courseId, lectureId, timeSpent);
    
    return Response.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        completionPercentage: enrollment.progress.completionPercentage,
        completedLectures: enrollment.progress.completedLectures.length,
        totalTimeSpent: enrollment.progress.totalTimeSpent
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Update progress error:', error);
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// Helper Functions
async function getProgressOverTime(userId, timeRange) {
  const now = new Date();
  let startDate;
  
  switch (timeRange) {
    case 'week':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(now.setDate(now.getDate() - 7));
  }
  
  // This would typically come from a LearningActivity model
  // For now, return mock data
  return [
    { date: '2024-01-01', minutes: 45, courses: 2 },
    { date: '2024-01-02', minutes: 60, courses: 3 },
    { date: '2024-01-03', minutes: 30, courses: 1 },
    { date: '2024-01-04', minutes: 90, courses: 4 },
    { date: '2024-01-05', minutes: 120, courses: 5 },
    { date: '2024-01-06', minutes: 60, courses: 3 },
    { date: '2024-01-07', minutes: 75, courses: 2 }
  ];
}

async function getRecentActivity(userId, limit = 10) {
  // This would come from a LearningActivity model
  // For now, return mock data
  return [
    {
      id: '1',
      type: 'completed',
      title: 'Introduction to React Hooks',
      description: 'Completed lecture: useState vs useEffect',
      course: 'React Masterclass',
      time: '2 hours ago',
      duration: '15 min'
    },
    {
      id: '2',
      type: 'started',
      title: 'Next.js Routing',
      description: 'Started new section: Dynamic Routes',
      course: 'Next.js Fundamentals',
      time: '1 day ago',
      duration: '30 min'
    },
    {
      id: '3',
      type: 'completed',
      title: 'Database Design',
      description: 'Completed quiz: Normalization',
      course: 'MongoDB for Beginners',
      time: '2 days ago',
      duration: '20 min'
    }
  ];
}

async function calculateLearningStreak(userId) {
  // Calculate learning streak based on daily activity
  // For now, return mock data
  return {
    currentStreak: 7,
    longestStreak: 14,
    lastActive: new Date().toISOString()
  };
}

async function recordLearningActivity(userId, courseId, lectureId, timeSpent) {
  // Record learning activity for analytics
  // Implementation depends on your analytics system
  console.log(\`Learning activity recorded: User \${userId}, Course \${courseId}, Lecture \${lectureId}, Time: \${timeSpent}s\`);
}

// Models/LearningActivity.js (Optional)
import mongoose from 'mongoose';

const learningActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  
  lecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  },
  
  activityType: {
    type: String,
    enum: ['lecture_started', 'lecture_completed', 'quiz_attempted', 'assignment_submitted'],
    required: true
  },
  
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

learningActivitySchema.index({ user: 1, timestamp: -1 });
learningActivitySchema.index({ course: 1, timestamp: -1 });

export const LearningActivity = mongoose.models.LearningActivity || 
  mongoose.model('LearningActivity', learningActivitySchema);`;

  // Section 23.4: Certificate System
  const certificateSystemCode = `// models/Certificate.js - Certificate Model
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  // Certificate ID for verification
  certificateId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // User who earned the certificate
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Course for which certificate is issued
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  
  // Enrollment reference
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment',
    required: true,
    index: true
  },
  
  // Certificate Details
  title: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },
  
  issuerName: {
    type: String,
    default: 'Pakistan LMS'
  },
  
  issuerLogo: {
    type: String,
    default: '/logo.png'
  },
  
  // Dates
  issuedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  expiresAt: Date,
  
  // Template Design
  template: {
    type: String,
    enum: ['classic', 'modern', 'minimal', 'professional'],
    default: 'classic'
  },
  
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  
  textColor: {
    type: String,
    default: '#000000'
  },
  
  accentColor: {
    type: String,
    default: '#3b82f6'
  },
  
  // Certificate Content
  userName: {
    type: String,
    required: true
  },
  
  courseName: {
    type: String,
    required: true
  },
  
  completionDate: {
    type: Date,
    required: true
  },
  
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'Pass'],
    default: 'Pass'
  },
  
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  
  // Verification
  verificationUrl: {
    type: String,
    required: true
  },
  
  qrCode: String,
  
  // Digital Signature
  signatureImage: String,
  signatureName: String,
  signatureTitle: String,
  
  // Files
  pdfUrl: String,
  imageUrl: String,
  
  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Status
  status: {
    type: String,
    enum: ['issued', 'revoked', 'expired'],
    default: 'issued',
    index: true
  },
  
  revokedAt: Date,
  revokedReason: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted certificate ID
certificateSchema.virtual('formattedId').get(function() {
  return \`CERT-\${this.certificateId}\`;
});

// Virtual for verification page URL
certificateSchema.virtual('verificationPageUrl').get(function() {
  return \`\${process.env.NEXTAUTH_URL}/verify/\${this.certificateId}\`;
});

// Static Methods
certificateSchema.statics.generateCertificateId = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return \`\${timestamp}-\${random}\`.toUpperCase();
};

certificateSchema.statics.findByUser = function(userId) {
  return this.find({ user: userId })
    .populate('course', 'title thumbnail category instructor')
    .populate('user', 'name email')
    .sort({ issuedAt: -1 });
};

certificateSchema.statics.verifyCertificate = async function(certificateId) {
  const certificate = await this.findOne({ 
    certificateId,
    status: 'issued'
  })
    .populate('user', 'name email')
    .populate('course', 'title description category instructor')
    .populate('enrollment', 'completedAt progress');
  
  if (!certificate) {
    return null;
  }
  
  // Check if certificate is expired
  if (certificate.expiresAt && certificate.expiresAt < new Date()) {
    certificate.status = 'expired';
    await certificate.save();
    return null;
  }
  
  return certificate;
};

// Instance Methods
certificateSchema.methods.generatePDF = async function() {
  // This would generate PDF using a library like pdfkit or puppeteer
  // For now, return a mock URL
  const pdfUrl = \`/certificates/pdf/\${this.certificateId}.pdf\`;
  this.pdfUrl = pdfUrl;
  await this.save();
  return pdfUrl;
};

certificateSchema.methods.generateImage = async function() {
  // Generate certificate as image for social sharing
  const imageUrl = \`/certificates/image/\${this.certificateId}.png\`;
  this.imageUrl = imageUrl;
  await this.save();
  return imageUrl;
};

certificateSchema.methods.revoke = async function(reason = 'Certificate revoked by admin') {
  this.status = 'revoked';
  this.revokedAt = new Date();
  this.revokedReason = reason;
  await this.save();
  return this;
};

certificateSchema.methods.shareableLinks = function() {
  return {
    pdf: this.pdfUrl,
    image: this.imageUrl,
    verification: this.verificationPageUrl,
    linkedin: \`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=\${encodeURIComponent(this.courseName)}&organizationName=\${encodeURIComponent(this.issuerName)}&issueYear=\${new Date(this.issuedAt).getFullYear()}&issueMonth=\${new Date(this.issuedAt).getMonth() + 1}&certUrl=\${encodeURIComponent(this.verificationPageUrl)}&certId=\${this.certificateId}\`
  };
};

// Middleware
certificateSchema.pre('save', function(next) {
  if (this.isNew) {
    // Generate certificate ID if not provided
    if (!this.certificateId) {
      this.certificateId = mongoose.model('Certificate').generateCertificateId();
    }
    
    // Set verification URL
    if (!this.verificationUrl) {
      this.verificationUrl = this.verificationPageUrl;
    }
  }
  
  next();
});

export default mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

// app/api/certificates/issue/route.js - Certificate Issuance API
import { connectDB } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Certificate from '@/models/Certificate';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { courseId } = await request.json();
    
    if (!courseId) {
      return Response.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user is enrolled and completed the course
    const enrollment = await Enrollment.findOne({
      user: session.user.id,
      course: courseId,
      status: 'completed'
    })
    .populate('course')
    .populate('user');
    
    if (!enrollment) {
      return Response.json(
        { success: false, message: 'Course not completed or enrollment not found' },
        { status: 400 }
      );
    }
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      user: session.user.id,
      course: courseId,
      status: 'issued'
    });
    
    if (existingCertificate) {
      return Response.json(
        { 
          success: false, 
          message: 'Certificate already issued',
          certificateId: existingCertificate.certificateId
        },
        { status: 400 }
      );
    }
    
    // Get course and user details
    const course = enrollment.course;
    const user = enrollment.user;
    
    // Calculate grade based on performance
    const grade = calculateGrade(enrollment);
    
    // Create certificate
    const certificate = new Certificate({
      user: session.user.id,
      course: courseId,
      enrollment: enrollment._id,
      
      title: \`Certificate of Completion\`,
      description: \`This certificate is awarded to \${user.name} for successfully completing the course "\${course.title}"\`,
      
      userName: user.name,
      courseName: course.title,
      completionDate: enrollment.completedAt || new Date(),
      grade,
      score: enrollment.progress?.completionPercentage || 100,
      
      template: course.certificateTemplate?.template || 'classic',
      backgroundColor: course.certificateTemplate?.backgroundColor || '#ffffff',
      textColor: course.certificateTemplate?.textColor || '#000000',
      accentColor: course.certificateTemplate?.accentColor || '#3b82f6',
      
      signatureImage: course.certificateTemplate?.signatureImage,
      signatureName: course.certificateTemplate?.signatureName || 'Course Instructor',
      signatureTitle: course.certificateTemplate?.signatureTitle || 'Senior Instructor'
    });
    
    await certificate.save();
    
    // Update enrollment with certificate reference
    enrollment.certificate = {
      issued: true,
      certificateId: certificate.certificateId,
      issuedAt: certificate.issuedAt,
      downloadUrl: \`/certificates/\${certificate.certificateId}\`
    };
    
    await enrollment.save();
    
    // Generate PDF and Image
    await certificate.generatePDF();
    await certificate.generateImage();
    
    // Send certificate email
    await sendCertificateEmail(user.email, user.name, course.title, certificate.certificateId);
    
    return Response.json({
      success: true,
      message: 'Certificate issued successfully',
      data: {
        certificateId: certificate.certificateId,
        certificate,
        downloadUrls: certificate.shareableLinks()
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Certificate issuance error:', error);
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// Helper function to calculate grade
function calculateGrade(enrollment) {
  const completionPercentage = enrollment.progress?.completionPercentage || 0;
  
  if (completionPercentage >= 90) return 'A+';
  if (completionPercentage >= 85) return 'A';
  if (completionPercentage >= 80) return 'A-';
  if (completionPercentage >= 75) return 'B+';
  if (completionPercentage >= 70) return 'B';
  if (completionPercentage >= 65) return 'B-';
  if (completionPercentage >= 60) return 'C+';
  if (completionPercentage >= 55) return 'C';
  if (completionPercentage >= 50) return 'C-';
  return 'Pass';
}

// Send certificate email
async function sendCertificateEmail(email, userName, courseName, certificateId) {
  // Implement email sending logic
  console.log(\`Certificate email sent to \${email} for course: \${courseName}\`);
}

// app/api/certificates/[id]/route.js - Certificate Retrieval API
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const certificateId = params.id;
    
    // Verify certificate
    const certificate = await Certificate.verifyCertificate(certificateId);
    
    if (!certificate) {
      return Response.json(
        { success: false, message: 'Certificate not found or invalid' },
        { status: 404 }
      );
    }
    
    return Response.json({
      success: true,
      data: certificate
    }, { status: 200 });
    
  } catch (error) {
    console.error('Certificate retrieval error:', error);
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// app/certificates/[id]/page.jsx - Certificate Display Page
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Download, Share2, Printer, CheckCircle,
  Calendar, Award, User, BookOpen,
  Loader2, AlertCircle, ExternalLink
} from 'lucide-react';

export default function CertificatePage() {
  const params = useParams();
  const certificateId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchCertificate();
  }, [certificateId]);
  
  const fetchCertificate = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(\`/api/certificates/\${certificateId}\`);
      const data = await response.json();
      
      if (data.success) {
        setCertificate(data.data);
      } else {
        setError(data.message || 'Certificate not found');
      }
    } catch (error) {
      setError('Failed to load certificate');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownloadPDF = async () => {
    if (!certificate?.pdfUrl) return;
    
    try {
      const response = await fetch(certificate.pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`certificate-\${certificate.certificateId}.pdf\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: \`My Certificate: \${certificate?.courseName}\`,
        text: \`I completed \${certificate?.courseName} on Pakistan LMS!\`,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (error || !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Certificate Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error || 'The certificate you\'re looking for doesn\'t exist or has been revoked.'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Certificate Display */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Certificate Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Certificate of Completion
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ID: {certificate.certificateId}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
        
        {/* Certificate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-2">Certificate of Completion</h2>
            <p className="text-blue-100">
              This certifies that
            </p>
          </div>
          
          {/* Certificate Body */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {certificate.userName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                has successfully completed the course
              </p>
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                "{certificate.courseName}"
              </h4>
            </div>
            
            {/* Certificate Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Grade</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {certificate.grade}
                      {certificate.score && \` (\${certificate.score}%)\`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completion Date</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Issued By</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {certificate.issuerName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Certificate ID</p>
                    <p className="font-bold text-gray-900 dark:text-white font-mono">
                      {certificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Verification Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                    Verify this certificate
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use the certificate ID above to verify authenticity
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <a
                    href={\`/verify/\${certificate.certificateId}\`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Online
                  </a>
                  
                  {certificate.qrCode && (
                    <div className="w-24 h-24 bg-white p-2 rounded-lg">
                      <img
                        src={certificate.qrCode}
                        alt="QR Code"
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Signature */}
            {certificate.signatureImage && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end">
                  <div className="text-right">
                    <img
                      src={certificate.signatureImage}
                      alt="Signature"
                      className="h-16 mb-2"
                    />
                    <p className="font-bold text-gray-900 dark:text-white">
                      {certificate.signatureName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {certificate.signatureTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`;

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-slate-900 text-slate-100"
          : "bg-gradient-to-br from-gray-50 to-blue-50 text-slate-900"
      }`}
    >
      {/* Success Message */}
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-emerald-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {copySuccess}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-90 border-b border-slate-700/20 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full text-blue-300/80 hover:text-blue-500 hover:bg-blue-500/10 transition-all z-[60] text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ روشن موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* Chapter Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          باب 23: Student Dashboard System
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          طلباء کے لیے مکمل ڈیش بورڈ، کورس مینجمنٹ، اور سرٹیفکیٹ سسٹم
        </p>

        {/* Chapter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-800 text-white shadow-lg scale-105`
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-400">
            🎓 باب کا مقصد: Complete Student Experience
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>طالب علموں کے مکمل تعلیمی تجربے</strong> کو ڈیزائن کریں گے - ڈیش بورڈ سے لے کر سرٹیفکیٹ تک۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">🎛️</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Student Dashboard</h3>
              <p className="text-sm">Personalized learning dashboard</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">My Courses</h3>
              <p className="text-sm">Course management & progress tracking</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Certificate System</h3>
              <p className="text-sm">Digital certificates with verification</p>
            </div>
          </div>
        </section>

        {/* Section 23.1: Student Dashboard UI */}
        {activeTab === "dashboard-ui" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
              23.1: Student Dashboard UI Design
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                🎛️ Dashboard Components & Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-blue-300">✅ Key Components:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Personalized welcome header</li>
                    <li>Learning stats cards</li>
                    <li>Quick action buttons</li>
                    <li>Upcoming deadlines</li>
                    <li>Recent activity feed</li>
                    <li>Course recommendations</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-purple-300">📊 Data Visualization:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Progress bars & percentages</li>
                    <li>Learning time tracking</li>
                    <li>Course completion rates</li>
                    <li>Streak counter</li>
                    <li>Activity timeline</li>
                    <li>Performance trends</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={dashboardUICode} 
              colorClass="text-blue-300"
              title="app/dashboard/page.jsx - Complete Student Dashboard UI"
            />
          </section>
        )}

        {/* Section 23.2: My Courses System */}
        {activeTab === "my-courses" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
              23.2: My Courses Management System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-300">
                📚 Course Management Features
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📊</span>
                  </div>
                  <p className="font-bold text-green-400">Filtering</p>
                  <p className="text-sm">All, In Progress, Completed</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">🔍</span>
                  </div>
                  <p className="font-bold text-blue-400">Search</p>
                  <p className="text-sm">Quick course search</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📱</span>
                  </div>
                  <p className="font-bold text-purple-400">View Modes</p>
                  <p className="text-sm">Grid & List views</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📈</span>
                  </div>
                  <p className="font-bold text-amber-400">Progress Tracking</p>
                  <p className="text-sm">Visual progress indicators</p>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={myCoursesCode} 
              colorClass="text-green-300"
              title="app/my-courses/page.jsx - Complete My Courses Interface"
            />
          </section>
        )}

        {/* Section 23.3: Progress Tracking */}
        {activeTab === "progress" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
              23.3: Progress Tracking & Analytics
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                📊 What We Track & Analyze
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ Learning Metrics:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Course completion percentage</li>
                    <li>Time spent learning</li>
                    <li>Lecture completion rate</li>
                    <li>Learning streaks</li>
                    <li>Activity frequency</li>
                    <li>Performance trends</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">🔧 Technical Implementation:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Real-time progress updates</li>
                    <li>Historical data tracking</li>
                    <li>Analytics aggregation</li>
                    <li>Performance calculations</li>
                    <li>Data visualization prep</li>
                    <li>Export capabilities</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={progressTrackingCode} 
              colorClass="text-purple-300"
              title="app/api/dashboard/progress/route.js - Complete Progress Tracking API"
            />
          </section>
        )}

        {/* Section 23.4: Certificate System */}
        {activeTab === "certificate" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
              23.4: Digital Certificate System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-300">
                🏆 Certificate Features & Security
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ Certificate Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Unique certificate ID generation</li>
                    <li>Multiple template designs</li>
                    <li>PDF & Image generation</li>
                    <li>Online verification</li>
                    <li>Shareable links</li>
                    <li>Digital signatures</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">🔒 Security & Verification:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Tamper-proof certificate IDs</li>
                    <li>Online verification system</li>
                    <li>QR code integration</li>
                    <li>Revocation capability</li>
                    <li>Expiration dates</li>
                    <li>Audit logging</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={certificateSystemCode} 
              colorClass="text-red-300"
              title="models/Certificate.js & APIs - Complete Certificate System"
            />
          </section>
        )}

        {/* Practice Section */}
        <section className="my-16 p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg text-center" dir="rtl">
            <p className="flex items-center justify-center gap-2">
              <span className="bg-blue-500 text-white p-2 rounded">1</span>
              Student dashboard implement کریں اور test data ڈالیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">2</span>
              My courses page test کریں - grid/list views
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">3</span>
              Progress tracking system test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-red-500 text-white p-2 rounded">4</span>
              Certificate system test کریں - ایک certificate generate کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">5</span>
              Complete student experience flow test کریں
            </p>
          </div>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 italic">
            🚀 اگلے باب میں
          </h2>
          <p className="mb-4 text-lg">
            اگلے باب میں ہم <strong>Video Upload & Streaming System</strong> بنائیں گے:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Cloudinary Video Upload Integration</li>
            <li>Video Processing & Optimization</li>
            <li>Video Player with Custom Controls</li>
            <li>Video Encryption & Security</li>
            <li>Multi-quality Streaming (360p, 720p, 1080p)</li>
            <li>Video Analytics & Watch Time Tracking</li>
            <li>Subtitle & Caption Support</li>
            <li>Mobile-optimized Video Delivery</li>
          </ul>
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-300 font-bold">
              🎯 اہم: اب آپ کے طلباء کے پاس کورسز ہیں، اب انہیں ویڈیوز دیکھنے کی سہولت دیں گے!
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-2">
              Chapter 23 کے بعد آپ کے طلباء مکمل ڈیش بورڈ رکھتے ہیں۔ اب Video System add کر کے LMS مکمل کریں گے۔
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 23: Student Dashboard System
          </p>
          <p className="text-sm mt-2">
            🚀 اگلے سبق میں ہم Video Upload & Streaming System سیکھیں گے!
          </p>
        </footer>
      </main>

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}