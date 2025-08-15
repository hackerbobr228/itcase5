"use client"

import { useState, useEffect } from "react"

const translations = {
  uz: {
    backToHome: "Bosh sahifaga qaytish",
    appDetails: "Ilova haqida",
    version: "Versiya:",
    status: "Holat:",
    developer: "Ishlab chiquvchi:",
    category: "Kategoriya:",
    fileSize: "Fayl hajmi:",
    requirements: "Talablar:",
    inDevelopment: "Ishlab chiqilmoqda",
    development: "Ishlab chiqish",
    description:
      "IT sohasidagi muammolarni hal qilish uchun zamonaviy yechim. Bu ilova hozirda ishlab chiqilmoqda va tez orada foydalanish uchun tayyor bo'ladi.",
    features: "Xususiyatlar:",
    comingSoon: "Tez orada...",
    moreInfoSoon: "Qo'shimcha ma'lumotlar tez orada qo'shiladi.",
    lightTheme: "Yorug' tema",
    darkTheme: "Qorong'u tema",
  },
  ru: {
    backToHome: "Вернуться на главную",
    appDetails: "О приложении",
    version: "Версия:",
    status: "Статус:",
    developer: "Разработчик:",
    category: "Категория:",
    fileSize: "Размер файла:",
    requirements: "Требования:",
    inDevelopment: "В разработке",
    development: "Разработка",
    description:
      "Современное решение для решения проблем в сфере IT. Это приложение находится в разработке и скоро будет готово к использованию.",
    features: "Особенности:",
    comingSoon: "Скоро...",
    moreInfoSoon: "Дополнительная информация будет добавлена в ближайшее время.",
    lightTheme: "Светлая тема",
    darkTheme: "Темная тема",
  },
}

export default function ITSababPage() {
  const [language, setLanguage] = useState<"uz" | "ru">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("itcase-language") as "uz" | "ru") || "uz"
    }
    return "uz"
  })

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("itcase-theme") as "dark" | "light") || "dark"
    }
    return "dark"
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem("itcase-language") as "uz" | "ru"
      const savedTheme = localStorage.getItem("itcase-theme") as "dark" | "light"
      if (savedLanguage) setLanguage(savedLanguage)
      if (savedTheme) setTheme(savedTheme)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const t = translations[language]

  const toggleLanguage = () => {
    const newLanguage = language === "uz" ? "ru" : "uz"
    setLanguage(newLanguage)
    localStorage.setItem("itcase-language", newLanguage)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("itcase-theme", newTheme)
  }

  const goBack = () => {
    window.location.href = "/"
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-800 via-blue-800 to-blue-700"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-white"
      }`}
    >
      {/* Header */}
      <header
        className={`backdrop-blur-md border-b transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-700/60 border-blue-500/40" : "bg-white/80 border-blue-200/60 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={goBack}
                className={`p-2 transition-colors rounded-lg backdrop-blur-sm ${
                  theme === "dark"
                    ? "text-blue-200 hover:text-white hover:bg-slate-600/50"
                    : "text-blue-600 hover:text-blue-800 hover:bg-blue-100/50"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="/images/itcase-logo-white-theme.png"
                    alt="itcase logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    IT Sabab
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
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

              <div className="relative">
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
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div
          className={`backdrop-blur-md rounded-2xl shadow-2xl border overflow-hidden transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-700/50 border-blue-600/30" : "bg-white/80 border-blue-200/40"
          }`}
        >
          {/* App Header */}
          <div
            className={`p-4 sm:p-8 border-b transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-600/40"
                : "bg-gradient-to-r from-blue-100/60 to-cyan-100/60 border-blue-200/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mx-auto sm:mx-0 overflow-hidden">
                <img
                  src="/images/itcase-logo-white-theme.png"
                  alt="IT Sabab logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1
                  className={`text-2xl sm:text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  IT Sabab
                </h1>
                <p
                  className={`text-base sm:text-lg mb-4 leading-relaxed ${theme === "dark" ? "text-blue-100" : "text-gray-600"}`}
                >
                  {t.description}
                </p>
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-full border ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-orange-400/20 to-red-400/20 text-orange-200 border-orange-400/40"
                      : "bg-gradient-to-r from-orange-100/80 to-red-100/80 text-orange-700 border-orange-300/60"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 animate-pulse ${theme === "dark" ? "bg-orange-300" : "bg-orange-500"}`}
                  ></div>
                  <span className="font-semibold text-sm">{t.inDevelopment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Details */}
          <div className="p-4 sm:p-8">
            <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              {t.appDetails}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: t.version, value: "1.0.0" },
                { label: t.status, value: t.inDevelopment, isStatus: true },
                { label: t.developer, value: "itcase Team" },
                { label: t.category, value: t.development },
                { label: t.fileSize, value: "28.5 MB" },
                { label: t.requirements, value: "Windows 10+, 2GB RAM" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 backdrop-blur-sm border transition-colors duration-300 ${
                    theme === "dark" ? "bg-slate-600/40 border-blue-600/20" : "bg-white/80 border-blue-200/30"
                  }`}
                >
                  <p className={`text-sm mb-2 ${theme === "dark" ? "text-blue-200" : "text-blue-600"}`}>{item.label}</p>
                  <p
                    className={`font-semibold text-base sm:text-lg ${
                      item.isStatus
                        ? theme === "dark"
                          ? "text-orange-300"
                          : "text-orange-600"
                        : theme === "dark"
                          ? "text-white"
                          : "text-gray-800"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Features Section */}
            <div
              className={`rounded-xl p-4 sm:p-6 mb-8 border transition-colors duration-300 ${
                theme === "dark" ? "bg-slate-600/30 border-blue-600/20" : "bg-white/60 border-blue-200/30"
              }`}
            >
              <h3 className={`text-lg sm:text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {t.features}
              </h3>
              <div className="text-center py-6 sm:py-8">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    theme === "dark" ? "bg-blue-500/30" : "bg-blue-100/80"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p
                  className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}
                >
                  {t.comingSoon}
                </p>
                <p className={`mt-2 text-sm sm:text-base ${theme === "dark" ? "text-blue-100" : "text-gray-600"}`}>
                  {t.moreInfoSoon}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <button
                onClick={goBack}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2 text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t.backToHome}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
