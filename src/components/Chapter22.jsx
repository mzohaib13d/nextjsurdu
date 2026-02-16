import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter22() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("course-model");

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
    { id: "course-model", label: "📊 Course Model", color: "blue" },
    { id: "instructor-panel", label: "👨‍🏫 Instructor Panel", color: "green" },
    { id: "course-listing", label: "📚 Course Listing", color: "purple" },
    { id: "enrollment", label: "🎯 Enrollment System", color: "red" }
  ];

  // Section 22.1: Course Model
  const courseModelCode = `// models/Course.js - Complete Course Model
import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'لیکچر کا عنوان درکار ہے'],
    trim: true,
    maxlength: [200, 'عنوان 200 حروف سے زیادہ نہیں ہو سکتا']
  },
  
  description: {
    type: String,
    maxlength: [1000, 'تفصیل 1000 حروف سے زیادہ نہیں ہو سکتی']
  },
  
  // Lecture Type: video, article, quiz, assignment
  type: {
    type: String,
    enum: ['video', 'article', 'quiz', 'assignment', 'live'],
    default: 'video',
    required: true
  },
  
  // Video Lecture
  videoUrl: {
    type: String,
    required: function() { return this.type === 'video'; }
  },
  
  videoDuration: {
    type: Number, // in seconds
    default: 0
  },
  
  videoThumbnail: String,
  
  // Article Lecture
  content: {
    type: String,
    required: function() { return this.type === 'article'; }
  },
  
  // Quiz Lecture
  quiz: {
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      points: Number
    }],
    passingScore: Number,
    timeLimit: Number // in minutes
  },
  
  // Assignment Lecture
  assignment: {
    instructions: String,
    submissionType: ['file', 'text', 'both'],
    maxFileSize: Number, // in MB
    allowedFormats: [String],
    dueDate: Date,
    maxPoints: Number
  },
  
  // Live Lecture
  liveSession: {
    meetingId: String,
    meetingPassword: String,
    startTime: Date,
    endTime: Date,
    recordingUrl: String
  },
  
  // Resources
  resources: [{
    name: String,
    url: String,
    fileType: String,
    fileSize: Number
  }],
  
  // Completion Tracking
  isPreview: {
    type: Boolean,
    default: false
  },
  
  // Ordering
  order: {
    type: Number,
    required: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'سیکشن کا عنوان درکار ہے'],
    trim: true
  },
  
  description: String,
  
  lectures: [lectureSchema],
  
  order: {
    type: Number,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'کورس کا عنوان درکار ہے'],
    trim: true,
    maxlength: [200, 'عنوان 200 حروف سے زیادہ نہیں ہو سکتا'],
    index: true
  },
  
  subtitle: {
    type: String,
    maxlength: [500, 'ذیلی عنوان 500 حروف سے زیادہ نہیں ہو سکتا']
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  
  description: {
    type: String,
    required: [true, 'کورس کی تفصیل درکار ہے'],
    maxlength: [5000, 'تفصیل 5000 حروف سے زیادہ نہیں ہو سکتی']
  },
  
  shortDescription: {
    type: String,
    maxlength: [500, 'مختصر تفصیل 500 حروف سے زیادہ نہیں ہو سکتی']
  },
  
  // Instructor/Owner
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  coInstructors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Course Content
  sections: [sectionSchema],
  
  totalLectures: {
    type: Number,
    default: 0
  },
  
  totalDuration: {
    type: Number, // in seconds
    default: 0
  },
  
  // Media
  thumbnail: {
    type: String,
    default: '/course-thumbnails/default.jpg'
  },
  
  promoVideo: String,
  
  // Pricing
  price: {
    type: Number,
    required: true,
    min: [0, 'قیمت منفی نہیں ہو سکتی'],
    default: 0
  },
  
  currency: {
    type: String,
    default: 'PKR'
  },
  
  discountPrice: Number,
  
  isFree: {
    type: Boolean,
    default: false
  },
  
  // Categories & Tags
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true
  },
  
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Course Level
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all'],
    default: 'all'
  },
  
  // Requirements
  prerequisites: [String],
  
  learningOutcomes: [String],
  
  targetAudience: [String],
  
  // Status & Visibility
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'archived'],
    default: 'draft',
    index: true
  },
  
  publishedAt: Date,
  
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Enrollment
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  enrollmentCount: {
    type: Number,
    default: 0,
    index: true
  },
  
  maxStudents: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  
  // Reviews & Ratings
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  
  totalReviews: {
    type: Number,
    default: 0
  },
  
  // Course Stats
  completionRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  totalHoursWatched: {
    type: Number,
    default: 0
  },
  
  // Certificate
  certificateTemplate: {
    title: String,
    description: String,
    issuerName: String,
    signatureImage: String,
    backgroundColor: String,
    textColor: String
  },
  
  // Settings
  allowReviews: {
    type: Boolean,
    default: true
  },
  
  allowDiscussion: {
    type: Boolean,
    default: true
  },
  
  enableCertificate: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Soft Delete
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  deletedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
courseSchema.virtual('durationInHours').get(function() {
  return (this.totalDuration / 3600).toFixed(1);
});

courseSchema.virtual('discountPercentage').get(function() {
  if (!this.discountPrice || this.price === 0) return 0;
  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

courseSchema.virtual('currentPrice').get(function() {
  return this.discountPrice || this.price;
});

// Indexes for better performance
courseSchema.index({ instructor: 1, status: 1 });
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ averageRating: -1 });
courseSchema.index({ enrollmentCount: -1 });
courseSchema.index({ createdAt: -1 });

// Middleware to update counts
courseSchema.pre('save', function(next) {
  // Update total lectures count
  this.totalLectures = this.sections.reduce((total, section) => {
    return total + (section.lectures ? section.lectures.length : 0);
  }, 0);
  
  // Update total duration
  this.totalDuration = this.sections.reduce((total, section) => {
    const sectionDuration = section.lectures.reduce((secTotal, lecture) => {
      return secTotal + (lecture.videoDuration || 0);
    }, 0);
    return total + sectionDuration;
  }, 0);
  
  // Update enrollment count
  this.enrollmentCount = this.enrolledStudents ? this.enrolledStudents.length : 0;
  
  // Update average rating
  if (this.ratings && this.ratings.length > 0) {
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.averageRating = totalRating / this.ratings.length;
    this.totalReviews = this.ratings.length;
  }
  
  next();
});

// Static Methods
courseSchema.statics.findByInstructor = function(instructorId) {
  return this.find({ instructor: instructorId }).sort({ createdAt: -1 });
};

courseSchema.statics.findPublished = function() {
  return this.find({ status: 'published', isActive: true });
};

courseSchema.statics.findFeatured = function() {
  return this.find({ 
    status: 'published', 
    isActive: true, 
    isFeatured: true 
  }).sort({ createdAt: -1 }).limit(10);
};

courseSchema.statics.findByCategory = function(categoryId) {
  return this.find({ 
    category: categoryId, 
    status: 'published', 
    isActive: true 
  }).sort({ createdAt: -1 });
};

// Instance Methods
courseSchema.methods.enrollStudent = function(studentId) {
  if (!this.enrolledStudents.includes(studentId)) {
    this.enrolledStudents.push(studentId);
  }
  return this.save();
};

courseSchema.methods.unenrollStudent = function(studentId) {
  this.enrolledStudents = this.enrolledStudents.filter(
    id => id.toString() !== studentId.toString()
  );
  return this.save();
};

courseSchema.methods.addRating = function(userId, rating, review) {
  // Remove existing rating by this user
  this.ratings = this.ratings.filter(r => r.user.toString() !== userId.toString());
  
  // Add new rating
  this.ratings.push({
    user: userId,
    rating,
    review
  });
  
  return this.save();
};

export default mongoose.models.Course || mongoose.model('Course', courseSchema);`;

  // Section 22.2: Instructor Panel
  const instructorPanelCode = `// app/instructor/courses/create/page.jsx - Course Creation Page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Upload, Video, FileText, BookOpen, Clock, Tag, 
  DollarSign, Globe, Lock, Save, X, Plus, Trash2,
  AlertCircle, CheckCircle, Loader2
} from 'lucide-react';

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  
  // Course Form State
  const [courseData, setCourseData] = useState({
    // Step 1: Basic Information
    title: '',
    subtitle: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    tags: [],
    level: 'beginner',
    
    // Step 2: Curriculum
    sections: [
      {
        id: Date.now(),
        title: 'Introduction',
        description: 'Course introduction and overview',
        lectures: []
      }
    ],
    
    // Step 3: Pricing & Settings
    price: 0,
    discountPrice: 0,
    currency: 'PKR',
    isFree: false,
    maxStudents: 0,
    
    // Step 4: Media
    thumbnail: '',
    promoVideo: '',
    
    // Settings
    allowReviews: true,
    allowDiscussion: true,
    enableCertificate: false,
    status: 'draft'
  });
  
  // Categories (example - should come from API)
  const categories = [
    { id: 'web-dev', name: 'Web Development' },
    { id: 'mobile-dev', name: 'Mobile Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'business', name: 'Business & Marketing' },
    { id: 'language', name: 'Language Learning' }
  ];
  
  const levels = [
    { id: 'beginner', name: 'Beginner', color: 'green' },
    { id: 'intermediate', name: 'Intermediate', color: 'blue' },
    { id: 'advanced', name: 'Advanced', color: 'purple' },
    { id: 'all', name: 'All Levels', color: 'gray' }
  ];
  
  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle Tag Input
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim().toLowerCase();
      
      if (!courseData.tags.includes(newTag)) {
        setCourseData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      
      e.target.value = '';
    }
  };
  
  const handleTagRemove = (tagToRemove) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Section Management
  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: \`Section \${courseData.sections.length + 1}\`,
      description: '',
      lectures: []
    };
    
    setCourseData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };
  
  const updateSection = (sectionId, field, value) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, [field]: value }
          : section
      )
    }));
  };
  
  const deleteSection = (sectionId) => {
    if (courseData.sections.length <= 1) {
      setError('کم از کم ایک سیکشن ضروری ہے');
      return;
    }
    
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };
  
  // Lecture Management
  const addLecture = (sectionId) => {
    const newLecture = {
      id: Date.now(),
      title: 'New Lecture',
      description: '',
      type: 'video',
      videoUrl: '',
      order: 0
    };
    
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [...section.lectures, newLecture]
            }
          : section
      )
    }));
  };
  
  const updateLecture = (sectionId, lectureId, field, value) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map(lecture =>
                lecture.id === lectureId
                  ? { ...lecture, [field]: value }
                  : lecture
              )
            }
          : section
      )
    }));
  };
  
  const deleteLecture = (sectionId, lectureId) => {
    setCourseData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.filter(
                lecture => lecture.id !== lectureId
              )
            }
          : section
      )
    }));
  };
  
  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form data
      if (!courseData.title.trim()) {
        throw new Error('کورس کا عنوان درکار ہے');
      }
      
      if (!courseData.description.trim()) {
        throw new Error('کورس کی تفصیل درکار ہے');
      }
      
      if (!courseData.category) {
        throw new Error('کیٹگری منتخب کریں');
      }
      
      // Generate slug from title
      const slug = courseData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const courseWithSlug = {
        ...courseData,
        slug
      };
      
      // Send to API
      const response = await fetch('/api/instructor/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseWithSlug)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'کورس بنانے میں مسئلہ پیش آیا');
      }
      
      setSuccess('کورس کامیابی سے بن گیا ہے!');
      
      // Redirect to course edit page
      setTimeout(() => {
        router.push(\`/instructor/courses/\${data.courseId}/edit\`);
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Save as Draft
  const saveDraft = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/instructor/courses/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...courseData,
          status: 'draft'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('ڈرافٹ محفوظ ہو گیا ہے');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Progress Steps
  const steps = [
    { number: 1, title: 'بنیادی معلومات', icon: BookOpen },
    { number: 2, title: 'کورس کا نصاب', icon: FileText },
    { number: 3, title: 'قیمت اور ترتیبات', icon: DollarSign },
    { number: 4, title: 'میڈیا', icon: Video }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            نیا کورس بنائیں
          </h1>
          <button
            onClick={saveDraft}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'محفوظ ہو رہا ہے...' : 'ڈرافٹ محفوظ کریں'}
          </button>
        </div>
        
        <div className="flex items-center justify-center mb-10">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.number;
            const isCompleted = step > stepItem.number;
            
            return (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={\`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all \${isActive ? 'border-blue-500 bg-blue-500 text-white scale-110' : isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500'}\`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={\`mt-2 text-sm font-medium \${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}\`}>
                    {stepItem.title}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={\`w-24 h-1 mx-4 \${step > stepItem.number ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}\`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Form Container */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
            <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
              <CheckCircle className="w-5 h-5" />
              <p className="font-medium">{success}</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
            <div className="flex items-center gap-3 text-red-700 dark:text-red-300">
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  کورس کا عنوان * <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="مثال: Complete Web Development Bootcamp 2024"
                  maxLength={200}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  واضح اور پرکشش عنوان منتخب کریں۔ زیادہ سے زیادہ 200 حروف۔
                </p>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  ذیلی عنوان
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={courseData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="مثال: HTML, CSS, JavaScript, React, Node.js اور بہت کچھ"
                  maxLength={500}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  مختصر تفصیل (Course Card کے لیے) *
                </label>
                <textarea
                  name="shortDescription"
                  value={courseData.shortDescription}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="مختصراً بیان کریں کہ یہ کورس کس بارے میں ہے۔ زیادہ سے زیادہ 500 حروف۔"
                  maxLength={500}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  مکمل تفصیل *
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="کورس کی مکمل تفصیل لکھیں۔ طلباء کو یہ سمجھائیں کہ وہ کیا سیکھیں گے۔"
                  maxLength={5000}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    کیٹگری * <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">کیٹگری منتخب کریں</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    کورس لیول
                  </label>
                  <select
                    name="level"
                    value={courseData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  ٹیگز
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {courseData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    onKeyDown={handleTagAdd}
                    className="w-full px-3 py-2 border-0 focus:ring-0 outline-none bg-transparent text-gray-900 dark:text-white"
                    placeholder="ٹیگز شامل کریں (Enter دبائیں)"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  ٹیگز طلباء کو آپ کا کورس تلاش کرنے میں مدد کرتے ہیں۔
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Curriculum */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  کورس کا نصاب بنائیں
                </h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  نیا سیکشن
                </button>
              </div>
              
              {courseData.sections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none w-full mb-2"
                        placeholder="سیکشن کا عنوان"
                      />
                      <textarea
                        value={section.description}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none w-full resize-none"
                        placeholder="سیکشن کی تفصیل"
                        rows={2}
                      />
                    </div>
                    
                    {courseData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => deleteSection(section.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {/* Lectures in this section */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        لیکچرز ({section.lectures.length})
                      </h4>
                      <button
                        type="button"
                        onClick={() => addLecture(section.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        نیا لیکچر
                      </button>
                    </div>
                    
                    {section.lectures.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          ابھی تک کوئی لیکچر نہیں ہے
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div
                            key={lecture.id}
                            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="text-gray-500 dark:text-gray-400 font-mono">
                              {lectureIndex + 1}.
                            </div>
                            
                            <div className="flex-1">
                              <input
                                type="text"
                                value={lecture.title}
                                onChange={(e) => updateLecture(section.id, lecture.id, 'title', e.target.value)}
                                className="font-medium text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none w-full"
                                placeholder="لیکچر کا عنوان"
                              />
                              <div className="flex items-center gap-4 mt-2">
                                <select
                                  value={lecture.type}
                                  onChange={(e) => updateLecture(section.id, lecture.id, 'type', e.target.value)}
                                  className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                                >
                                  <option value="video">ویڈیو</option>
                                  <option value="article">آرٹیکل</option>
                                  <option value="quiz">کوئز</option>
                                  <option value="assignment">اسائنمنٹ</option>
                                </select>
                                
                                {lecture.type === 'video' && (
                                  <input
                                    type="text"
                                    value={lecture.videoUrl}
                                    onChange={(e) => updateLecture(section.id, lecture.id, 'videoUrl', e.target.value)}
                                    className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-700"
                                    placeholder="ویڈیو یو آر ایل"
                                  />
                                )}
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => deleteLecture(section.id, lecture.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Step 3: Pricing & Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    قیمت (PKR میں) *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₨
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="100"
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    ڈسکاؤنٹ قیمت (اختیاری)
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₨
                    </span>
                    <input
                      type="number"
                      name="discountPrice"
                      value={courseData.discountPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="100"
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={courseData.isFree}
                  onChange={(e) => setCourseData(prev => ({
                    ...prev,
                    isFree: e.target.checked,
                    price: e.target.checked ? 0 : prev.price
                  }))}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isFree" className="text-gray-700 dark:text-gray-300">
                  مفت کورس
                </label>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  زیادہ سے زیادہ طلباء (0 = unlimited)
                </label>
                <input
                  type="number"
                  name="maxStudents"
                  value={courseData.maxStudents}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  اضافی ترتیبات
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowReviews"
                      checked={courseData.allowReviews}
                      onChange={(e) => setCourseData(prev => ({
                        ...prev,
                        allowReviews: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="allowReviews" className="text-gray-700 dark:text-gray-300">
                      طلباء کو ریویوز لکھنے کی اجازت دیں
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowDiscussion"
                      checked={courseData.allowDiscussion}
                      onChange={(e) => setCourseData(prev => ({
                        ...prev,
                        allowDiscussion: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="allowDiscussion" className="text-gray-700 dark:text-gray-300">
                      ڈسکشن فورمز فعال کریں
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="enableCertificate"
                      checked={courseData.enableCertificate}
                      onChange={(e) => setCourseData(prev => ({
                        ...prev,
                        enableCertificate: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="enableCertificate" className="text-gray-700 dark:text-gray-300">
                      کورس مکمل ہونے پر سرٹیفکیٹ جاری کریں
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Media */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  کورس تھمب نیل * <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-800/50">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    تھمب نیل اپ لوڈ کریں (سائز: 1280x720 پکسلز)
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    تصویر منتخب کریں
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    JPG, PNG یا GIF۔ زیادہ سے زیادہ سائز: 5MB
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  پرومو ویڈیو (اختیاری)
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      کورس کی پروموشنل ویڈیو
                    </span>
                  </div>
                  <input
                    type="text"
                    name="promoVideo"
                    value={courseData.promoVideo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="YouTube یا Vimeo لنک"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    یہ ویڈیو کورس کی لینڈنگ پیج پر دکھائی جائے گی۔
                  </p>
                </div>
              </div>
              
              {/* Course Preview */}
              <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                  کورس کا پیش نظارہ
                </h4>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {courseData.title || "کورس کا عنوان"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {courseData.shortDescription || "کورس کی مختصر تفصیل"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>🕒 {courseData.sections.reduce((total, section) => total + section.lectures.length, 0)} لیکچرز</span>
                    <span>👨‍🏫 Instructor Name</span>
                    <span className="font-bold text-green-600">
                      {courseData.isFree ? 'مفت' : \`₨\${courseData.discountPrice || courseData.price}\`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  ← پچھلا مرحلہ
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  اگلا مرحلہ →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جمع کروایا جا رہا ہے...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      کورس شائع کریں
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}`;

  // Section 22.3: Course Listing API
  const courseListingCode = `// app/api/courses/route.js - Course Listing & Filtering API
import { connectDB } from '@/lib/database';
import Course from '@/models/Course';
import Category from '@/models/Category';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    
    // Filters
    const category = searchParams.get('category');
    const instructor = searchParams.get('instructor');
    const level = searchParams.get('level');
    const price = searchParams.get('price'); // free, paid
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search');
    const minRating = parseInt(searchParams.get('minRating') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice'));
    const tags = searchParams.get('tags')?.split(',');
    
    // Build query
    const query = {
      status: 'published',
      isActive: true
    };
    
    // Category filter
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }
    
    // Instructor filter
    if (instructor) {
      query.instructor = instructor;
    }
    
    // Level filter
    if (level && level !== 'all') {
      query.level = level;
    }
    
    // Price filter
    if (price === 'free') {
      query.isFree = true;
    } else if (price === 'paid') {
      query.isFree = false;
    }
    
    // Rating filter
    if (minRating > 0) {
      query.averageRating = { $gte: minRating };
    }
    
    // Max price filter
    if (maxPrice && maxPrice > 0) {
      query.$or = [
        { isFree: true },
        { 
          $and: [
            { isFree: false },
            { 
              $or: [
                { discountPrice: { $lte: maxPrice } },
                { price: { $lte: maxPrice } }
              ]
            }
          ]
        }
      ];
    }
    
    // Tags filter
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'popular':
        sortOption = { enrollmentCount: -1 };
        break;
      case 'rating':
        sortOption = { averageRating: -1 };
        break;
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
    
    // Execute query with pagination
    const courses = await Course.find(query)
      .populate('instructor', 'name email avatar')
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await Course.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    // Get aggregations for filters
    const aggregations = await Course.aggregate([
      { $match: { status: 'published', isActive: true } },
      {
        $group: {
          _id: null,
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          avgRating: { $avg: '$averageRating' }
        }
      }
    ]);
    
    // Get unique tags
    const uniqueTags = await Course.distinct('tags', { 
      status: 'published', 
      isActive: true,
      tags: { $exists: true, $ne: [] }
    }).limit(20);
    
    // Get levels distribution
    const levels = await Course.aggregate([
      { $match: { status: 'published', isActive: true } },
      { $group: { _id: '$level', count: { $sum: 1 } } }
    ]);
    
    return Response.json({
      success: true,
      data: {
        courses,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        filters: {
          priceRange: aggregations[0] || { maxPrice: 0, minPrice: 0 },
          uniqueTags: uniqueTags.filter(tag => tag),
          levels: levels.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
          }, {})
        }
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Courses API error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}

// POST - Create new course (Instructor only)
export async function POST(request) {
  try {
    await connectDB();
    
    // Check authentication (you should have middleware for this)
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is instructor or admin
    if (!['instructor', 'admin'].includes(session.user.role)) {
      return Response.json(
        { success: false, message: 'Only instructors can create courses' },
        { status: 403 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return Response.json(
          { success: false, message: \`\${field} is required\` },
          { status: 400 }
        );
      }
    }
    
    // Generate slug
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug exists
    let slug = baseSlug;
    let counter = 1;
    while (await Course.findOne({ slug })) {
      slug = \`\${baseSlug}-\${counter}\`;
      counter++;
    }
    
    // Create course
    const course = new Course({
      ...data,
      slug,
      instructor: session.user.id,
      status: data.status || 'draft'
    });
    
    await course.save();
    
    // Populate instructor info
    await course.populate('instructor', 'name email avatar');
    await course.populate('category', 'name slug');
    
    return Response.json(
      {
        success: true,
        message: 'Course created successfully',
        courseId: course._id,
        course
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Create course error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return Response.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, message: 'Slug already exists' },
        { status: 409 }
      );
    }
    
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}`;

  // Section 22.4: Enrollment System
  const enrollmentCode = `// app/api/courses/[id]/enroll/route.js - Course Enrollment
import { connectDB } from '@/lib/database';
import Course from '@/models/Course';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request, { params }) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    const courseId = params.id;
    const userId = session.user.id;
    
    // Get course
    const course = await Course.findById(courseId);
    if (!course) {
      return Response.json(
        { success: false, message: 'کورس نہیں ملا' },
        { status: 404 }
      );
    }
    
    // Check if course is published
    if (course.status !== 'published') {
      return Response.json(
        { success: false, message: 'یہ کورس دستیاب نہیں ہے' },
        { status: 400 }
      );
    }
    
    // Check if user is already enrolled
    const isEnrolled = course.enrolledStudents.some(
      studentId => studentId.toString() === userId
    );
    
    if (isEnrolled) {
      return Response.json(
        { success: false, message: 'آپ پہلے ہی اس کورس میں شامل ہیں' },
        { status: 400 }
      );
    }
    
    // Check if course has reached max students
    if (course.maxStudents > 0 && course.enrollmentCount >= course.maxStudents) {
      return Response.json(
        { success: false, message: 'کورس میں جگہ نہیں ہے' },
        { status: 400 }
      );
    }
    
    // For paid courses, check payment
    if (!course.isFree) {
      // Here you would integrate with your payment system
      // For now, we'll assume payment is verified
      const paymentVerified = await verifyPayment(userId, courseId);
      
      if (!paymentVerified) {
        return Response.json(
          { success: false, message: 'ادائیگی کی تصدیق نہیں ہوئی' },
          { status: 402 }
        );
      }
    }
    
    // Enroll student
    course.enrolledStudents.push(userId);
    await course.save();
    
    // Update user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $addToSet: { coursesEnrolled: courseId }
    });
    
    // Create enrollment record (optional)
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
      enrolledAt: new Date(),
      status: 'active'
    });
    
    // Send enrollment confirmation email
    await sendEnrollmentEmail(session.user.email, course.title);
    
    return Response.json(
      {
        success: true,
        message: 'کورس میں کامیابی سے شامل ہو گئے ہیں',
        enrollmentId: enrollment._id
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Enrollment error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}

// Enrollment model
import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
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
  
  enrolledAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  completedAt: Date,
  
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'expired'],
    default: 'active',
    index: true
  },
  
  progress: {
    completedLectures: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture'
    }],
    
    lastAccessed: {
      lecture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture'
      },
      timestamp: Date
    },
    
    totalTimeSpent: {
      type: Number, // in seconds
      default: 0
    },
    
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  
  // For paid courses
  payment: {
    transactionId: String,
    amount: Number,
    currency: String,
    paymentMethod: String,
    paymentDate: Date
  },
  
  certificate: {
    issued: Boolean,
    certificateId: String,
    issuedAt: Date,
    downloadUrl: String
  },
  
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
  timestamps: true
});

// Compound index for unique enrollment
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Methods
enrollmentSchema.methods.updateProgress = function(lectureId) {
  if (!this.progress.completedLectures.includes(lectureId)) {
    this.progress.completedLectures.push(lectureId);
  }
  
  this.progress.lastAccessed = {
    lecture: lectureId,
    timestamp: new Date()
  };
  
  return this.save();
};

enrollmentSchema.methods.calculateCompletion = async function() {
  const course = await mongoose.model('Course').findById(this.course);
  const totalLectures = course.totalLectures;
  const completedLectures = this.progress.completedLectures.length;
  
  this.progress.completionPercentage = totalLectures > 0 
    ? Math.round((completedLectures / totalLectures) * 100)
    : 0;
  
  // If completed 100%, mark as completed
  if (this.progress.completionPercentage >= 100) {
    this.status = 'completed';
    this.completedAt = new Date();
  }
  
  return this.save();
};

enrollmentSchema.methods.issueCertificate = function() {
  if (this.status !== 'completed') {
    throw new Error('کورس مکمل کریں سرٹیفکیٹ کے لیے');
  }
  
  if (this.certificate.issued) {
    throw new Error('سرٹیفکیٹ پہلے ہی جاری ہو چکا ہے');
  }
  
  const certificateId = \`CERT-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  
  this.certificate = {
    issued: true,
    certificateId,
    issuedAt: new Date(),
    downloadUrl: \`/certificates/\${certificateId}\`
  };
  
  return this.save();
};

export const Enrollment = mongoose.models.Enrollment || 
  mongoose.model('Enrollment', enrollmentSchema);

// Helper functions
async function verifyPayment(userId, courseId) {
  // Integrate with your payment gateway
  // This is a placeholder
  return true;
}

async function sendEnrollmentEmail(email, courseTitle) {
  // Send enrollment confirmation email
  // Implementation depends on your email service
  console.log(\`Enrollment email sent to \${email} for course: \${courseTitle}\`);
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
          className="p-4 cursor-pointer rounded-full hover:text-white bg-opacity-90 text-purple-400 hover:bg-purple-100/80 hover:text-blue-500 transition-all z-[60] text-current"
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
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          باب 22: Complete Course Management System
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          کسی بھی LMS کا دل - مکمل کورس مینجمنٹ سسٹم
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
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-purple-400">
            🎓 باب کا مقصد: مکمل Course Management System
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>LMS کا سب سے اہم حصہ</strong> بنائیں گے - وہ سسٹم جس کے بغیر کوئی LMS مکمل نہیں ہوتا۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Course Database Model</h3>
              <p className="text-sm">مکمل course schema with all fields</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Instructor Panel</h3>
              <p className="text-sm">Course creation interface</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Enrollment System</h3>
              <p className="text-sm">Student enrollment & progress tracking</p>
            </div>
          </div>
        </section>

        {/* Section 22.1: Course Database Model */}
        {activeTab === "course-model" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
              22.1: Course Database Model Design
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                📊 Why Proper Database Design Matters?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-blue-300">✅ Key Features:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Support for multiple lecture types</li>
                    <li>Hierarchical structure (Course → Sections → Lectures)</li>
                    <li>Rich metadata for SEO</li>
                    <li>Pricing & enrollment tracking</li>
                    <li>Reviews & ratings system</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-purple-300">🚀 Performance:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Indexed fields for fast queries</li>
                    <li>Virtual fields for calculated values</li>
                    <li>Middleware for auto-updates</li>
                    <li>Static methods for common operations</li>
                    <li>Instance methods for business logic</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={courseModelCode} 
              colorClass="text-blue-300"
              title="models/Course.js - Complete Course Model with All Features"
            />
          </section>
        )}

        {/* Section 22.2: Instructor Panel */}
        {activeTab === "instructor-panel" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
              22.2: Instructor Course Creation Panel
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-300">
                👨‍🏫 Instructor Workflow: Step-by-Step Course Creation
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="font-bold text-green-400">Basic Info</p>
                  <p className="text-sm">Title, description, category</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <p className="font-bold text-blue-400">Curriculum</p>
                  <p className="text-sm">Sections & lectures</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <p className="font-bold text-purple-400">Pricing</p>
                  <p className="text-sm">Price & settings</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <p className="font-bold text-amber-400">Media</p>
                  <p className="text-sm">Thumbnail & promo video</p>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={instructorPanelCode} 
              colorClass="text-green-300"
              title="app/instructor/courses/create/page.jsx - Complete Course Creation Interface"
            />
          </section>
        )}

        {/* Section 22.3: Course Listing */}
        {activeTab === "course-listing" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
              22.3: Course Listing & Filtering System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                🔍 Advanced Filtering & Search Capabilities
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ Filter Options:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>By Category & Subcategory</li>
                    <li>By Instructor</li>
                    <li>By Course Level (Beginner/Advanced)</li>
                    <li>By Price (Free/Paid)</li>
                    <li>By Rating (Min 4 stars, etc.)</li>
                    <li>By Tags</li>
                    <li>By Max Price Range</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">🔧 Technical Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Pagination (12 items per page)</li>
                    <li>Multiple Sort Options</li>
                    <li>Full-text Search</li>
                    <li>Aggregation for filter data</li>
                    <li>Performance optimized queries</li>
                    <li>Cache-friendly structure</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={courseListingCode} 
              colorClass="text-purple-300"
              title="app/api/courses/route.js - Complete Course Listing API with Filters"
            />
          </section>
        )}

        {/* Section 22.4: Enrollment System */}
        {activeTab === "enrollment" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
              22.4: Student Enrollment & Progress Tracking
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-300">
                🎯 Enrollment Flow & Progress Management
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ Enrollment Process:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Check course availability</li>
                    <li>Verify payment for paid courses</li>
                    <li>Prevent duplicate enrollment</li>
                    <li>Update enrollment counts</li>
                    <li>Send confirmation email</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">📊 Progress Tracking:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Lecture completion tracking</li>
                    <li>Time spent calculation</li>
                    <li>Completion percentage</li>
                    <li>Last accessed position</li>
                    <li>Certificate issuance</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={enrollmentCode} 
              colorClass="text-red-300"
              title="app/api/courses/[id]/enroll/route.js - Complete Enrollment System"
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
              Course model implement کریں اور test data ڈالیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">2</span>
              Instructor panel test کریں - ایک sample course بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">3</span>
              Course listing page بنائیں filters کے ساتھ
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-red-500 text-white p-2 rounded">4</span>
              Enrollment system test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">5</span>
              Complete course management flow test کریں
            </p>
          </div>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 italic">
            🚀 اگلے باب میں
          </h2>
          <p className="mb-4 text-lg text-black dark:text-gray-300">
            اگلے باب میں ہم <strong>Video Upload & Streaming System</strong> بنائیں گے:
          </p>
          <ul className="list-disc pr-6 space-y-2 text-amber-700 dark:text-amber-400">
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
              🎯 اہم: اب آپ کا LMS حقیقی معنوں میں کام کرنا شروع کر دے گا!
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-2">
              Chapter 22 کے بعد آپ کے پاس مکمل Course Management System ہوگا۔ اب Video System add کریں گے۔
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 22: Complete Course Management System
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