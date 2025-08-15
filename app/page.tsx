"use client"

import { useState, useEffect } from "react"

interface App {
  id: number
  name: string
  description: string
  version: string
  icon: string
  download_url: string
  file_size: string
  category: string
  status?: "available" | "development"
  developer?: string
  requirements?: string
  screenshots?: string[]
}

const translations = {
  uz: {
    loggedInAs: "Tizimga kirgan:",
    logout: "Chiqish",
    loadingApps: "Ilovalar yuklanmoqda...",
    noAppsTitle: "Ilovalar mavjud emas",
    noAppsDesc: "Hozircha hech qanday ilova qo'shilmagan. Keyinroq qarang!",
    tryAgain: "Qayta urinish",
    download: "Yuklab olish",
    copyright: "2024 itcase. Barcha huquqlar himoyalangan.",
    version: "v",
    itSabab: "IT Sabab",
    itSababDesc: "IT sohasidagi muammolarni hal qilish uchun zamonaviy yechim",
    development: "Ishlab chiqish",
    inDevelopment: "Ishlab chiqilmoqda",
    viewDetails: "Batafsil ko'rish",
    availableApps: "Mavjud ilovalar",
    developer: "Ishlab chiquvchi",
    requirements: "Talablar",
    fileSize: "Fayl hajmi",
    category: "Kategoriya",
    errorMessage: "Ilovalarni yuklashda xatolik. Keyinroq qayta urinib ko'ring.",
  },
  ru: {
    loggedInAs: "Вошли как:",
    logout: "Выйти",
    loadingApps: "Загрузка приложений...",
    noAppsTitle: "Приложения недоступны",
    noAppsDesc: "Пока не добавлено ни одного приложения. Проверьте позже!",
    tryAgain: "Попробовать снова",
    download: "Скачать",
    copyright: "2024 itcase. Все права защищены.",
    version: "в",
    itSabab: "IT Sabab",
    itSababDesc: "Современное решение для решения проблем в сфере IT",
    development: "Разработка",
    inDevelopment: "В разработке",
    viewDetails: "Подробнее",
    availableApps: "Доступные приложения",
    developer: "Разработчик",
    requirements: "Требования",
    fileSize: "Размер файла",
    category: "Категория",
    errorMessage: "Ошибка загрузки приложений. Попробуйте позже.",
  },
}

export default function AppLauncher() {
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<"uz" | "ru">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("itcase-language")
      return (saved as "uz" | "ru") || "uz"
    }
    return "uz"
  })

  const t = translations[language]

  useEffect(() => {
    fetchApps()
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("itcase-language", language)
    }
  }, [language])

  useEffect(() => {
    if (!loading) {
      fetchApps()
    }
  }, [language])

  const fetchApps = async () => {
    try {
      const fakeApps: App[] = [
        {
          id: 2,
          name: t.itSabab,
          description: t.itSababDesc,
          version: "1.0.0",
          icon: "",
          download_url: "#",
          file_size: "28.5 MB",
          category: t.development,
          status: "development",
          developer: "itcase Team",
          requirements: "Windows 10+, 2GB RAM",
        },
      ]
      setApps(fakeApps)
    } catch (err) {
      setError(t.errorMessage)
      console.error("Error fetching apps:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (app: App) => {
    if (app.status === "development") return

    const link = document.createElement("a")
    link.href = app.download_url
    link.download = `${app.name}-${app.version}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "uz" ? "ru" : "uz"))
  }

  const navigateToApp = (app: App) => {
    if (app.name === t.itSabab) {
      window.location.href = "/it-sabab"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-100">{t.loadingApps}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-blue-700">
      {/* Header */}
      <header className="bg-slate-700/60 backdrop-blur-md border-b border-blue-500/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                <img src="/images/itcase-logo-final.png" alt="itcase logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">itcase</h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <div className="relative order-2 sm:order-1">
                <button
                  onClick={toggleLanguage}
                  className="relative w-20 h-10 bg-slate-600/80 backdrop-blur-sm rounded-full border border-blue-300/40 transition-all duration-200 hover:border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300/60 shadow-lg hover:shadow-xl"
                >
                  <div
                    className={`absolute top-1 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full transition-transform duration-300 ease-out shadow-lg ${
                      language === "uz" ? "translate-x-1" : "translate-x-10"
                    }`}
                  />
                  <div className="relative flex items-center justify-between px-3 h-full">
                    <span
                      className={`text-sm font-bold transition-colors duration-300 ${
                        language === "uz" ? "text-white" : "text-gray-200"
                      }`}
                    >
                      UZ
                    </span>
                    <span
                      className={`text-sm font-bold transition-colors duration-300 ${
                        language === "ru" ? "text-white" : "text-gray-200"
                      }`}
                    >
                      RU
                    </span>
                  </div>
                </button>
              </div>
              <div className="text-left sm:text-right order-1 sm:order-2 flex-1 sm:flex-none">
                <p className="text-xs sm:text-sm text-blue-200">{t.loggedInAs}</p>
                <p className="text-sm sm:text-base font-semibold text-white truncate">user@itcase.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm border border-orange-400/40 hover:border-red-300/60 shadow-lg hover:shadow-xl order-3 w-full sm:w-auto"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-800/30 border border-orange-400/40 rounded-xl p-6 max-w-md mx-auto backdrop-blur-sm shadow-xl">
              <p className="text-orange-200">{error}</p>
              <button
                onClick={fetchApps}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                {t.tryAgain}
              </button>
            </div>
          </div>
        ) : apps.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 max-w-md mx-auto border border-blue-600/30">
              <div className="w-16 h-16 bg-blue-700/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{t.noAppsTitle}</h3>
              <p className="text-blue-100">{t.noAppsDesc}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl w-full">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-700/50 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-blue-600/30 hover:border-blue-400/60 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.03]"
                  onClick={() => navigateToApp(app)}
                >
                  <div className="p-6 sm:p-8 relative">
                    {app.status === "development" && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                        {t.inDevelopment}
                      </div>
                    )}
                    <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-6 mx-auto transition-all duration-500 group-hover:rotate-3 rounded-full overflow-hidden">
                      <img src="/images/itcase-logo-final.png" alt={app.name} className="w-full h-full object-cover" />
                    </div>
                    {/* App Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-white mb-2 text-lg sm:text-xl">{app.name}</h3>
                      <p className="text-sm text-gray-100 mb-3 leading-relaxed line-clamp-2">{app.description}</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-200 mb-3">
                        <span className="bg-blue-700/60 px-2 py-1 rounded-full font-medium">
                          {t.version}
                          {app.version}
                        </span>
                        {app.file_size && (
                          <span className="bg-blue-700/60 px-2 py-1 rounded-full font-medium">{t.fileSize}</span>
                        )}
                      </div>
                    </div>
                    {/* Category Badge */}
                    {app.category && (
                      <div className="flex justify-center mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-400/20 to-blue-300/20 text-blue-200 text-xs rounded-full border border-blue-400/40 font-medium">
                          {t.category}
                        </span>
                      </div>
                    )}
                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (app.status === "development") {
                          navigateToApp(app)
                        } else {
                          handleDownload(app)
                        }
                      }}
                      className={`w-full font-semibold py-2 sm:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg text-sm ${
                        app.status === "development"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                          : "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            app.status === "development"
                              ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              : "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          }
                        />
                      </svg>
                      <span>{app.status === "development" ? t.viewDetails : t.download}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-700/60 backdrop-blur-md border-t border-blue-600/40 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-100">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
