import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TabBar } from './components/TabBar';
import { ServiceCard } from './components/ServiceCard';
import { EditServiceModal } from './components/EditServiceModal';
import { IntroPage } from './components/IntroPage';
import { cn } from './utils/cn';
import './App.css';

// Helper function to get favicon URL
const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '🌐';
  }
};

// Default AI services data with automatic favicon URLs
const defaultData = {
  categories: [
    {
      id: 2,
      name: 'AI툴비',
      services: [
        { id: 54, name: '강의노트', url: 'https://sites.google.com/view/aitoolb01/' },
        { id: 52, name: '이미지생성기', url: 'https://tbpc.aitoolb.com/' },
        { id: 56, name: '툴비프레임추출기', url: 'https://tbframe.aitoolb.com/' },
      ]
    },
    {
      id: 1,
      name: '검색',
      services: [
        { id: 55, name: '유튜브', url: 'https://www.youtube.com/?app=desktop&hl=ko&gl=KR' },
        { id: 1, name: '네이버', url: 'https://www.naver.com' },
        { id: 2, name: '구글', url: 'https://www.google.com' },
        { id: 3, name: '다음', url: 'https://www.daum.net' },
        { id: 4, name: '네이트', url: 'https://www.nate.com' },
      ]
    },
    {
      id: 3,
      name: 'AI 에이전트',
      services: [
        { id: 5, name: 'ChatGPT', url: 'https://chat.openai.com' },
        { id: 6, name: 'Perplexity', url: 'https://www.perplexity.ai' },
        { id: 7, name: 'Gemini', url: 'https://gemini.google.com' },
        { id: 8, name: 'Genspark', url: 'https://genspark.ai' },
        { id: 9, name: 'Flowith', url: 'https://flowith.io' },
        { id: 10, name: 'Claude', url: 'https://claude.ai' },
        { id: 11, name: 'Manus', url: 'https://manus.ai' },
      ]
    },
    {
      id: 4,
      name: '이미지',
      services: [
        { id: 12, name: 'Midjourney', url: 'https://midjourney.com' },
        { id: 13, name: 'Nano Banana', url: 'https://aistudio.google.com/prompts/new_chat' },
        { id: 14, name: 'Flux', url: 'https://flux.ai' },
        { id: 15, name: 'Sora', url: 'https://openai.com/sora' },
        { id: 16, name: 'Whisk', url: 'https://whisk.com' },
        { id: 17, name: 'Dreamina', url: 'https://dreamina.ai' },
        { id: 18, name: 'Qwen', url: 'https://qwen.ai' },
      ]
    },
    {
      id: 5,
      name: '비디오',
      services: [
        { id: 19, name: 'VEO 3', url: 'https://veo3.ai' },
        { id: 20, name: 'Midjourney', url: 'https://midjourney.com' },
        { id: 21, name: 'Hailuo', url: 'https://hailuo.ai' },
        { id: 22, name: 'Higgsfield', url: 'https://higgsfield.ai' },
        { id: 23, name: 'Kling', url: 'https://klingai.com' },
        { id: 24, name: 'Runway', url: 'https://runway.com' },
        { id: 25, name: 'Pika Labs', url: 'https://pika.art' },
        { id: 26, name: 'Luma AI', url: 'https://lumalabs.ai' },
        { id: 27, name: 'Topaz', url: 'https://topazlabs.com' },
        { id: 28, name: 'Freepik', url: 'https://freepik.com' },
      ]
    },
    {
      id: 6,
      name: '음성/립싱크',
      services: [
        { id: 29, name: 'Elevenlabs', url: 'https://elevenlabs.io' },
        { id: 30, name: 'Perso', url: 'https://perso.ai' },
        { id: 31, name: 'Supertone', url: 'https://supertone.ai' },
        { id: 32, name: 'Typecast', url: 'https://typecast.ai' },
        { id: 33, name: 'Heygen', url: 'https://heygen.com' },
        { id: 34, name: 'Hedra', url: 'https://hedra.ai' },
      ]
    },
    {
      id: 7,
      name: '바이브코딩',
      services: [
        { id: 35, name: 'Github', url: 'https://github.com' },
        { id: 36, name: 'Google AI Studio', url: 'https://aistudio.google.com' },
        { id: 37, name: 'Claude', url: 'https://claude.ai' },
        { id: 38, name: 'Cursor', url: 'https://cursor.sh' },
        { id: 39, name: 'Lovable', url: 'https://lovable.dev' },
        { id: 40, name: 'Replit AI', url: 'https://replit.com' },
        { id: 41, name: 'Base44', url: 'https://base44.com' },
        { id: 42, name: 'Bolt', url: 'https://bolt.new' },
        { id: 51, name: 'Netlify', url: 'https://www.netlify.com' },
      ]
    },
    {
      id: 8,
      name: '음악',
      services: [
        { id: 43, name: 'Suno AI', url: 'https://suno.ai' },
        { id: 44, name: 'Udio', url: 'https://udio.com' },
        { id: 45, name: 'AIVA', url: 'https://aiva.ai' },
      ]
    },
    {
      id: 9,
      name: '편집/자막',
      services: [
        { id: 46, name: 'opus', url: 'https://opus.pro' },
        { id: 47, name: 'Cutback', url: 'https://cutback.video/ko/' },
        { id: 48, name: 'Capcut', url: 'https://capcut.com' },
      ]
    },
    {
      id: 10,
      name: '비즈니스',
      services: [
        { id: 49, name: 'Gamma', url: 'https://gamma.app' },
        { id: 50, name: 'Notebook LM', url: 'https://notebooklm.google.com' },
      ]
    }
  ]
};

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // 세션 중에는 인트로를 다시 보여주지 않음
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });
  const [theme, setTheme] = useState('dark');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(() => {
    // Load active tab from sessionStorage
    const savedTab = sessionStorage.getItem('activeTab');
    return savedTab ? parseInt(savedTab, 10) : 0;
  });
  const [editMode, setEditMode] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedService, setDraggedService] = useState(null);
  const [draggedOverService, setDraggedOverService] = useState(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    // Load data from localStorage or use default
    const savedData = localStorage.getItem('aiToolsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);

      // AI툴비 카테고리가 없으면 첫 번째로 추가
      let updatedCategories = parsed.categories;
      const hasAIToolbCategory = updatedCategories.some(cat => cat.name === 'AI툴비');

      if (!hasAIToolbCategory) {
        // AI툴비 카테고리를 첫 번째로 추가
        const aiToolbCategory = defaultData.categories.find(cat => cat.name === 'AI툴비');
        if (aiToolbCategory) {
          updatedCategories = [aiToolbCategory, ...updatedCategories];
        }
      }

      // 저장된 데이터에서 아이콘 정보만 제거하고 나머지는 유지
      const categoriesWithoutIcons = updatedCategories.map(category => ({
        ...category,
        services: category.services.map(service => {
          // icon 속성만 제거하여 ServiceCard에서 자동으로 파비콘을 가져오도록 함
          const { icon, ...serviceWithoutIcon } = service;
          return serviceWithoutIcon;
        })
      }));

      setCategories(categoriesWithoutIcons);

      // AI툴비 카테고리가 추가되었으면 localStorage 업데이트
      if (!hasAIToolbCategory) {
        localStorage.setItem('aiToolsData', JSON.stringify({ categories: categoriesWithoutIcons }));
      }
    } else {
      // 처음 방문한 사용자에게만 기본 데이터 제공
      setCategories(defaultData.categories);
      localStorage.setItem('aiToolsData', JSON.stringify(defaultData));
    }

    // Restore scroll position
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 100);
    }
  }, []);

  // Save scroll position before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Save active tab whenever it changes
  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab.toString());
  }, [activeTab]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Theme toggling:', theme, '->', newTheme);
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleServiceClick = (service) => {
    if (!editMode) {
      window.open(service.url, '_blank');
    }
  };

  const addService = (categoryId) => {
    setEditingCategoryId(categoryId);
    setIsAddingService(true);
    setEditingService({ id: Date.now(), name: '', url: '', icon: '' });
  };

  const handleAddService = (newService) => {
    if (editingCategoryId) {
      const newCategories = categories.map(cat => {
        if (cat.id === editingCategoryId) {
          return {
            ...cat,
            services: [...cat.services, newService]
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      setIsAddingService(false);
      setEditingService(null);
      setEditingCategoryId(null);
    }
  };

  const deleteService = (categoryId, serviceId) => {
    if (confirm('이 서비스를 삭제하시겠습니까?')) {
      const newCategories = categories.map(cat => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            services: cat.services.filter(s => s.id !== serviceId)
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const editService = (categoryId, serviceId) => {
    const category = categories.find(c => c.id === categoryId);
    const service = category.services.find(s => s.id === serviceId);
    setEditingService(service);
    setEditingCategoryId(categoryId);
  };

  const handleSaveService = (updatedService) => {
    if (editingCategoryId) {
      const newCategories = categories.map(cat => {
        if (cat.id === editingCategoryId) {
          return {
            ...cat,
            services: cat.services.map(s => {
              if (s.id === updatedService.id) {
                return updatedService;
              }
              return s;
            })
          };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      setEditingService(null);
      setEditingCategoryId(null);
    }
  };

  const addCategory = () => {
    const name = prompt('카테고리 이름을 입력하세요:');
    if (name) {
      const newCategory = {
        id: Date.now(),
        name,
        services: []
      };
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const deleteCategory = (categoryId) => {
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
      const newCategories = categories.filter(c => c.id !== categoryId);
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
      if (activeTab >= newCategories.length) {
        setActiveTab(Math.max(0, newCategories.length - 1));
      }
    }
  };

  const editCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const newName = prompt('카테고리 이름을 수정하세요:', category.name);

    if (newName) {
      const newCategories = categories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, name: newName };
        }
        return cat;
      });
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const reorderCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
  };

  // Backup function - download current data as JSON
  const handleBackup = () => {
    const dataToBackup = {
      categories: categories,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(dataToBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baroga-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Restore function - upload JSON and restore data
  const handleRestore = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Validate the data structure
        if (data.categories && Array.isArray(data.categories)) {
          // Remove icon properties from restored data
          const categoriesWithoutIcons = data.categories.map(category => ({
            ...category,
            services: category.services.map(service => {
              const { icon, ...serviceWithoutIcon } = service;
              return serviceWithoutIcon;
            })
          }));

          if (confirm('이 작업은 현재 모든 데이터를 백업 파일의 데이터로 교체합니다. 계속하시겠습니까?')) {
            setCategories(categoriesWithoutIcons);
            localStorage.setItem('aiToolsData', JSON.stringify({ categories: categoriesWithoutIcons }));
            setActiveTab(0); // Reset to first tab
            alert('백업이 성공적으로 복원되었습니다!');
          }
        } else {
          alert('올바른 백업 파일 형식이 아닙니다.');
        }
      } catch (error) {
        console.error('Error restoring backup:', error);
        alert('백업 파일을 읽는 중 오류가 발생했습니다. 올바른 JSON 파일인지 확인해주세요.');
      }
    };
    reader.readAsText(file);
  };

  // Handle drag start
  const handleDragStart = (e, service, categoryId) => {
    setDraggedService({ service, categoryId });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drag enter
  const handleDragEnter = (e, service, categoryId) => {
    e.preventDefault();
    setDraggedOverService({ service, categoryId });
  };

  // Handle drop
  const handleDrop = (e, targetService, targetCategoryId) => {
    e.preventDefault();

    if (!draggedService || !targetService) return;

    const sourceCategoryId = draggedService.categoryId;
    const sourceService = draggedService.service;

    // If dropping on the same service, do nothing
    if (sourceService.id === targetService.id && sourceCategoryId === targetCategoryId) {
      setDraggedService(null);
      setDraggedOverService(null);
      return;
    }

    const newCategories = [...categories];

    // Find source and target categories
    const sourceCategory = newCategories.find(cat => cat.id === sourceCategoryId);
    const targetCategory = newCategories.find(cat => cat.id === targetCategoryId);

    if (!sourceCategory || !targetCategory) return;

    // Remove service from source category
    const sourceIndex = sourceCategory.services.findIndex(s => s.id === sourceService.id);
    if (sourceIndex === -1) return;

    sourceCategory.services.splice(sourceIndex, 1);

    // Add service to target category at the correct position
    const targetIndex = targetCategory.services.findIndex(s => s.id === targetService.id);

    if (sourceCategoryId === targetCategoryId) {
      // Reordering within the same category
      const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      targetCategory.services.splice(adjustedTargetIndex + 1, 0, sourceService);
    } else {
      // Moving to a different category
      targetCategory.services.splice(targetIndex + 1, 0, sourceService);
    }

    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));

    setDraggedService(null);
    setDraggedOverService(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedService(null);
    setDraggedOverService(null);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    // If searching, switch to 'All' view by creating a virtual category
    if (term) {
      setActiveTab(-1); // Special index for search results
    } else {
      setActiveTab(0); // Reset to first category
    }
  };

  // Filter services based on search term
  const getFilteredServices = () => {
    if (!searchTerm) {
      return currentCategory ? currentCategory.services : [];
    }

    // Search across all categories
    const allServices = [];
    categories.forEach(category => {
      const filteredServices = category.services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      allServices.push(...filteredServices.map(service => ({
        ...service,
        categoryName: category.name
      })));
    });
    return allServices;
  };

  const totalServices = categories.reduce((sum, cat) => sum + cat.services.length, 0);
  const currentCategory = activeTab >= 0 ? categories[activeTab] : null;
  const displayServices = searchTerm ? getFilteredServices() : (currentCategory ? currentCategory.services : []);

  // 인트로 페이지에서 메인으로 전환
  const handleEnterFromIntro = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <>
      {/* Intro Page */}
      {showIntro && <IntroPage onEnter={handleEnterFromIntro} />}

      <div className={cn("min-h-screen", showIntro && "overflow-hidden")}>
        {/* Navbar */}
        <Navbar
          logo="BAROGA"
          theme={theme}
          onThemeToggle={toggleTheme}
          editMode={editMode}
          onEditToggle={() => setEditMode(!editMode)}
          onLogoClick={() => {
            setActiveTab(0);
            setSearchTerm('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackup={handleBackup}
          onRestore={handleRestore}
        />

        {/* Hero Section */}
        <Hero
          totalServices={totalServices}
          totalCategories={categories.length}
          onSearch={handleSearch}
        />

        {/* Category Tabs */}
        {!searchTerm && (
          <TabBar
            categories={categories}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            editMode={editMode}
            onAddCategory={addCategory}
            onEditCategory={editCategory}
            onDeleteCategory={deleteCategory}
            onReorderCategories={reorderCategories}
          />
        )}

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(currentCategory || searchTerm) && (
            <div className="space-y-8">
              {/* Search Results Info */}
              {searchTerm && (
                <div className="mb-4">
                  <div className="inline-block px-4 py-2 bg-neo-blue border-3 border-neo-yellow shadow-neo-sm">
                    <p className="text-sm font-bold text-black">
                      '{searchTerm}' 검색 결과: <span className="font-black">{displayServices.length}개</span> 서비스
                    </p>
                  </div>
                </div>
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                {displayServices.map((service) => (
                  <div
                    key={service.id}
                    draggable={editMode && !searchTerm}
                    onDragStart={(e) => handleDragStart(e, service, currentCategory?.id)}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, service, currentCategory?.id)}
                    onDrop={(e) => handleDrop(e, service, currentCategory?.id)}
                    onDragEnd={handleDragEnd}
                    className={cn(
                      editMode && !searchTerm && "cursor-move",
                      draggedOverService?.service.id === service.id && "opacity-50"
                    )}
                  >
                    <ServiceCard
                      service={service}
                      onClick={() => handleServiceClick(service)}
                      editMode={editMode && !searchTerm}
                      onEdit={() => editService(currentCategory?.id, service.id)}
                      onDelete={() => deleteService(currentCategory?.id, service.id)}
                      showCategory={searchTerm && service.categoryName}
                    />
                  </div>
                ))}

                {/* Add Service Card - only show when not searching */}
                {!searchTerm && currentCategory && (
                  <div
                    onClick={() => addService(currentCategory.id)}
                    className={cn(
                      "group relative overflow-hidden cursor-pointer",
                      "bg-neo-card border-3 border-dashed border-neo-yellow",
                      "hover:border-solid hover:bg-neo-green hover:shadow-neo-sm",
                      "hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    )}
                  >
                    <div className="p-6 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
                      <div className="w-10 h-10 bg-neo-surface border-2 border-neo-yellow flex items-center justify-center group-hover:bg-neo-card">
                        <Plus size={20} className="text-neo-yellow group-hover:text-black" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-black">
                        서비스 추가
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Utility Tools Section */}
              <div className="mt-12 py-8 border-t-3 border-neo-yellow/30">
                <div className="text-center space-y-6">
                  <h3 className="inline-block text-lg font-black text-black px-4 py-2 bg-neo-purple border-3 border-neo-yellow shadow-neo-sm">
                    유용한 유틸
                  </h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {/* Snipaste Button */}
                    <a
                      href="https://www.snipaste.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3",
                        "bg-neo-blue border-3 border-neo-yellow shadow-neo-sm font-bold text-black",
                        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Snipaste</span>
                      <span className="text-xs px-2 py-0.5 bg-neo-card border-2 border-neo-yellow text-white">캡쳐</span>
                    </a>

                    {/* Everything Button */}
                    <a
                      href="https://www.voidtools.com/ko-kr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3",
                        "bg-neo-green border-3 border-neo-yellow shadow-neo-sm font-bold text-black",
                        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Everything</span>
                      <span className="text-xs px-2 py-0.5 bg-neo-card border-2 border-neo-yellow text-white">검색</span>
                    </a>

                    {/* PhotoScape X Button */}
                    <a
                      href="http://x.photoscape.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3",
                        "bg-neo-pink border-3 border-neo-yellow shadow-neo-sm font-bold text-black",
                        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>PhotoScape X</span>
                      <span className="text-xs px-2 py-0.5 bg-neo-card border-2 border-neo-yellow text-white">편집</span>
                    </a>

                    {/* CapCut Download Button */}
                    <a
                      href="https://aitoolb.com/61"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3",
                        "bg-neo-orange border-3 border-neo-yellow shadow-neo-sm font-bold text-black",
                        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      )}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>무료캡컷다운로드</span>
                      <span className="text-xs px-2 py-0.5 bg-neo-card border-2 border-neo-yellow text-white">영상</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* YouTube Section */}
              <div className="mt-8 py-8 border-t-3 border-neo-yellow/30">
                <div className="text-center space-y-6">
                  <h3 className="inline-block text-lg font-black text-black px-4 py-2 bg-neo-red border-3 border-neo-yellow shadow-neo-sm">
                    YouTube
                  </h3>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <a
                      href="https://www.youtube.com/results?search_query=ai%ED%88%B4%EB%B9%84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3",
                        "bg-neo-red border-3 border-neo-yellow shadow-neo-sm font-bold text-black",
                        "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo",
                        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      )}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>AI툴비 유튜브</span>
                      <span className="text-xs px-2 py-0.5 bg-neo-card border-2 border-neo-yellow text-white">채널</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="mt-8 py-8 border-t-3 border-neo-yellow/30">
                <div className="text-center space-y-3">
                  <div className="inline-block px-6 py-3 bg-neo-yellow border-3 border-neo-yellow shadow-neo-sm">
                    <p className="text-sm font-bold text-black">
                      총 <span className="font-black">{totalServices}개</span>의 AI 서비스 •
                      <span className="font-black"> {categories.length}개</span> 카테고리
                    </p>
                  </div>
                  <p className="text-xs font-medium text-gray-400">
                    지속적으로 업데이트되고 있습니다
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Edit Service Modal */}
        <EditServiceModal
          service={editingService}
          isOpen={!!editingService}
          onClose={() => {
            setEditingService(null);
            setEditingCategoryId(null);
            setIsAddingService(false);
          }}
          onSave={isAddingService ? handleAddService : handleSaveService}
        />
      </div>
    </>
  );
}

export default App;