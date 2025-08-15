"use client"

import { useState } from "react"

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
  },
}

export default function ITSababPage() {
  const [language, setLanguage] = useState<"uz" | "ru">("uz")

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "uz" ? "ru" : "uz"))
  }

  const goBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800">
      {/* Header */}
      <header className="bg-slate-700/60 backdrop-blur-md border-b border-blue-600/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={goBack}
                className="p-2 text-blue-200 hover:text-white transition-colors rounded-lg hover:bg-slate-600/50 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl ring-2 ring-blue-400/20">
                  <img src="/images/itcase-logo-new.png" alt="itcase logo" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">IT Sabab</h1>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="relative w-20 h-10 bg-slate-600/80 backdrop-blur-sm rounded-full border border-blue-300/40 transition-all duration-200 hover:border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-300/60 shadow-lg hover:shadow-xl"
              >
                <div
                  className={`absolute top-1 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-transform duration-300 ease-out shadow-lg ${
                    language === "uz" ? "translate-x-1" : "translate-x-10"
                  }`}
                />
                <div className="relative flex items-center justify-between px-3 h-full">
                  <span
                    className={`text-sm font-bold transition-colors duration-300 ${
                      language === "uz" ? "text-white" : "text-blue-100"
                    }`}
                  >
                    UZ
                  </span>
                  <span
                    className={`text-sm font-bold transition-colors duration-300 ${
                      language === "ru" ? "text-white" : "text-blue-100"
                    }`}
                  >
                    RU
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-600/30 overflow-hidden">
          {/* App Header */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 sm:p-8 border-b border-blue-600/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl mx-auto sm:mx-0">
                <span className="text-white font-bold text-3xl sm:text-4xl">IT</span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">IT Sabab</h1>
                <p className="text-blue-100 text-base sm:text-lg mb-4 leading-relaxed">{t.description}</p>
                <div className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-orange-400/20 to-red-400/20 text-orange-200 rounded-full border border-orange-400/40">
                  <div className="w-2 h-2 bg-orange-300 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-semibold text-sm">{t.inDevelopment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Details */}
          <div className="p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">{t.appDetails}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.version}</p>
                <p className="text-white font-semibold text-base sm:text-lg">1.0.0</p>
              </div>
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.status}</p>
                <p className="text-orange-300 font-semibold text-base sm:text-lg">{t.inDevelopment}</p>
              </div>
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.developer}</p>
                <p className="text-white font-semibold text-base sm:text-lg">itcase Team</p>
              </div>
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.category}</p>
                <p className="text-white font-semibold text-base sm:text-lg">{t.development}</p>
              </div>
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.fileSize}</p>
                <p className="text-white font-semibold text-base sm:text-lg">28.5 MB</p>
              </div>
              <div className="bg-slate-600/40 rounded-xl p-4 backdrop-blur-sm border border-blue-600/20">
                <p className="text-blue-200 text-sm mb-2">{t.requirements}</p>
                <p className="text-white font-semibold text-base sm:text-lg">Windows 10+, 2GB RAM</p>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-slate-600/30 rounded-xl p-4 sm:p-6 mb-8 border border-blue-600/20">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{t.features}</h3>
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-blue-200 text-base sm:text-lg font-medium">{t.comingSoon}</p>
                <p className="text-blue-100 mt-2 text-sm sm:text-base">{t.moreInfoSoon}</p>
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
