import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter24() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("player");

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
        <div className="text-xs text-gray-500">
          {code.split("\n").length} لائنیں
        </div>
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy Code
        </button>
      </div>
      <pre
        className={`bg-gray-500 ${colorClass} p-5 rounded-xl text-left font-mono overflow-x-auto text-sm md:text-base border border-gray-800 shadow-lg`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  // ========== VIDEO PLAYER WITH HLS SUPPORT ==========
  const videoPlayerCode = `// 📁 components/video/VideoPlayer.jsx
// Advanced Video Player with HLS, Custom Controls & Analytics

"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Play, Pause, Volume2, VolumeX, Settings, Maximize,
  Minimize, SkipBack, SkipForward, Clock, Eye,
  Download, Captions, Airplay, RotateCw,
  ChevronLeft, ChevronRight, Bookmark, Share2
} from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function VideoPlayer({ video, courseId, lectureId }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [subtitles, setSubtitles] = useState([]);
  const [activeSubtitle, setActiveSubtitle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [watchTime, setWatchTime] = useState(0);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  
  // Initialize Video.js player
  useEffect(() => {
    if (videoRef.current && !playerRef.current && video?.secureUrl) {
      const playerInstance = videojs(videoRef.current, {
        controls: false,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
        html5: {
          vhs: {
            overrideNative: true,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true,
            bandwidth: 1000000
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false
        },
        sources: [
          {
            src: video.qualityUrls?.['720p'] || video.secureUrl,
            type: 'application/x-mpegURL',
            label: 'Auto',
            selected: true
          }
        ],
        tracks: video.subtitles?.map(sub => ({
          src: sub.url,
          kind: 'subtitles',
          srclang: sub.language,
          label: sub.label,
          default: sub.default
        })) || []
      });
      
      // Enable HLS quality selector
      playerInstance.hlsQualitySelector({
        displayCurrentQuality: true,
      });
      
      // Event handlers
      playerInstance.on('play', () => {
        setIsPlaying(true);
        startWatchTimeTracking();
      });
      
      playerInstance.on('pause', () => {
        setIsPlaying(false);
        stopWatchTimeTracking();
        sendAnalytics('pause');
      });
      
      playerInstance.on('timeupdate', () => {
        setCurrentTime(playerInstance.currentTime());
        setDuration(playerInstance.duration());
        
        // Check for bookmarks
        checkBookmarks(playerInstance.currentTime());
      });
      
      playerInstance.on('volumechange', () => {
        setVolume(playerInstance.volume());
        setIsMuted(playerInstance.muted());
      });
      
      playerInstance.on('ratechange', () => {
        setPlaybackRate(playerInstance.playbackRate());
      });
      
      playerInstance.on('fullscreenchange', () => {
        setIsFullscreen(playerInstance.isFullscreen());
      });
      
      playerInstance.on('error', (error) => {
        console.error('Video player error:', error);
        toast.error('ویڈیو چلانے میں مسئلہ پیش آیا');
      });
      
      playerInstance.ready(() => {
        // Auto-quality selection based on bandwidth
        const tech = playerInstance.tech({ IWillNotUseThisInPlugins: true });
        if (tech.vhs) {
          tech.vhs.selectPlaylist = function() {
            const bandwidth = this.system.bandwidth || 1000000;
            let selectedQuality = '360p';
            
            if (bandwidth > 5000000) selectedQuality = '1080p';
            else if (bandwidth > 2500000) selectedQuality = '720p';
            else if (bandwidth > 1000000) selectedQuality = '480p';
            
            setQuality(selectedQuality);
            return this.playlists.get(selectedQuality);
          };
        }
      });
      
      playerRef.current = playerInstance;
      setPlayer(playerInstance);
      
      // Load subtitles if available
      if (video.subtitles?.length > 0) {
        setSubtitles(video.subtitles);
        const defaultSub = video.subtitles.find(s => s.default) || video.subtitles[0];
        setActiveSubtitle(defaultSub);
      }
      
      // Load saved bookmarks
      loadBookmarks();
      
      return () => {
        if (playerInstance && !playerInstance.isDisposed()) {
          playerInstance.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [video]);
  
  // Watch time tracking
  const startWatchTimeTracking = () => {
    const interval = setInterval(() => {
      setWatchTime(prev => {
        const newTime = prev + 1;
        
        // Send analytics every 30 seconds
        if (newTime % 30 === 0 && !analyticsSent) {
          sendAnalytics('watch_time', { seconds: newTime });
        }
        
        // Check for completion
        if (duration > 0 && currentTime / duration > 0.8) {
          sendAnalytics('near_completion');
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  const stopWatchTimeTracking = () => {
    sendAnalytics('watch_time', { seconds: watchTime });
  };
  
  // Analytics tracking
  const sendAnalytics = async (event, data = {}) => {
    try {
      await axios.post('/api/videos/analytics', {
        videoId: video._id,
        userId: session?.user?.id,
        event,
        timestamp: new Date().toISOString(),
        currentTime,
        duration,
        playbackRate,
        quality,
        ...data
      });
      
      if (event === 'completed') {
        setAnalyticsSent(true);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };
  
  // Bookmark management
  const loadBookmarks = async () => {
    try {
      const response = await axios.get(\`/api/videos/\${video._id}/bookmarks\`);
      if (response.data.success) {
        setBookmarks(response.data.bookmarks);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };
  
  const addBookmark = async (time, note = '') => {
    try {
      const response = await axios.post(\`/api/videos/\${video._id}/bookmarks\`, {
        time,
        note,
        userId: session?.user?.id
      });
      
      if (response.data.success) {
        setBookmarks(prev => [...prev, response.data.bookmark]);
        toast.success('بک مارک محفوظ ہو گیا');
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };
  
  const checkBookmarks = (time) => {
    // Check if time is near any bookmark (within 5 seconds)
    const nearBookmark = bookmarks.find(
      b => Math.abs(b.time - time) < 5
    );
    
    if (nearBookmark && !nearBookmark.notified) {
      toast.info(\`بک مارک: \${nearBookmark.note || time} پر\`);
      // Mark as notified
      setBookmarks(prev => 
        prev.map(b => 
          b._id === nearBookmark._id 
            ? { ...b, notified: true }
            : b
        )
      );
    }
  };
  
  // Player controls
  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
        sendAnalytics('play');
      }
    }
  };
  
  const seek = (time) => {
    if (player) {
      player.currentTime(time);
      setCurrentTime(time);
    }
  };
  
  const skip = (seconds) => {
    if (player) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      seek(newTime);
      sendAnalytics('skip', { seconds });
    }
  };
  
  const changeVolume = (newVolume) => {
    if (player) {
      player.volume(newVolume);
      player.muted(newVolume === 0);
    }
  };
  
  const toggleMute = () => {
    if (player) {
      player.muted(!isMuted);
    }
  };
  
  const changePlaybackRate = (rate) => {
    if (player) {
      player.playbackRate(rate);
      sendAnalytics('playback_rate_change', { rate });
    }
  };
  
  const changeQuality = (newQuality) => {
    if (player && video.qualityUrls?.[newQuality]) {
      player.src({
        src: video.qualityUrls[newQuality],
        type: 'application/x-mpegURL'
      });
      setQuality(newQuality);
      sendAnalytics('quality_change', { quality: newQuality });
    }
  };
  
  const toggleFullscreen = () => {
    if (player) {
      if (isFullscreen) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
    }
  };
  
  const changeSubtitle = (subtitle) => {
    if (player) {
      const tracks = player.textTracks();
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = tracks[i].language === subtitle.language ? 'showing' : 'disabled';
      }
      setActiveSubtitle(subtitle);
    }
  };
  
  // Format time
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return \`\${h}:\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
    }
    return \`\${m}:\${s.toString().padStart(2, '0')}\`;
  };
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(e.target)) return;
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(Math.max(0, volume - 0.1));
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'b':
          e.preventDefault();
          addBookmark(currentTime, \`\${formatTime(currentTime)} پر بک مارک\`);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [player, volume, currentTime]);
  
  // Handle video completion
  useEffect(() => {
    if (duration > 0 && currentTime >= duration - 1 && !analyticsSent) {
      sendAnalytics('completed');
      toast.success('ویڈیو مکمل ہو گئی!');
    }
  }, [currentTime, duration]);
  
  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
          poster={video.thumbnailUrl}
          crossOrigin="anonymous"
          playsInline
        />
      </div>
      
      {/* Custom Controls Overlay */}
      <div className={\`absolute inset-0 transition-opacity duration-300 \${showControls ? 'opacity-100' : 'opacity-0'}\`}>
        
        {/* Top Controls Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div>
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
                <p className="text-white/70 text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors relative"
              >
                <Settings className="h-6 w-6" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="h-6 w-6" />
                ) : (
                  <Maximize className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 p-6 rounded-full transition-all transform scale-100 group-hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="h-12 w-12 text-white" />
            ) : (
              <Play className="h-12 w-12 text-white ml-1" />
            )}
          </button>
        </div>
        
        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="relative h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                style={{ width: \`\${(currentTime / duration) * 100 || 0}%\` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {/* Bookmarks on progress bar */}
              {bookmarks.map(bookmark => (
                <div
                  key={bookmark._id}
                  className="absolute top-1/2 w-2 h-2 bg-yellow-500 rounded-full transform -translate-y-1/2"
                  style={{ left: \`\${(bookmark.time / duration) * 100}%\` }}
                  title={bookmark.note}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-white text-sm mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(duration - currentTime)}</span>
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              
              {/* Skip Backward */}
              <button
                onClick={() => skip(-10)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <SkipBack className="h-6 w-6" />
              </button>
              
              {/* Skip Forward */}
              <button
                onClick={() => skip(10)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <SkipForward className="h-6 w-6" />
              </button>
              
              {/* Volume Control */}
              <div className="relative group/volume">
                <button
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-6 w-6" />
                  ) : (
                    <Volume2 className="h-6 w-6" />
                  )}
                </button>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/volume:opacity-100 transition-opacity">
                  <div className="bg-black/90 rounded-lg p-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => changeVolume(parseFloat(e.target.value))}
                      className="w-32 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>
              </div>
              
              {/* Time Display */}
              <span className="text-white font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Playback Speed */}
              <div className="relative group/speed">
                <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                  <RotateCw className="h-6 w-6" />
                  <span className="text-xs absolute -bottom-1 -right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                    {playbackRate}x
                  </span>
                </button>
                
                <div className="absolute bottom-full right-0 opacity-0 group-hover/speed:opacity-100 transition-opacity">
                  <div className="bg-black/90 rounded-lg p-2 space-y-1">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => changePlaybackRate(rate)}
                        className={\`block w-full text-left px-3 py-1 rounded hover:bg-white/20 \${playbackRate === rate ? 'bg-blue-500' : 'text-white'}\`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quality Selector */}
              {video.qualityUrls && (
                <div className="relative group/quality">
                  <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                    <Settings className="h-6 w-6" />
                  </button>
                  
                  <div className="absolute bottom-full right-0 opacity-0 group-hover/quality:opacity-100 transition-opacity">
                    <div className="bg-black/90 rounded-lg p-2 space-y-1">
                      <div className="text-white text-xs px-3 py-1 opacity-70">
                        کوالٹی:
                      </div>
                      {['auto', '360p', '480p', '720p', '1080p'].map(q => (
                        <button
                          key={q}
                          onClick={() => changeQuality(q)}
                          className={\`block w-full text-left px-3 py-1 rounded hover:bg-white/20 \${quality === q ? 'bg-blue-500' : 'text-white'}\`}
                        >
                          {q === 'auto' ? 'آٹومیٹک' : q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Subtitles */}
              {subtitles.length > 0 && (
                <div className="relative group/subtitles">
                  <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                    <Captions className="h-6 w-6" />
                  </button>
                  
                  <div className="absolute bottom-full right-0 opacity-0 group-hover/subtitles:opacity-100 transition-opacity">
                    <div className="bg-black/90 rounded-lg p-2 space-y-1">
                      <button
                        onClick={() => changeSubtitle(null)}
                        className={\`block w-full text-left px-3 py-1 rounded hover:bg-white/20 \${!activeSubtitle ? 'bg-blue-500' : 'text-white'}\`}
                      >
                        سب ٹائٹلز بند
                      </button>
                      {subtitles.map(sub => (
                        <button
                          key={sub.language}
                          onClick={() => changeSubtitle(sub)}
                          className={\`block w-full text-left px-3 py-1 rounded hover:bg-white/20 \${activeSubtitle?.language === sub.language ? 'bg-blue-500' : 'text-white'}\`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bookmark */}
              <button
                onClick={() => addBookmark(currentTime, \`\${formatTime(currentTime)} پر بک مارک\`)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                title="Add Bookmark (B)"
              >
                <Bookmark className="h-6 w-6" />
              </button>
              
              {/* Download (if allowed) */}
              {video.allowDownload && (
                <a
                  href={video.secureUrl}
                  download
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <Download className="h-6 w-6" />
                </a>
              )}
              
              {/* Share */}
              <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-16 right-4 bg-black/90 rounded-lg p-4 w-64">
            <h4 className="text-white font-bold mb-3">سیٹنگز</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-white text-sm block mb-1">
                  پلے بیک سپیڈ
                </label>
                <select
                  value={playbackRate}
                  onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded px-3 py-2"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x (نارمل)</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm block mb-1">
                  کوالٹی
                </label>
                <select
                  value={quality}
                  onChange={(e) => changeQuality(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded px-3 py-2"
                >
                  <option value="auto">آٹومیٹک</option>
                  <option value="360p">360p</option>
                  <option value="480p">480p</option>
                  <option value="720p">720p (ایچ ڈی)</option>
                  <option value="1080p">1080p (فُل ایچ ڈی)</option>
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm block mb-1">
                  آڈیو ٹریک
                </label>
                <select className="w-full bg-gray-800 text-white rounded px-3 py-2">
                  <option value="urdu">اردو</option>
                  <option value="english">انگریزی</option>
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm block mb-1 flex items-center justify-between">
                  <span>لُوپ</span>
                  <input type="checkbox" className="toggle" />
                </label>
              </div>
              
              <div>
                <label className="text-white text-sm block mb-1 flex items-center justify-between">
                  <span>آٹو پلے اگلی ویڈیو</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-20 left-4 bg-black/90 rounded-lg p-3 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Space</kbd>
              <span>پلے/پاز</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">← →</kbd>
              <span>10s سکیپ</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">F</kbd>
              <span>فُل سکرین</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">M</kbd>
              <span>مُیوٹ</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">B</kbd>
              <span>بک مارک</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analytics Tracking (Hidden) */}
      <div className="hidden">
        <div data-video-id={video._id} />
        <div data-user-id={session?.user?.id} />
        <div data-watch-time={watchTime} />
        <div data-quality={quality} />
      </div>
    </div>
  );
}`;

  // ========== VIDEO SECURITY & ENCRYPTION ==========
  const videoSecurityCode = `// 📁 lib/video-security.js
// Video Encryption, DRM & Security Utilities

import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// 🔐 AES-256 Encryption for Video URLs
export class VideoEncryption {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.key = crypto.createHash('sha256')
      .update(process.env.VIDEO_ENCRYPTION_KEY || 'your-secret-key-32-chars')
      .digest();
    this.iv = crypto.randomBytes(16);
  }

  // Encrypt video URL
  encryptUrl(url, options = {}) {
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      
      const data = JSON.stringify({
        url,
        expiry: options.expiry || Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        allowedIps: options.allowedIps || [],
        userId: options.userId,
        maxViews: options.maxViews || 1
      });
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      return {
        encryptedUrl: encrypted,
        iv: this.iv.toString('hex'),
        hash: this.generateHash(url)
      };
      
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }

  // Decrypt video URL
  decryptUrl(encryptedData) {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        Buffer.from(encryptedData.iv, 'hex')
      );
      
      let decrypted = decipher.update(encryptedData.encryptedUrl, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return JSON.parse(decrypted);
      
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

  // Generate secure hash for verification
  generateHash(url) {
    return crypto
      .createHmac('sha256', this.key)
      .update(url)
      .digest('hex');
  }

  // Verify video access
  verifyAccess(encryptedData, userInfo) {
    const decrypted = this.decryptUrl(encryptedData);
    
    if (!decrypted) return { allowed: false, reason: 'Invalid token' };
    
    // Check expiry
    if (decrypted.expiry < Date.now()) {
      return { allowed: false, reason: 'Token expired' };
    }
    
    // Check IP restriction
    if (decrypted.allowedIps.length > 0) {
      const userIp = userInfo.ip;
      if (!decrypted.allowedIps.includes(userIp)) {
        return { allowed: false, reason: 'IP not allowed' };
      }
    }
    
    // Check user restriction
    if (decrypted.userId && decrypted.userId !== userInfo.userId) {
      return { allowed: false, reason: 'User not authorized' };
    }
    
    return { allowed: true, url: decrypted.url };
  }
}

// 🛡️ Cloudinary Signed URLs with Expiry
export class CloudinarySecurity {
  // Generate signed URL with expiry
  static generateSignedUrl(publicId, options = {}) {
    const expiresAt = Math.floor(Date.now() / 1000) + (options.expiry || 3600); // 1 hour default
    
    return cloudinary.url(publicId, {
      resource_type: 'video',
      secure: true,
      sign_url: true,
      expires_at: expiresAt,
      transformation: options.transformation || []
    });
  }

  // Generate token-based URL
  static generateTokenUrl(publicId, tokenData) {
    const token = jwt.sign(
      {
        pid: publicId,
        exp: Math.floor(Date.now() / 1000) + (tokenData.expiry || 3600),
        uid: tokenData.userId,
        cid: tokenData.courseId,
        vid: tokenData.videoId
      },
      process.env.JWT_SECRET,
      { algorithm: 'HS256' }
    );

    return \`/api/videos/stream?token=\${token}\`;
  }

  // Verify token
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

// 🔒 DRM (Digital Rights Management) Integration
export class DRMManager {
  // Widevine DRM (for Chrome, Android)
  static getWidevineConfig(videoId) {
    return {
      licenseServerUrl: process.env.WIDEVINE_LICENSE_URL,
      videoId,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': \`Bearer \${process.env.DRM_LICENSE_KEY}\`
      }
    };
  }

  // PlayReady DRM (for Edge, Windows)
  static getPlayReadyConfig(videoId) {
    return {
      licenseServerUrl: process.env.PLAYREADY_LICENSE_URL,
      videoId,
      headers: {
        'Content-Type': 'text/xml',
        'Authorization': \`Bearer \${process.env.DRM_LICENSE_KEY}\`
      }
    };
  }

  // FairPlay DRM (for Safari, iOS)
  static getFairPlayConfig(videoId) {
    return {
      licenseServerUrl: process.env.FAIRPLAY_LICENSE_URL,
      certificateUrl: process.env.FAIRPLAY_CERTIFICATE_URL,
      videoId,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': \`Bearer \${process.env.DRM_LICENSE_KEY}\`
      }
    };
  }

  // Get DRM config based on browser
  static getDRMConfig(videoId, userAgent) {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('chrome') || ua.includes('android')) {
      return this.getWidevineConfig(videoId);
    } else if (ua.includes('edge') || ua.includes('windows')) {
      return this.getPlayReadyConfig(videoId);
    } else if (ua.includes('safari') || ua.includes('mac') || ua.includes('ios')) {
      return this.getFairPlayConfig(videoId);
    }
    
    return null; // No DRM for unsupported browsers
  }
}

// 🎬 Secure Video Streaming API
export class SecureStreaming {
  // Generate secure streaming manifest
  static async generateSecureManifest(video, userInfo) {
    const encryption = new VideoEncryption();
    
    // Generate encrypted URLs for different qualities
    const qualityUrls = {};
    
    if (video.qualityUrls) {
      for (const [quality, url] of Object.entries(video.qualityUrls)) {
        const encrypted = encryption.encryptUrl(url, {
          userId: userInfo.userId,
          expiry: Date.now() + (2 * 60 * 60 * 1000), // 2 hours
          maxViews: 3
        });
        
        if (encrypted) {
          qualityUrls[quality] = {
            encrypted: encrypted.encryptedUrl,
            iv: encrypted.iv,
            hash: encrypted.hash
          };
        }
      }
    }

    // Generate HLS manifest with encryption
    const manifest = {
      version: 3,
      videoId: video._id,
      title: video.title,
      duration: video.duration,
      qualities: qualityUrls,
      subtitles: video.subtitles || [],
      encryption: {
        algorithm: 'AES-256-CBC',
        keyRotation: true,
        rotationInterval: 300 // 5 minutes
      },
      security: {
        requiresAuth: video.accessType !== 'public',
        maxBitrate: this.getMaxBitrate(userInfo),
        allowedDevices: this.getAllowedDevices(userInfo),
        watermark: this.generateWatermark(userInfo.userId)
      },
      timestamp: Date.now(),
      expiry: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
    };

    // Sign the manifest
    manifest.signature = this.signManifest(manifest);
    
    return manifest;
  }

  // Get max bitrate based on user subscription
  static getMaxBitrate(userInfo) {
    const subscription = userInfo.subscription || 'free';
    
    const bitrates = {
      free: 1500000, // 1.5 Mbps
      basic: 2500000, // 2.5 Mbps
      premium: 5000000, // 5 Mbps
      enterprise: 10000000 // 10 Mbps
    };
    
    return bitrates[subscription] || bitrates.free;
  }

  // Get allowed devices based on user plan
  static getAllowedDevices(userInfo) {
    const subscription = userInfo.subscription || 'free';
    
    const devices = {
      free: 1,
      basic: 2,
      premium: 4,
      enterprise: 10
    };
    
    return devices[subscription] || 1;
  }

  // Generate user-specific watermark
  static generateWatermark(userId) {
    const canvas = require('canvas');
    const { createCanvas } = canvas;
    
    const canvasInstance = createCanvas(300, 100);
    const ctx = canvasInstance.getContext('2d');
    
    // Draw watermark
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = '20px Arial';
    ctx.fillText(\`User: \${userId}\`, 10, 30);
    ctx.fillText(new Date().toISOString(), 10, 60);
    
    return canvasInstance.toDataURL();
  }

  // Sign manifest for verification
  static signManifest(manifest) {
    const data = JSON.stringify(manifest);
    return crypto
      .createHmac('sha256', process.env.MANIFEST_SECRET)
      .update(data)
      .digest('hex');
  }

  // Verify manifest signature
  static verifyManifest(manifest, signature) {
    const computedSignature = this.signManifest(manifest);
    return computedSignature === signature;
  }
}

// 📡 Secure Streaming API Route
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');
    const token = searchParams.get('token');
    
    if (!videoId || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing parameters' }),
        { status: 400 }
      );
    }
    
    // Verify token
    const decoded = CloudinarySecurity.verifyToken(token);
    if (!decoded) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401 }
      );
    }
    
    // Check if token matches video
    if (decoded.vid !== videoId) {
      return new Response(
        JSON.stringify({ error: 'Token mismatch' }),
        { status: 403 }
      );
    }
    
    // Get video from database
    const Video = require('@/models/Video');
    const video = await Video.findById(videoId);
    
    if (!video) {
      return new Response(
        JSON.stringify({ error: 'Video not found' }),
        { status: 404 }
      );
    }
    
    // Check user access
    if (!video.canUserAccess(decoded.uid)) {
      return new Response(
        JSON.stringify({ error: 'Access denied' }),
        { status: 403 }
      );
    }
    
    // Generate secure manifest
    const streaming = new SecureStreaming();
    const userInfo = {
      userId: decoded.uid,
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      subscription: 'premium', // Get from user profile
      userAgent: req.headers.get('user-agent')
    };
    
    const manifest = await streaming.generateSecureManifest(video, userInfo);
    
    // Add DRM if enabled
    if (video.isEncrypted) {
      const drm = DRMManager.getDRMConfig(videoId, userInfo.userAgent);
      if (drm) {
        manifest.drm = drm;
      }
    }
    
    return new Response(
      JSON.stringify(manifest),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
    
  } catch (error) {
    console.error('Streaming API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}`;

  // ========== VIDEO ANALYTICS & TRACKING ==========
  const videoAnalyticsCode = `// 📁 models/VideoAnalytics.js
// Complete Video Analytics & Tracking System

import mongoose from 'mongoose';

const videoAnalyticsSchema = new mongoose.Schema({
  // Video Reference
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
    index: true
  },
  
  // User Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Course Reference
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  
  // Session Information
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  
  deviceId: String,
  
  // Playback Events
  events: [{
    type: {
      type: String,
      enum: [
        'play', 'pause', 'seek', 'buffer', 'error',
        'quality_change', 'playback_rate_change',
        'fullscreen', 'volume_change', 'complete',
        'download', 'share', 'bookmark'
      ],
      required: true
    },
    
    timestamp: {
      type: Date,
      default: Date.now
    },
    
    videoTime: Number, // Time in video when event occurred
    
    duration: Number, // Duration of the event (for play, buffer)
    
    data: mongoose.Schema.Types.Mixed // Additional event data
    
  }],
  
  // Watch Time Tracking
  watchSessions: [{
    startTime: {
      type: Date,
      required: true
    },
    
    endTime: {
      type: Date,
      required: true
    },
    
    duration: Number, // in seconds
    
    startVideoTime: Number,
    
    endVideoTime: Number
    
  }],
  
  // Completion Tracking
  completion: {
    firstCompletion: Date,
    lastCompletion: Date,
    completionCount: {
      type: Number,
      default: 0
    },
    
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    
    // Detailed completion segments
    segmentsWatched: [{
      start: Number,
      end: Number,
      duration: Number
    }]
  },
  
  // Quality & Performance Metrics
  qualityMetrics: {
    initialQuality: String,
    qualityChanges: [{
      from: String,
      to: String,
      timestamp: Date,
      reason: String
    }],
    
    averageQuality: String,
    
    bufferingEvents: [{
      duration: Number,
      timestamp: Date,
      videoTime: Number
    }],
    
    totalBufferingTime: {
      type: Number,
      default: 0
    },
    
    averageBitrate: Number,
    
    droppedFrames: Number
  },
  
  // Engagement Metrics
  engagement: {
    averageWatchTime: Number,
    
    totalWatchTime: {
      type: Number,
      default: 0
    },
    
    watchFrequency: {
      daily: Number,
      weekly: Number,
      monthly: Number
    },
    
    // Heatmap data (percentage watched per segment)
    heatmap: [{
      segment: Number, // 0-9 representing 10% segments
      watchTime: Number,
      percentage: Number
    }],
    
    // Re-watch behavior
    rewatchedSegments: [{
      segment: Number,
      count: Number
    }],
    
    // Skip behavior
    skippedSegments: [{
      segment: Number,
      count: Number
    }],
    
    // Bookmarks
    bookmarks: [{
      time: Number,
      note: String,
      createdAt: Date
    }]
  },
  
  // Device & Network Information
  deviceInfo: {
    userAgent: String,
    browser: String,
    browserVersion: String,
    os: String,
    osVersion: String,
    deviceType: String, // mobile, tablet, desktop
    screenResolution: String,
    language: String,
    timezone: String
  },
  
  networkInfo: {
    connectionType: String, // wifi, 4g, 3g, ethernet
    effectiveType: String, // 4g, 3g, 2g
    downlink: Number, // Mbps
    rtt: Number, // Round trip time in ms
    saveData: Boolean
  },
  
  // Geographic Information
  location: {
    ip: String,
    country: String,
    region: String,
    city: String,
    timezone: String,
    latitude: Number,
    longitude: Number
  },
  
  // Timestamps
  firstWatched: {
    type: Date,
    default: Date.now
  },
  
  lastWatched: {
    type: Date,
    default: Date.now
  },
  
  totalSessions: {
    type: Number,
    default: 0
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  metadata: mongoose.Schema.Types.Mixed
  
}, {
  timestamps: true
});

// Indexes for efficient queries
videoAnalyticsSchema.index({ video: 1, user: 1 });
videoAnalyticsSchema.index({ 'events.timestamp': 1 });
videoAnalyticsSchema.index({ 'watchSessions.startTime': 1 });
videoAnalyticsSchema.index({ completionPercentage: 1 });
videoAnalyticsSchema.index({ 'engagement.totalWatchTime': 1 });

// Pre-save middleware
videoAnalyticsSchema.pre('save', function(next) {
  // Update last watched timestamp
  this.lastWatched = new Date();
  
  // Calculate total watch time from sessions
  if (this.watchSessions.length > 0) {
    this.engagement.totalWatchTime = this.watchSessions.reduce(
      (total, session) => total + (session.duration || 0),
      0
    );
    
    // Calculate average watch time
    this.engagement.averageWatchTime = 
      this.engagement.totalWatchTime / this.watchSessions.length;
  }
  
  // Calculate completion percentage
  if (this.completion.segmentsWatched.length > 0) {
    const videoDuration = this.video?.duration || 0;
    if (videoDuration > 0) {
      const totalWatched = this.completion.segmentsWatched.reduce(
        (total, segment) => total + segment.duration,
        0
      );
      this.completion.completionPercentage = Math.min(
        100,
        (totalWatched / videoDuration) * 100
      );
    }
  }
  
  next();
});

// Static methods for analytics
videoAnalyticsSchema.statics.getVideoStats = async function(videoId) {
  const stats = await this.aggregate([
    { $match: { video: mongoose.Types.ObjectId(videoId) } },
    
    {
      $group: {
        _id: '$video',
        
        totalViews: { $sum: 1 },
        
        uniqueUsers: { $addToSet: '$user' },
        
        totalWatchTime: { $sum: '$engagement.totalWatchTime' },
        
        averageCompletion: { $avg: '$completion.completionPercentage' },
        
        completions: {
          $sum: {
            $cond: [{ $gte: ['$completion.completionPercentage', 80] }, 1, 0]
          }
        },
        
        averageSessionDuration: { $avg: '$engagement.averageWatchTime' },
        
        // Device breakdown
        devices: {
          $push: '$deviceInfo.deviceType'
        },
        
        // Quality distribution
        qualities: {
          $push: '$qualityMetrics.averageQuality'
        },
        
        // Geographic distribution
        countries: {
          $push: '$location.country'
        }
      }
    },
    
    {
      $project: {
        totalViews: 1,
        uniqueUsers: { $size: '$uniqueUsers' },
        totalWatchTime: 1,
        averageCompletion: { $round: ['$averageCompletion', 2] },
        completionRate: {
          $cond: [
            { $gt: ['$totalViews', 0] },
            { $multiply: [{ $divide: ['$completions', '$totalViews'] }, 100] },
            0
          ]
        },
        averageSessionDuration: { $round: ['$averageSessionDuration', 2] },
        
        // Device percentages
        deviceBreakdown: {
          desktop: {
            $size: {
              $filter: {
                input: '$devices',
                as: 'device',
                cond: { $eq: ['$$device', 'desktop'] }
              }
            }
          },
          mobile: {
            $size: {
              $filter: {
                input: '$devices',
                as: 'device',
                cond: { $eq: ['$$device', 'mobile'] }
              }
            }
          },
          tablet: {
            $size: {
              $filter: {
                input: '$devices',
                as: 'device',
                cond: { $eq: ['$$device', 'tablet'] }
              }
            }
          }
        },
        
        // Quality percentages
        qualityDistribution: {
          '360p': {
            $size: {
              $filter: {
                input: '$qualities',
                as: 'quality',
                cond: { $eq: ['$$quality', '360p'] }
              }
            }
          },
          '480p': {
            $size: {
              $filter: {
                input: '$qualities',
                as: 'quality',
                cond: { $eq: ['$$quality', '480p'] }
              }
            }
          },
          '720p': {
            $size: {
              $filter: {
                input: '$qualities',
                as: 'quality',
                cond: { $eq: ['$$quality', '720p'] }
              }
            }
          },
          '1080p': {
            $size: {
              $filter: {
                input: '$qualities',
                as: 'quality',
                cond: { $eq: ['$$quality', '1080p'] }
              }
            }
          }
        }
      }
    }
  ]);
  
  return stats[0] || null;
};

videoAnalyticsSchema.statics.getUserProgress = async function(userId, courseId) {
  return this.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        course: mongoose.Types.ObjectId(courseId)
      }
    },
    
    {
      $lookup: {
        from: 'videos',
        localField: 'video',
        foreignField: '_id',
        as: 'videoDetails'
      }
    },
    
    { $unwind: '$videoDetails' },
    
    {
      $group: {
        _id: '$course',
        
        totalVideos: { $sum: 1 },
        
        totalWatchTime: { $sum: '$engagement.totalWatchTime' },
        
        completedVideos: {
          $sum: {
            $cond: [{ $gte: ['$completion.completionPercentage', 80] }, 1, 0]
          }
        },
        
        averageCompletion: { $avg: '$completion.completionPercentage' },
        
        videos: {
          $push: {
            videoId: '$video',
            title: '$videoDetails.title',
            duration: '$videoDetails.duration',
            completion: '$completion.completionPercentage',
            lastWatched: '$lastWatched',
            watchTime: '$engagement.totalWatchTime'
          }
        }
      }
    },
    
    {
      $project: {
        totalVideos: 1,
        completedVideos: 1,
        completionRate: {
          $multiply: [
            { $divide: ['$completedVideos', '$totalVideos'] },
            100
          ]
        },
        averageCompletion: { $round: ['$averageCompletion', 2] },
        totalWatchTime: 1,
        videos: 1
      }
    }
  ]);
};

videoAnalyticsSchema.statics.getHeatmapData = async function(videoId) {
  return this.aggregate([
    { $match: { video: mongoose.Types.ObjectId(videoId) } },
    
    { $unwind: '$engagement.heatmap' },
    
    {
      $group: {
        _id: '$engagement.heatmap.segment',
        
        totalWatchTime: { $sum: '$engagement.heatmap.watchTime' },
        
        viewCount: { $sum: 1 },
        
        averageWatchTime: { $avg: '$engagement.heatmap.watchTime' },
        
        averagePercentage: { $avg: '$engagement.heatmap.percentage' }
      }
    },
    
    { $sort: { _id: 1 } },
    
    {
      $project: {
        segment: '$_id',
        totalWatchTime: 1,
        viewCount: 1,
        averageWatchTime: { $round: ['$averageWatchTime', 2] },
        averagePercentage: { $round: ['$averagePercentage', 2] },
        _id: 0
      }
    }
  ]);
};

// Instance methods
videoAnalyticsSchema.methods.addEvent = function(eventType, data = {}) {
  this.events.push({
    type: eventType,
    timestamp: new Date(),
    videoTime: data.videoTime || 0,
    duration: data.duration || 0,
    data: data
  });
  
  // Update total sessions count
  if (eventType === 'play' && !this.currentSession) {
    this.totalSessions += 1;
    this.currentSession = {
      startTime: new Date(),
      startVideoTime: data.videoTime || 0
    };
  }
  
  // End session on pause/complete
  if ((eventType === 'pause' || eventType === 'complete') && this.currentSession) {
    this.watchSessions.push({
      startTime: this.currentSession.startTime,
      endTime: new Date(),
      duration: (new Date() - this.currentSession.startTime) / 1000,
      startVideoTime: this.currentSession.startVideoTime,
      endVideoTime: data.videoTime || 0
    });
    
    this.currentSession = null;
  }
  
  // Track completion
  if (eventType === 'complete') {
    this.completion.completionCount += 1;
    this.completion.lastCompletion = new Date();
    
    if (!this.completion.firstCompletion) {
      this.completion.firstCompletion = new Date();
    }
  }
};

videoAnalyticsSchema.methods.updateHeatmap = function(segment, watchTime, percentage) {
  const heatmapEntry = this.engagement.heatmap.find(h => h.segment === segment);
  
  if (heatmapEntry) {
    heatmapEntry.watchTime += watchTime;
    heatmapEntry.percentage = percentage;
  } else {
    this.engagement.heatmap.push({
      segment,
      watchTime,
      percentage
    });
  }
};

const VideoAnalytics = mongoose.models.VideoAnalytics || 
  mongoose.model('VideoAnalytics', videoAnalyticsSchema);

export default VideoAnalytics;`;

  // ========== MOBILE OPTIMIZATION ==========
  const mobileOptimizationCode = `// 📁 lib/video-optimization.js
// Mobile Video Optimization & Adaptive Streaming

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// 📱 Mobile Device Detection & Optimization
export class MobileOptimizer {
  // Detect device type and capabilities
  static detectDevice(userAgent) {
    const ua = userAgent.toLowerCase();
    
    return {
      isMobile: /mobile|android|iphone|ipod|ipad|blackberry|windows phone/i.test(ua),
      isTablet: /tablet|ipad/i.test(ua),
      isDesktop: !/mobile|tablet|android|iphone|ipod|ipad/i.test(ua),
      
      os: this.detectOS(ua),
      browser: this.detectBrowser(ua),
      
      // Screen capabilities
      screenSize: this.estimateScreenSize(ua),
      touchSupport: this.hasTouchSupport(ua),
      
      // Network capabilities
      connection: this.estimateConnection(ua)
    };
  }

  static detectOS(ua) {
    if (/windows/i.test(ua)) return 'windows';
    if (/mac os/i.test(ua)) return 'macos';
    if (/linux/i.test(ua)) return 'linux';
    if (/android/i.test(ua)) return 'android';
    if (/ios|iphone|ipad|ipod/i.test(ua)) return 'ios';
    return 'unknown';
  }

  static detectBrowser(ua) {
    if (/chrome/i.test(ua)) return 'chrome';
    if (/firefox/i.test(ua)) return 'firefox';
    if (/safari/i.test(ua)) return 'safari';
    if (/edge/i.test(ua)) return 'edge';
    if (/opera/i.test(ua)) return 'opera';
    return 'unknown';
  }

  static estimateScreenSize(ua) {
    if (/mobile/i.test(ua)) return 'small';
    if (/tablet/i.test(ua)) return 'medium';
    return 'large';
  }

  static hasTouchSupport(ua) {
    return /mobile|tablet|android|iphone|ipad/i.test(ua);
  }

  static estimateConnection(ua) {
    // This is simplified - in production, use Network Information API
    if (/mobile/i.test(ua)) return '3g/4g';
    return 'wifi';
  }

  // Get optimal video settings for device
  static getOptimalSettings(deviceInfo) {
    const profiles = {
      mobile: {
        maxResolution: '720p',
        maxBitrate: 1500000, // 1.5 Mbps
        bufferSize: 10, // seconds
        codec: 'h264',
        format: 'mp4',
        audioBitrate: 96000, // 96 kbps
        optimizeForMobile: true
      },
      
      tablet: {
        maxResolution: '1080p',
        maxBitrate: 2500000, // 2.5 Mbps
        bufferSize: 15,
        codec: 'h264',
        format: 'mp4',
        audioBitrate: 128000, // 128 kbps
        optimizeForMobile: true
      },
      
      desktop: {
        maxResolution: '4k',
        maxBitrate: 8000000, // 8 Mbps
        bufferSize: 30,
        codec: 'h264',
        format: 'mp4',
        audioBitrate: 192000, // 192 kbps
        optimizeForMobile: false
      }
    };

    let profile = 'desktop';
    
    if (deviceInfo.isMobile) profile = 'mobile';
    else if (deviceInfo.isTablet) profile = 'tablet';
    
    return profiles[profile];
  }
}

// 🎬 Adaptive Streaming Manager
export class AdaptiveStreaming {
  // Generate adaptive streaming manifest
  static generateAdaptiveManifest(video, deviceInfo) {
    const settings = MobileOptimizer.getOptimalSettings(deviceInfo);
    
    // Get available qualities from video
    const availableQualities = video.qualityUrls ? 
      Object.keys(video.qualityUrls) : ['720p'];
    
    // Filter qualities based on device capabilities
    const supportedQualities = this.filterQualities(
      availableQualities,
      settings.maxResolution
    );
    
    // Create HLS manifest with adaptive streaming
    const manifest = {
      version: 3,
      videoId: video._id,
      duration: video.duration,
      
      // Master playlist
      playlists: supportedQualities.map(quality => ({
        quality,
        bandwidth: this.getBandwidthForQuality(quality),
        resolution: this.getResolutionForQuality(quality),
        codecs: 'avc1.42E01E,mp4a.40.2',
        url: video.qualityUrls[quality] || video.secureUrl,
        isDefault: quality === this.getDefaultQuality(supportedQualities, deviceInfo)
      })),
      
      // Audio tracks
      audioTracks: [
        {
          language: 'ur',
          label: 'اردو',
          url: \`\${video.secureUrl}.m3u8\`,
          isDefault: true
        }
      ],
      
      // Subtitle tracks
      subtitleTracks: video.subtitles?.map(sub => ({
        language: sub.language,
        label: sub.label,
        url: sub.url,
        isDefault: sub.default
      })) || [],
      
      // Streaming settings
      streaming: {
        targetDuration: 6,
        mediaSequence: 0,
        allowCache: true,
        endlist: true
      },
      
      // Adaptive streaming rules
      adaptation: {
        switchInterval: 2000, // Check every 2 seconds
        bufferLength: settings.bufferSize,
        bandwidthSafetyFactor: 0.8,
        qualitySwitchStrategy: 'bandwidth'
      },
      
      // Device-specific optimizations
      optimizations: {
        forMobile: settings.optimizeForMobile,
        prefetchSegments: 3,
        lowLatencyMode: deviceInfo.isMobile,
        backgroundPlayback: deviceInfo.isMobile
      }
    };
    
    return manifest;
  }

  static filterQualities(qualities, maxResolution) {
    const resolutionOrder = ['1440p', '1080p', '720p', '480p', '360p'];
    const maxIndex = resolutionOrder.indexOf(maxResolution);
    
    return qualities.filter(quality => {
      const qualityIndex = resolutionOrder.indexOf(quality);
      return qualityIndex >= 0 && qualityIndex <= maxIndex;
    }).sort((a, b) => 
      resolutionOrder.indexOf(b) - resolutionOrder.indexOf(a)
    );
  }

  static getBandwidthForQuality(quality) {
    const bandwidths = {
      '360p': 500000,    // 500 kbps
      '480p': 1000000,   // 1 Mbps
      '720p': 2500000,   // 2.5 Mbps
      '1080p': 5000000,  // 5 Mbps
      '1440p': 8000000   // 8 Mbps
    };
    
    return bandwidths[quality] || 1000000;
  }

  static getResolutionForQuality(quality) {
    const resolutions = {
      '360p': '640x360',
      '480p': '854x480',
      '720p': '1280x720',
      '1080p': '1920x1080',
      '1440p': '2560x1440'
    };
    
    return resolutions[quality] || '1280x720';
  }

  static getDefaultQuality(qualities, deviceInfo) {
    // Default to medium quality for mobile
    if (deviceInfo.isMobile) {
      return qualities.includes('480p') ? '480p' : qualities[0];
    }
    
    // Default to highest quality for desktop
    return qualities[0];
  }

  // Generate mobile-optimized thumbnail
  static generateMobileThumbnail(publicId, options = {}) {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      transformation: [
        { width: 400, height: 225, crop: 'fill' },
        { quality: 'auto:low' },
        { format: 'webp' }, // WebP for better mobile compression
        { fetch_format: 'auto' }
      ]
    });
  }

  // Generate progressive download URL (for slower networks)
  static generateProgressiveUrl(publicId, quality = '360p') {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      transformation: [
        { width: this.getWidthForQuality(quality) },
        { quality: 'auto:eco' }, // Economic quality for slow networks
        { format: 'mp4' },
        { streaming_profile: 'none' } // Disable streaming for progressive
      ]
    });
  }

  static getWidthForQuality(quality) {
    const widths = {
      '360p': 640,
      '480p': 854,
      '720p': 1280,
      '1080p': 1920
    };
    
    return widths[quality] || 640;
  }
}

// 📊 Performance Monitoring & Auto-adjustment
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      bufferLength: 0,
      bandwidth: 0,
      droppedFrames: 0,
      currentQuality: '',
      switchHistory: []
    };
    
    this.thresholds = {
      lowBuffer: 2, // seconds
      optimalBuffer: 10,
      highBandwidth: 5000000, // 5 Mbps
      frameDropThreshold: 5 // percent
    };
  }

  // Update metrics from player
  update(metrics) {
    this.metrics = { ...this.metrics, ...metrics };
    
    // Store quality switch history
    if (metrics.currentQuality && 
        metrics.currentQuality !== this.metrics.currentQuality) {
      this.metrics.switchHistory.push({
        from: this.metrics.currentQuality,
        to: metrics.currentQuality,
        timestamp: Date.now(),
        reason: this.detectSwitchReason()
      });
      
      // Keep only last 10 switches
      if (this.metrics.switchHistory.length > 10) {
        this.metrics.switchHistory.shift();
      }
    }
    
    this.metrics.currentQuality = metrics.currentQuality || this.metrics.currentQuality;
  }

  detectSwitchReason() {
    if (this.metrics.bufferLength < this.thresholds.lowBuffer) {
      return 'buffer_low';
    }
    
    if (this.metrics.droppedFrames > this.thresholds.frameDropThreshold) {
      return 'frame_drops';
    }
    
    if (this.metrics.bandwidth > this.thresholds.highBandwidth * 1.5) {
      return 'bandwidth_high';
    }
    
    if (this.metrics.bandwidth < this.thresholds.highBandwidth * 0.5) {
      return 'bandwidth_low';
    }
    
    return 'auto_adjust';
  }

  // Suggest quality based on current metrics
  suggestQuality(availableQualities) {
    const qualities = ['360p', '480p', '720p', '1080p'];
    
    // Filter available qualities
    const filteredQualities = qualities.filter(q => 
      availableQualities.includes(q)
    );
    
    // If buffer is critically low, go to lowest quality
    if (this.metrics.bufferLength < this.thresholds.lowBuffer) {
      return filteredQualities[filteredQualities.length - 1] || '360p';
    }
    
    // If bandwidth is low, reduce quality
    if (this.metrics.bandwidth < 1000000) { // < 1 Mbps
      return '360p';
    } else if (this.metrics.bandwidth < 2500000) { // < 2.5 Mbps
      return '480p';
    } else if (this.metrics.bandwidth < 5000000) { // < 5 Mbps
      return '720p';
    }
    
    // Default to highest available quality
    return filteredQualities[0] || '720p';
  }

  // Get performance report
  getReport() {
    const bufferHealth = this.metrics.bufferLength >= this.thresholds.optimalBuffer ? 
      'good' : this.metrics.bufferLength >= this.thresholds.lowBuffer ? 
      'fair' : 'poor';
    
    const bandwidthHealth = this.metrics.bandwidth >= this.thresholds.highBandwidth ? 
      'good' : this.metrics.bandwidth >= 1000000 ? 
      'fair' : 'poor';
    
    const stability = this.metrics.switchHistory.length < 3 ? 
      'stable' : 'unstable';
    
    return {
      buffer: {
        length: this.metrics.bufferLength,
        health: bufferHealth,
        recommendation: bufferHealth === 'poor' ? 'increase_buffer' : 'ok'
      },
      
      bandwidth: {
        value: this.metrics.bandwidth,
        health: bandwidthHealth,
        recommendation: bandwidthHealth === 'poor' ? 'reduce_quality' : 'ok'
      },
      
      quality: {
        current: this.metrics.currentQuality,
        stability,
        switches: this.metrics.switchHistory.length
      },
      
      overall: bufferHealth === 'good' && bandwidthHealth === 'good' ? 
        'excellent' : 'acceptable'
    };
  }
}

// 🚀 Mobile Video Player Component
export const MobileVideoPlayer = {
  // Mobile-specific player configuration
  getMobileConfig: (deviceInfo) => ({
    controls: true,
    autoplay: false,
    preload: 'metadata',
    fluid: true,
    responsive: true,
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5],
    
    // Mobile-specific options
    mobileView: deviceInfo.isMobile,
    touchControls: deviceInfo.touchSupport,
    inline: deviceInfo.isMobile, // Inline playback for iOS
    playsinline: deviceInfo.isMobile, // Prevent fullscreen on iOS
    muted: false,
    
    // HLS configuration for mobile
    html5: {
      vhs: {
        overrideNative: !deviceInfo.isMobile, // Use native HLS on mobile if available
        enableLowInitialPlaylist: true,
        bandwidth: deviceInfo.isMobile ? 1000000 : 2500000,
        limitRenditionByPlayerDimensions: true
      },
      nativeAudioTracks: deviceInfo.isMobile,
      nativeVideoTracks: deviceInfo.isMobile
    },
    
    // User interface
    controlBar: {
      playToggle: true,
      volumePanel: {
        inline: false,
        vertical: true
      },
      currentTimeDisplay: true,
      timeDivider: true,
      durationDisplay: true,
      progressControl: true,
      remainingTimeDisplay: false,
      customControlSpacer: true,
      fullscreenToggle: true,
      playbackRateMenuButton: deviceInfo.isDesktop,
      qualitySelector: deviceInfo.isDesktop
    }
  }),

  // Add mobile-specific event handlers
  addMobileHandlers: (player, deviceInfo) => {
    if (deviceInfo.isMobile) {
      // Handle orientation changes
      const handleOrientationChange = () => {
        if (window.orientation === 0 || window.orientation === 180) {
          // Portrait
          player.fluid(false);
        } else {
          // Landscape
          player.fluid(true);
        }
      };
      
      window.addEventListener('orientationchange', handleOrientationChange);
      
      // Handle visibility changes (app background/foreground)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          player.pause();
        }
      });
      
      // Cleanup
      player.on('dispose', () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
      });
    }
    
    // Add touch gestures for mobile
    if (deviceInfo.touchSupport) {
      let touchStartX = 0;
      let touchStartY = 0;
      
      player.on('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      });
      
      player.on('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Horizontal swipe for seeking
        if (Math.abs(diffX) > 50 && Math.abs(diffY) < 30) {
          const seekAmount = diffX > 0 ? 10 : -10;
          player.currentTime(player.currentTime() + seekAmount);
        }
        
        // Vertical swipe for volume/brightness
        if (Math.abs(diffY) > 50 && Math.abs(diffX) < 30) {
          if (touchStartX < player.width() / 2) {
            // Left side: brightness control (not implemented)
          } else {
            // Right side: volume control
            const volumeChange = diffY > 0 ? -0.1 : 0.1;
            player.volume(Math.max(0, Math.min(1, player.volume() + volumeChange)));
          }
        }
      });
    }
  }
};`;

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
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {copySuccess}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-90 border-b border-slate-700/20 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all z-[60] text-current"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ روشن موڈ"}
        </button>
      </header>

      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* Chapter Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          باب 24: Video Upload & Streaming System 🎥
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          Complete Production-Ready Video System with Security, Analytics & Mobile Optimization
        </p>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-400">
            🚀 Complete Video System
          </h2>
          <p className="text-lg mb-6">
            اب ہم <strong>مکمل Video System</strong> بنائیں گے جو Production میں
            استعمال کے لیے تیار ہوگا۔
          </p>

          {/* Tab Navigation */}
          <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("player")}
                className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
                  activeTab === "player"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">🎬</span>
                Video Player
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
                  activeTab === "security"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">🔐</span>
                Security & Encryption
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">📊</span>
                Analytics & Tracking
              </button>
              <button
                onClick={() => setActiveTab("mobile")}
                className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
                  activeTab === "mobile"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-lg">📱</span>
                Mobile Optimization
              </button>
            </div>
          </div>
        </section>

        {/* Video Player Tab Content */}
        {activeTab === "player" && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
                24.5: Advanced Video Player with HLS Support
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">
                  🎬 Premium Player Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      ✅ شامل ہیں:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>HLS Adaptive Streaming Support</li>
                      <li>Multi-quality Switching (360p to 4K)</li>
                      <li>Custom Controls with Animations</li>
                      <li>Keyboard Shortcuts Support</li>
                      <li>Bookmark & Note Taking</li>
                      <li>Subtitle & Caption Support</li>
                      <li>Playback Speed Control</li>
                      <li>Picture-in-Picture Mode</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-purple-300">
                      ⚡ Performance:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Auto-quality based on bandwidth</li>
                      <li>Smart buffering & preloading</li>
                      <li>Touch gestures for mobile</li>
                      <li>Offline playback support</li>
                      <li>Background audio playback</li>
                      <li>Low latency streaming</li>
                      <li>CDN optimization</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700">
                    🎯 Keyboard Shortcuts:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-emerald-500 dark:text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Space</kbd>
                      <span>Play/Pause</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">← →</kbd>
                      <span>Skip 10s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">F</kbd>
                      <span>Fullscreen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">M</kbd>
                      <span>Mute</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">B</kbd>
                      <span>Bookmark</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Shift + &gt;</kbd> 
                      <span>Speed Up</span>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={videoPlayerCode}
                colorClass="text-emerald-300"
                title="components/video/VideoPlayer.jsx - Complete Advanced Player"
              />
            </section>
          </>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
                24.6: Video Security & Encryption System
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  🔐 Enterprise-Grade Security
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🔒</div>
                    <h4 className="font-bold mb-2">URL Encryption</h4>
                    <p className="text-sm">AES-256 encrypted video URLs</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-bold mb-2">DRM Protection</h4>
                    <p className="text-sm">Widevine, PlayReady, FairPlay</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-bold mb-2">Token-Based Access</h4>
                    <p className="text-sm">JWT tokens with expiry</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-700">
                    ✅ Security Layers:
                  </h4>
                  <ul className="list-disc pr-6 space-y-1 text-sm">
                    <li>Video URL Encryption (AES-256)</li>
                    <li>Signed URLs with expiry timestamps</li>
                    <li>IP Address Restriction</li>
                    <li>Device Fingerprinting</li>
                    <li>Maximum Views Limitation</li>
                    <li>Watermarking for Copyright Protection</li>
                    <li>Geo-blocking & Region Restrictions</li>
                    <li>Rate Limiting & Anti-leech Protection</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                code={videoSecurityCode}
                colorClass="text-blue-100"
                title="lib/video-security.js - Complete Security System"
              />
            </section>
          </>
        )}

        {/* Analytics Tab Content */}
        {activeTab === "analytics" && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
                24.7: Video Analytics & Tracking System
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  📊 Comprehensive Analytics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-green-300">
                      📈 Tracked Metrics:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Watch Time & Completion Rate</li>
                      <li>Engagement Heatmaps</li>
                      <li>Quality Switch Patterns</li>
                      <li>Buffering Events & Duration</li>
                      <li>Device & Browser Analytics</li>
                      <li>Geographic Viewership</li>
                      <li>Network Performance</li>
                      <li>User Behavior Patterns</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      🎯 Use Cases:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Content Performance Analysis</li>
                      <li>User Engagement Optimization</li>
                      <li>Network Quality Monitoring</li>
                      <li>Device Compatibility Testing</li>
                      <li>Revenue Analytics (for paid courses)</li>
                      <li>Learning Effectiveness Measurement</li>
                      <li>AB Testing for Content</li>
                      <li>Predictive Analytics</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-700">
                    📋 Analytics Dashboard Reports:
                  </h4>
                  <ul className="list-disc pr-6 space-y-1 text-sm">
                    <li>Video Performance Dashboard</li>
                    <li>User Progress Reports</li>
                    <li>Engagement Heatmaps</li>
                    <li>Device & Network Reports</li>
                    <li>Completion Rate Analytics</li>
                    <li>Quality of Experience (QoE) Metrics</li>
                    <li>Exportable CSV/PDF Reports</li>
                    <li>Real-time Analytics Dashboard</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                code={videoAnalyticsCode}
                colorClass="text-purple-300"
                title="models/VideoAnalytics.js - Complete Analytics System"
              />
            </section>
          </>
        )}

        {/* Mobile Optimization Tab Content */}
        {activeTab === "mobile" && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
                24.8: Mobile Video Optimization
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-4 text-amber-300">
                  📱 Mobile-First Video Delivery
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      ✅ Optimizations:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Adaptive Bitrate Streaming</li>
                      <li>Mobile-Optimized Thumbnails</li>
                      <li>Touch-Friendly Controls</li>
                      <li>Battery & Data Saving Modes</li>
                      <li>Offline Playback Support</li>
                      <li>Background Audio Playback</li>
                      <li>Low-bandwidth Fallbacks</li>
                      <li>Progressive Download for 2G/3G</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-green-300">
                      📊 Performance Features:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Auto-quality Adjustment</li>
                      <li>Smart Buffering Algorithms</li>
                      <li>Pre-fetching for Better UX</li>
                      <li>Cache Management</li>
                      <li>Battery-aware Streaming</li>
                      <li>Data Saver Mode</li>
                      <li>Network Type Detection</li>
                      <li>Performance Monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
                  <h4 className="font-bold mb-2 text-cyan-700">
                    📶 Network Adaptive Streaming:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>2G Network</span>
                      <span className="font-semibold">144p-240p</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>3G Network</span>
                      <span className="font-semibold">360p-480p</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>4G Network</span>
                      <span className="font-semibold">720p-1080p</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>WiFi Network</span>
                      <span className="font-semibold">1080p-4K</span>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={mobileOptimizationCode}
                colorClass="text-amber-300"
                title="lib/video-optimization.js - Mobile Optimization System"
              />
            </section>
          </>
        )}

        {/* Complete System Summary */}
        <section className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-blue-400">
            🎯 Complete Video System Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">
                ✅ مکمل سسٹم:
              </h3>
              <ul className="list-disc pr-6 space-y-3">
                <li>
                  <strong>Cloudinary Integration</strong> - Video hosting & processing
                </li>
                <li>
                  <strong>Advanced Video Player</strong> - HLS, multi-quality, custom controls
                </li>
                <li>
                  <strong>Enterprise Security</strong> - Encryption, DRM, access control
                </li>
                <li>
                  <strong>Comprehensive Analytics</strong> - Watch time, engagement, performance
                </li>
                <li>
                  <strong>Mobile Optimization</strong> - Adaptive streaming, touch controls
                </li>
                <li>
                  <strong>Database Models</strong> - Complete schema for videos & analytics
                </li>
                <li>
                  <strong>API Routes</strong> - Upload, streaming, analytics endpoints
                </li>
                <li>
                  <strong>Admin Dashboard</strong> - Video management & analytics reports
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                🚀 Deployment Ready:
              </h3>
              <ul className="list-disc pr-6 space-y-3">
                <li>
                  <strong>Production Configuration</strong> - Environment variables
                </li>
                <li>
                  <strong>Error Handling</strong> - Comprehensive error management
                </li>
                <li>
                  <strong>Performance Optimization</strong> - CDN, caching, lazy loading
                </li>
                <li>
                  <strong>Security Best Practices</strong> - HTTPS, CORS, rate limiting
                </li>
                <li>
                  <strong>Monitoring & Logging</strong> - Performance monitoring
                </li>
                <li>
                  <strong>Backup & Recovery</strong> - Data backup strategies
                </li>
                <li>
                  <strong>Scalability</strong> - Handles thousands of concurrent viewers
                </li>
                <li>
                  <strong>Cost Optimization</strong> - Bandwidth & storage optimization
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
            <h3 className="text-xl font-bold mb-3 text-center text-blue-600">
              💼 Production Ready Video System
            </h3>
            <p className="text-center mb-4">
              یہ system آپ کے LMS میں فوری طور پر شامل کرنے کے لیے تیار ہے۔
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">🎓 Educational Platforms</div>
                <div className="text-sm">Course videos & lectures</div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">🏢 Corporate Training</div>
                <div className="text-sm">Employee training & onboarding</div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">📺 Streaming Services</div>
                <div className="text-sm">Video-on-demand platforms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Deployment Guide */}
        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-slate-900/50 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-center text-blue-300">
            ⚡ Quick Deployment Checklist
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/50">
              <h4 className="font-bold mb-2 text-green-300">
                ✅ Environment Setup:
              </h4>
              <ol className="list-decimal pr-6 space-y-2 text-base text-amber-300">
                <li>Cloudinary account setup</li>
                <li>Environment variables configuration</li>
                <li>Database connection setup</li>
                <li>CDN configuration</li>
                <li>SSL certificate installation</li>
                <li>Domain configuration</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50">
              <h4 className="font-bold mb-2 text-amber-300">
                🔧 Testing Checklist:
              </h4>
              <ol className="list-decimal pr-6 space-y-2 text-base text-amber-300">
                <li>Video upload & processing test</li>
                <li>Multi-quality streaming test</li>
                <li>Mobile responsiveness test</li>
                <li>Security & access control test</li>
                <li>Analytics tracking verification</li>
                <li>Performance & load testing</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Final Note */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-center border border-blue-500/30">
          <p className="text-lg font-bold text-blue-500 mb-2">
            🎉 Congratulations! Complete Video System Ready
          </p>
          <p className="text-black/90 dark:text-white/70">
            اب آپ کے پاس ایک مکمل، production-ready video system ہے جو کسی بھی
            LMS یا streaming platform میں استعمال ہو سکتا ہے۔
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 bg-gradient-to-r from-gray-500/90 to-slate-500/90 backdrop-blur-md border-t border-slate-700/30 text-center text-sm text-gray-400 z-40">
        <div className="flex justify-center items-center gap-4">
          <span>Chapter 24: Complete Video Upload & Streaming System</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">
            Production-Ready with Security, Analytics & Mobile Optimization
          </span>
        </div>
      </footer>
    </div>
  );
}