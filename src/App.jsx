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

// Default AI services data
const defaultData = {
  categories: [
    {
      id: 2,
      name: 'AI툴비',
      services: [
        {
          id: 54,
          name: '강의노트',
          url: 'https://sites.google.com/view/aitoolb01/'
        },
        {
          id: 52,
          name: '이미지생성기',
          url: 'https://tbpc.aitoolb.com/'
        },
        {
          id: 56,
          name: '툴비프레임추출기',
          url: 'https://tbfm.aitoolb.com/'
        },
        {
          id: 57,
          name: '음악생성젬',
          url: 'https://gemini.google.com/gem/1s8f2dOr9ZGwCBrOWwbeW-8kZ3_qK-AqP?usp=sharing'
        },
        {
          id: 1767691660237,
          name: 'TB챗팅',
          url: 'https://chat.aitoolb.com/'
        }
      ]
    },
    {
      id: 1,
      name: '검색',
      services: [
        {
          id: 55,
          name: '유튜브',
          url: 'https://www.youtube.com/?app=desktop&hl=ko&gl=KR'
        },
        {
          id: 1,
          name: '네이버',
          url: 'https://www.naver.com'
        },
        {
          id: 1767678342753,
          name: '스레드',
          url: 'https://www.threads.com/'
        },
        {
          id: 1767678382870,
          name: '인스타',
          url: 'https://www.instagram.com/'
        },
        {
          id: 2,
          name: '구글',
          url: 'https://www.google.com'
        },
        {
          id: 1767678626502,
          name: '구글AI스튜디오',
          url: 'https://aistudio.google.com/'
        },
        {
          id: 1767681469172,
          name: '티스토리',
          url: 'https://www.tistory.com/'
        },
        {
          id: 3,
          name: '다음',
          url: 'https://www.daum.net'
        },
        {
          id: 4,
          name: '네이트',
          url: 'https://www.nate.com'
        },
        {
          id: 1767680606766,
          name: '구글클라우드',
          url: 'https://console.cloud.google.com/'
        },
        {
          id: 1767693761163,
          name: '구글번역',
          url: 'https://translate.google.co.kr/'
        },
        {
          id: 1767761193145,
          name: '오픈챗팅방 바로가기',
          url: 'https://open.kakao.com/o/gWR9vhXh'
        }
      ]
    },
    {
      id: 10,
      name: '비즈니스',
      services: [
        {
          id: 50,
          name: 'Notebook LM',
          url: 'https://notebooklm.google.com'
        },
        {
          id: 49,
          name: 'Gamma',
          url: 'https://gamma.app'
        }
      ]
    },
    {
      id: 3,
      name: 'AI 에이전트',
      services: [
        {
          id: 5,
          name: 'ChatGPT',
          url: 'https://chat.openai.com'
        },
        {
          id: 6,
          name: 'Perplexity',
          url: 'https://www.perplexity.ai'
        },
        {
          id: 7,
          name: 'Gemini',
          url: 'https://gemini.google.com'
        },
        {
          id: 8,
          name: 'Genspark',
          url: 'https://genspark.ai'
        },
        {
          id: 9,
          name: 'Flowith',
          url: 'https://flowith.io'
        },
        {
          id: 10,
          name: 'Claude',
          url: 'https://claude.ai'
        },
        {
          id: 11,
          name: 'Manus',
          url: 'https://manus.ai'
        }
      ]
    },
    {
      id: 4,
      name: '이미지',
      services: [
        {
          id: 12,
          name: 'Midjourney',
          url: 'https://midjourney.com'
        },
        {
          id: 13,
          name: 'IMAGEFX',
          url: 'https://labs.google/fx/ko/tools/image-fx'
        },
        {
          id: 14,
          name: 'Whisk',
          url: 'https://whisk.com'
        }
      ]
    },
    {
      id: 5,
      name: '비디오',
      services: [
        {
          id: 23,
          name: 'Kling',
          url: 'https://klingai.com'
        },
        {
          id: 1767777241794,
          name: '그록',
          url: 'https://grok.com/'
        },
        {
          id: 1767777269565,
          name: '소라2',
          url: 'https://sora.chatgpt.com/'
        },
        {
          id: 19,
          name: 'VEO 3',
          url: 'https://veo3.ai'
        },
        {
          id: 1767777299719,
          name: 'FLOW',
          url: 'https://labs.google/flow'
        },
        {
          id: 20,
          name: 'Midjourney',
          url: 'https://midjourney.com'
        },
        {
          id: 21,
          name: 'Hailuo',
          url: 'https://hailuo.ai'
        },
        {
          id: 22,
          name: 'Higgsfield',
          url: 'https://higgsfield.ai'
        },
        {
          id: 24,
          name: 'Runway',
          url: 'https://runway.com'
        },
        {
          id: 25,
          name: 'Pika Labs',
          url: 'https://pika.art'
        },
        {
          id: 26,
          name: 'Luma AI',
          url: 'https://lumalabs.ai'
        },
        {
          id: 27,
          name: 'Topaz',
          url: 'https://topazlabs.com'
        },
        {
          id: 28,
          name: 'Freepik',
          url: 'https://freepik.com'
        }
      ]
    },
    {
      id: 6,
      name: '음성/립싱크',
      services: [
        {
          id: 29,
          name: 'Elevenlabs',
          url: 'https://elevenlabs.io'
        },
        {
          id: 30,
          name: 'Perso',
          url: 'https://perso.ai'
        },
        {
          id: 31,
          name: 'Supertone',
          url: 'https://supertone.ai'
        },
        {
          id: 32,
          name: 'Typecast',
          url: 'https://typecast.ai'
        },
        {
          id: 33,
          name: 'Heygen',
          url: 'https://heygen.com'
        },
        {
          id: 34,
          name: 'Hedra',
          url: 'https://hedra.ai'
        }
      ]
    },
    {
      id: 7,
      name: '바이브코딩',
      services: [
        {
          id: 35,
          name: 'Github',
          url: 'https://github.com'
        },
        {
          id: 36,
          name: 'Google AI Studio',
          url: 'https://aistudio.google.com'
        },
        {
          id: 37,
          name: 'Claude',
          url: 'https://claude.ai'
        },
        {
          id: 38,
          name: 'Cursor',
          url: 'https://cursor.sh'
        },
        {
          id: 39,
          name: 'Lovable',
          url: 'https://lovable.dev'
        },
        {
          id: 40,
          name: 'Replit AI',
          url: 'https://replit.com'
        },
        {
          id: 41,
          name: 'Base44',
          url: 'https://base44.com'
        },
        {
          id: 42,
          name: 'Bolt',
          url: 'https://bolt.new'
        },
        {
          id: 51,
          name: 'Netlify',
          url: 'https://www.netlify.com'
        }
      ]
    },
    {
      id: 8,
      name: '음악',
      services: [
        {
          id: 43,
          name: 'Suno AI',
          url: 'https://suno.ai'
        },
        {
          id: 44,
          name: 'Udio',
          url: 'https://udio.com'
        },
        {
          id: 45,
          name: 'AIVA',
          url: 'https://aiva.ai'
        }
      ]
    },
    {
      id: 9,
      name: '편집/자막',
      services: [
        {
          id: 46,
          name: 'opus',
          url: 'https://opus.pro'
        },
        {
          id: 47,
          name: 'Cutback',
          url: 'https://cutback.video/ko/'
        },
        {
          id: 48,
          name: 'Capcut',
          url: 'https://capcut.com'
        }
      ]
    }
  ]
};

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(() => {
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
    const savedData = localStorage.getItem('aiToolsData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      let updatedCategories = parsed.categories;

      // URL 마이그레이션: tbframe.aitoolb.com -> tbfm.aitoolb.com
      let needsMigration = false;
      updatedCategories = updatedCategories.map(category => ({
        ...category,
        services: category.services.map(service => {
          if (service.url && service.url.includes('tbframe.aitoolb.com')) {
            needsMigration = true;
            return { ...service, url: service.url.replace('tbframe.aitoolb.com', 'tbfm.aitoolb.com') };
          }
          return service;
        })
      }));

      // 새 서비스 마이그레이션: AI툴비 카테고리에 음악생성젬 추가
      updatedCategories = updatedCategories.map(category => {
        if (category.name === 'AI툴비') {
          const hasMusicGem = category.services.some(s => s.id === 57 || s.name === '음악생성젬');
          if (!hasMusicGem) {
            needsMigration = true;
            return {
              ...category,
              services: [...category.services, { id: 57, name: '음악생성젬', url: 'https://gemini.google.com/gem/1s8f2dOr9ZGwCBrOWwbeW-8kZ3_qK-AqP?usp=sharing' }]
            };
          }
        }
        return category;
      });

      const hasAIToolbCategory = updatedCategories.some(cat => cat.name === 'AI툴비');

      if (!hasAIToolbCategory) {
        const aiToolbCategory = defaultData.categories.find(cat => cat.name === 'AI툴비');
        if (aiToolbCategory) {
          updatedCategories = [aiToolbCategory, ...updatedCategories];
        }
      }

      const categoriesWithoutIcons = updatedCategories.map(category => ({
        ...category,
        services: category.services.map(service => {
          const { icon, ...serviceWithoutIcon } = service;
          return serviceWithoutIcon;
        })
      }));

      setCategories(categoriesWithoutIcons);

      if (!hasAIToolbCategory || needsMigration) {
        localStorage.setItem('aiToolsData', JSON.stringify({ categories: categoriesWithoutIcons }));
      }
    } else {
      setCategories(defaultData.categories);
      localStorage.setItem('aiToolsData', JSON.stringify(defaultData));
    }

    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab.toString());
  }, [activeTab]);

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
          return { ...cat, services: [...cat.services, newService] };
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
          return { ...cat, services: cat.services.filter(s => s.id !== serviceId) };
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
            services: cat.services.map(s => s.id === updatedService.id ? updatedService : s)
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
      const newCategory = { id: Date.now(), name, services: [] };
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
      const newCategories = categories.map(cat =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      );
      setCategories(newCategories);
      localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    }
  };

  const reorderCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
  };

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

  const handleRestore = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.categories && Array.isArray(data.categories)) {
          const categoriesWithoutIcons = data.categories.map(category => ({
            ...category,
            services: category.services.map(service => {
              const { icon, ...serviceWithoutIcon } = service;
              return serviceWithoutIcon;
            })
          }));

          if (confirm('현재 데이터를 백업 파일로 교체합니다. 계속하시겠습니까?')) {
            setCategories(categoriesWithoutIcons);
            localStorage.setItem('aiToolsData', JSON.stringify({ categories: categoriesWithoutIcons }));
            setActiveTab(0);
            alert('복원되었습니다!');
          }
        } else {
          alert('올바른 백업 파일이 아닙니다.');
        }
      } catch (error) {
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleDragStart = (e, service, categoryId) => {
    setDraggedService({ service, categoryId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, service, categoryId) => {
    e.preventDefault();
    setDraggedOverService({ service, categoryId });
  };

  const handleDrop = (e, targetService, targetCategoryId) => {
    e.preventDefault();
    if (!draggedService || !targetService) return;

    const sourceCategoryId = draggedService.categoryId;
    const sourceService = draggedService.service;

    if (sourceService.id === targetService.id && sourceCategoryId === targetCategoryId) {
      setDraggedService(null);
      setDraggedOverService(null);
      return;
    }

    const newCategories = [...categories];
    const sourceCategory = newCategories.find(cat => cat.id === sourceCategoryId);
    const targetCategory = newCategories.find(cat => cat.id === targetCategoryId);

    if (!sourceCategory || !targetCategory) return;

    const sourceIndex = sourceCategory.services.findIndex(s => s.id === sourceService.id);
    if (sourceIndex === -1) return;

    sourceCategory.services.splice(sourceIndex, 1);
    const targetIndex = targetCategory.services.findIndex(s => s.id === targetService.id);

    if (sourceCategoryId === targetCategoryId) {
      const insertIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      targetCategory.services.splice(insertIndex, 0, sourceService);
    } else {
      targetCategory.services.splice(targetIndex, 0, sourceService);
    }

    setCategories(newCategories);
    localStorage.setItem('aiToolsData', JSON.stringify({ categories: newCategories }));
    setDraggedService(null);
    setDraggedOverService(null);
  };

  const handleDragEnd = () => {
    setDraggedService(null);
    setDraggedOverService(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setActiveTab(-1);
    } else {
      setActiveTab(0);
    }
  };

  const getFilteredServices = () => {
    if (!searchTerm) {
      return currentCategory ? currentCategory.services : [];
    }
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

  const handleEnterFromIntro = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroPage onEnter={handleEnterFromIntro} />}

      <div className={cn("min-h-screen", showIntro && "overflow-hidden")}>
        <Navbar
          logo="BAROGA"
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

        <Hero
          totalServices={totalServices}
          totalCategories={categories.length}
          onSearch={handleSearch}
        />

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

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(currentCategory || searchTerm) && (
            <div className="space-y-8">
              {searchTerm && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-memphis-yellow border-2 border-memphis-black shadow-memphis-sm">
                    <span className="text-sm font-bold text-memphis-black uppercase">
                      '{searchTerm}' 검색 결과
                    </span>
                    <span className="px-2 py-0.5 bg-memphis-pink border-2 border-memphis-black text-memphis-black text-xs font-bold">
                      {displayServices.length}
                    </span>
                  </div>
                </div>
              )}

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

                {!searchTerm && currentCategory && (
                  <div
                    onClick={() => addService(currentCategory.id)}
                    className={cn(
                      "group relative overflow-hidden cursor-pointer",
                      "bg-memphis-cream border-2 border-dashed border-memphis-black",
                      "hover:bg-memphis-yellow hover:border-solid",
                      "transition-all duration-100"
                    )}
                  >
                    <div className="p-6 flex flex-col items-center justify-center space-y-3 h-full min-h-[140px]">
                      <div className="w-12 h-12 bg-memphis-teal border-2 border-memphis-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <Plus size={24} className="text-memphis-black" />
                      </div>
                      <span className="text-sm font-bold text-memphis-black uppercase">
                        추가하기
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Utility Tools Section */}
              <div className="mt-16 pt-8 border-t-4 border-memphis-black">
                <div className="text-center space-y-6">
                  <h3 className="inline-flex items-center gap-3 text-lg font-bold text-memphis-black uppercase">
                    <span className="w-8 h-2 bg-memphis-pink"></span>
                    유용한 유틸
                    <span className="w-8 h-2 bg-memphis-teal"></span>
                  </h3>
                  <div className="flex justify-center gap-3 flex-wrap">
                    <a
                      href="https://www.snipaste.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-memphis-black shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <span className="font-bold text-memphis-black">Snipaste</span>
                      <span className="text-xs px-2 py-0.5 bg-memphis-pink border border-memphis-black font-bold">캡쳐</span>
                    </a>
                    <a
                      href="https://www.voidtools.com/ko-kr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-memphis-black shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <span className="font-bold text-memphis-black">Everything</span>
                      <span className="text-xs px-2 py-0.5 bg-memphis-teal border border-memphis-black font-bold">검색</span>
                    </a>
                    <a
                      href="http://x.photoscape.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-memphis-black shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <span className="font-bold text-memphis-black">PhotoScape X</span>
                      <span className="text-xs px-2 py-0.5 bg-memphis-yellow border border-memphis-black font-bold">편집</span>
                    </a>
                    <a
                      href="https://aitoolb.com/61"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-memphis-black shadow-memphis-sm hover:shadow-memphis hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      <span className="font-bold text-memphis-black">무료캡컷</span>
                      <span className="text-xs px-2 py-0.5 bg-memphis-purple border border-memphis-black font-bold text-white">영상</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* YouTube Section */}
              <div className="mt-8 pt-8 border-t-4 border-memphis-black">
                <div className="text-center space-y-4">
                  <a
                    href="https://www.youtube.com/results?search_query=ai%ED%88%B4%EB%B9%84"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-memphis-pink border-2 border-memphis-black shadow-memphis hover:shadow-memphis-lg hover:-translate-x-1 hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 text-memphis-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="font-bold text-memphis-black uppercase">AI툴비 유튜브</span>
                  </a>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="mt-8 pt-8 border-t-4 border-memphis-black">
                <div className="text-center space-y-2">
                  <p className="text-sm font-bold text-memphis-black">
                    총 <span className="px-2 py-0.5 bg-memphis-yellow border border-memphis-black">{totalServices}개</span>의 AI 서비스 ·
                    <span className="px-2 py-0.5 bg-memphis-teal border border-memphis-black ml-1">{categories.length}개</span> 카테고리
                  </p>
                  <p className="text-xs text-memphis-gray font-medium">
                    지속적으로 업데이트되고 있습니다
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

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
