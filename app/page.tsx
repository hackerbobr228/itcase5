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
    lightTheme: "Yorug' tema",
    darkTheme: "Qorong'u tema",
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
    lightTheme: "Светлая тема",
    darkTheme: "Темная тема",
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

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("itcase-theme")
      return (saved as "dark" | "light") || "dark"
    }
    return "dark"
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
    if (typeof window !== "undefined") {
      localStorage.setItem("itcase-theme", theme)
    }
  }, [theme])

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const navigateToApp = (app: App) => {
    if (app.name === t.itSabab) {
      window.location.href = "/it-sabab"
    }
  }

  const themeStyles = {
    dark: {
      background: "bg-gradient-to-br from-slate-800 via-blue-800 to-blue-700",
      loadingBg: "bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800",
      header: "bg-slate-700/60 backdrop-blur-md border-b border-blue-500/40",
      card: "bg-slate-700/50 backdrop-blur-md border-blue-600/30 hover:border-blue-400/60",
      footer: "bg-slate-700/60 backdrop-blur-md border-t border-blue-600/40",
      text: {
        primary: "text-white",
        secondary: "text-gray-100",
        accent: "text-blue-200",
        muted: "text-gray-200",
      },
      logo: "/images/itcase-logo-final.png",
    },
    light: {
      background: "bg-gradient-to-br from-gray-50 via-blue-50 to-white",
      loadingBg: "bg-gradient-to-br from-white via-blue-50 to-gray-100",
      header: "bg-white/80 backdrop-blur-md border-b border-blue-200/60 shadow-sm",
      card: "bg-white/80 backdrop-blur-md border-blue-200/40 hover:border-blue-300/60 shadow-lg",
      footer: "bg-white/80 backdrop-blur-md border-t border-blue-200/40",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-700",
        accent: "text-blue-700",
        muted: "text-gray-600",
      },
      logo: "/images/itcase-logo-white-theme.png",
    },
  }

  const currentTheme = themeStyles[theme]

  if (loading) {
    return (
      <div className={`min-h-screen ${currentTheme.loadingBg} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className={currentTheme.text.secondary}>{t.loadingApps}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${currentTheme.background}`}>
      {/* Header */}
      <header className={currentTheme.header}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                <img
                  src={currentTheme.logo || "/placeholder.svg"}
                  alt="itcase logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className={`text-3xl sm:text-4xl font-bold ${currentTheme.text.primary} tracking-tight`}>itcase</h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative order-1 sm:order-1">
                <button
                  onClick={toggleTheme}
                  className={`group relative w-16 h-10 sm:w-18 sm:h-12 rounded-xl border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 shadow-md hover:shadow-lg backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-slate-800/90 border-slate-600 focus:ring-blue-400/30 hover:border-blue-400 hover:bg-slate-700/90 shadow-slate-900/30"
                      : "bg-white/90 border-gray-300 focus:ring-blue-300/30 hover:border-blue-400 hover:bg-blue-50/80 shadow-gray-400/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 ease-out shadow-sm border flex items-center justify-center transform ${
                      theme === "dark" ? "translate-x-0.5" : "translate-x-5 sm:translate-x-6"
                    } ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500 shadow-slate-800/40"
                        : "bg-gradient-to-br from-yellow-400 to-orange-400 border-yellow-300 shadow-orange-400/30"
                    }`}
                  >
                    <div className="relative">
                      {theme === "dark" ? (
                        <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm border shadow-sm whitespace-nowrap ${
                        theme === "dark"
                          ? "bg-slate-800/90 text-blue-200 border-slate-600"
                          : "bg-white/90 text-blue-700 border-gray-300"
                      }`}
                    >
                      {theme === "dark" ? t.lightTheme : t.darkTheme}
                    </span>
                  </div>
                </button>
              </div>

              <div className="relative order-2 sm:order-2">
                <button
                  onClick={toggleLanguage}
                  className={`group relative w-20 h-10 sm:w-24 sm:h-12 rounded-xl border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 shadow-md hover:shadow-lg backdrop-blur-sm ${
                    theme === "dark"
                      ? "bg-slate-800/90 border-slate-600 focus:ring-blue-400/30 hover:border-blue-400 hover:bg-slate-700/90 shadow-slate-900/30"
                      : "bg-white/90 border-gray-300 focus:ring-blue-300/30 hover:border-blue-400 hover:bg-blue-50/80 shadow-gray-400/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 ease-out shadow-sm border ${
                      language === "uz" ? "translate-x-0.5" : "translate-x-10 sm:translate-x-12"
                    } ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 shadow-blue-600/40"
                        : "bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 shadow-blue-600/30"
                    }`}
                  />
                  <div className="relative flex items-center justify-between px-2 sm:px-3 h-full">
                    <span
                      className={`text-xs sm:text-sm font-bold transition-all duration-300 ${
                        language === "uz" ? "text-white z-10" : theme === "dark" ? "text-blue-200" : "text-blue-600"
                      }`}
                    >
                      UZ
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold transition-all duration-300 ${
                        language === "ru" ? "text-white z-10" : theme === "dark" ? "text-blue-200" : "text-blue-600"
                      }`}
                    >
                      RU
                    </span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm border shadow-sm whitespace-nowrap ${
                        theme === "dark"
                          ? "bg-slate-800/90 text-blue-200 border-slate-600"
                          : "bg-white/90 text-blue-700 border-gray-300"
                      }`}
                    >
                      {language === "uz" ? "O'zbekcha" : "Русский"}
                    </span>
                  </div>
                </button>
              </div>

              <div className="text-left sm:text-right order-3 sm:order-3 flex-1 sm:flex-none">
                <p className={`text-xs sm:text-sm ${currentTheme.text.accent}`}>{t.loggedInAs}</p>
                <p className={`text-sm sm:text-base font-semibold ${currentTheme.text.primary} truncate`}>
                  user@itcase.com
                </p>
              </div>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm border border-orange-400/40 hover:border-red-300/60 shadow-lg hover:shadow-xl order-4 w-full sm:w-auto`}
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
            <div
              className={`border border-orange-400/40 rounded-xl p-6 max-w-md mx-auto backdrop-blur-sm shadow-xl ${
                theme === "dark" ? "bg-red-800/30" : "bg-red-50/80"
              }`}
            >
              <p className={theme === "dark" ? "text-orange-200" : "text-red-700"}>{error}</p>
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
            <div className={`${currentTheme.card} rounded-xl shadow-xl p-6 sm:p-8 max-w-md mx-auto`}>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === "dark" ? "bg-blue-700/60" : "bg-blue-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${theme === "dark" ? "text-blue-200" : "text-blue-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className={`text-lg font-medium ${currentTheme.text.primary} mb-2`}>{t.noAppsTitle}</h3>
              <p className={currentTheme.text.secondary}>{t.noAppsDesc}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl w-full">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className={`${currentTheme.card} rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.03]`}
                  onClick={() => navigateToApp(app)}
                >
                  <div className="p-6 sm:p-8 relative">
                    {app.status === "development" && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                        {t.inDevelopment}
                      </div>
                    )}
                    <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-6 mx-auto transition-all duration-500 group-hover:rotate-3 rounded-full overflow-hidden">
                      <img
                        src={currentTheme.logo || "/placeholder.svg"}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* App Info */}
                    <div className="text-center mb-4">
                      <h3 className={`font-bold ${currentTheme.text.primary} mb-2 text-lg sm:text-xl`}>{app.name}</h3>
                      <p className={`text-sm ${currentTheme.text.secondary} mb-3 leading-relaxed line-clamp-2`}>
                        {app.description}
                      </p>
                      <div
                        className={`flex items-center justify-center space-x-2 text-xs ${currentTheme.text.muted} mb-3`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full font-medium ${
                            theme === "dark" ? "bg-blue-700/60" : "bg-blue-100"
                          }`}
                        >
                          {t.version}
                          {app.version}
                        </span>
                        {app.file_size && (
                          <span
                            className={`px-2 py-1 rounded-full font-medium ${
                              theme === "dark" ? "bg-blue-700/60" : "bg-blue-100"
                            }`}
                          >
                            {t.fileSize}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Category Badge */}
                    {app.category && (
                      <div className="flex justify-center mb-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full border font-medium ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-blue-400/20 to-blue-300/20 text-blue-200 border-blue-400/40"
                              : "bg-gradient-to-r from-blue-100/80 to-blue-50/80 text-blue-700 border-blue-300/60"
                          }`}
                        >
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

      <footer className={currentTheme.footer}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm">
            <p className={currentTheme.text.secondary}>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
