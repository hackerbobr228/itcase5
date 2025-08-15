// Translations
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
    projectManager: "Loyiha Menejeri Pro",
    projectManagerDesc: "Jamoa hamkorligi va real vaqt yangilanishlari bilan rivojlangan loyiha boshqaruv vositasi",
    itSabab: "IT Sabab",
    itSababDesc: "Biznes jarayonlarini avtomatlashtirish va tahlil qilish uchun kuchli vosita",
    productivity: "Samaradorlik",
    business: "Biznes",
    versionLabel: "Versiya:",
    sizeLabel: "Hajmi:",
    categoryLabel: "Kategoriya:",
    statusLabel: "Holati:",
    available: "Mavjud",
    development: "Ishlab chiqilmoqda",
    clickForDetails: "Batafsil ma'lumot uchun bosing",
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
    projectManager: "Project Manager Pro",
    projectManagerDesc:
      "Продвинутый инструмент управления проектами с функциями командной работы и обновлениями в реальном времени",
    itSabab: "IT Sabab",
    itSababDesc: "Мощный инструмент для автоматизации и анализа бизнес-процессов",
    productivity: "Продуктивность",
    business: "Бизнес",
    versionLabel: "Версия:",
    sizeLabel: "Размер:",
    categoryLabel: "Категория:",
    statusLabel: "Статус:",
    available: "Доступно",
    development: "В разработке",
    clickForDetails: "Нажмите для подробностей",
  },
}

// Global state
let currentLanguage = "uz"
let apps = []
let loading = true
let error = null

// DOM elements
const elements = {
  loadingScreen: document.getElementById("loading-screen"),
  app: document.getElementById("app"),
  loadingText: document.getElementById("loading-text"),
  languageToggle: document.getElementById("language-toggle"),
  languageSlider: document.getElementById("language-slider"),
  uzText: document.getElementById("uz-text"),
  ruText: document.getElementById("ru-text"),
  loggedInText: document.getElementById("logged-in-text"),
  logoutBtn: document.getElementById("logout-btn"),
  errorState: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  retryBtn: document.getElementById("retry-btn"),
  emptyState: document.getElementById("empty-state"),
  emptyTitle: document.getElementById("empty-title"),
  emptyDescription: document.getElementById("empty-description"),
  appsGrid: document.getElementById("apps-grid"),
  copyrightText: document.getElementById("copyright-text"),
  // Modal elements
  modal: document.getElementById("app-details-modal"),
  modalAppName: document.getElementById("modal-app-name"),
  modalIcon: document.getElementById("modal-icon"),
  modalDescription: document.getElementById("modal-description"),
  modalVersion: document.getElementById("modal-version"),
  modalSize: document.getElementById("modal-size"),
  modalCategory: document.getElementById("modal-category"),
  modalStatus: document.getElementById("modal-status"),
  modalDownloadBtn: document.getElementById("modal-download-btn"),
  modalDownloadText: document.getElementById("modal-download-text"),
  closeModal: document.getElementById("close-modal"),
  versionLabel: document.getElementById("version-label"),
  sizeLabel: document.getElementById("size-label"),
  categoryLabel: document.getElementById("category-label"),
  statusLabel: document.getElementById("status-label"),
}

// Initialize app
function init() {
  setupEventListeners()
  fetchApps()
}

// Setup event listeners
function setupEventListeners() {
  elements.languageToggle.addEventListener("click", toggleLanguage)
  elements.logoutBtn.addEventListener("click", handleLogout)
  elements.retryBtn.addEventListener("click", fetchApps)
  elements.closeModal.addEventListener("click", closeModal)
  elements.modal.addEventListener("click", (e) => {
    if (e.target === elements.modal) closeModal()
  })
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal()
  })
}

// Toggle language
function toggleLanguage() {
  currentLanguage = currentLanguage === "uz" ? "ru" : "uz"
  updateLanguageUI()
  updateTexts()
  renderApps()
}

// Update language UI
function updateLanguageUI() {
  if (currentLanguage === "ru") {
    elements.languageSlider.classList.add("ru")
    elements.uzText.classList.remove("active")
    elements.ruText.classList.add("active")
  } else {
    elements.languageSlider.classList.remove("ru")
    elements.uzText.classList.add("active")
    elements.ruText.classList.remove("active")
  }
}

// Update all texts based on current language
function updateTexts() {
  const t = translations[currentLanguage]

  elements.loadingText.textContent = t.loadingApps
  elements.loggedInText.textContent = t.loggedInAs
  elements.logoutBtn.textContent = t.logout
  elements.emptyTitle.textContent = t.noAppsTitle
  elements.emptyDescription.textContent = t.noAppsDesc
  elements.retryBtn.textContent = t.tryAgain
  elements.copyrightText.textContent = t.copyright
  elements.modalDownloadText.textContent = t.download
  elements.versionLabel.textContent = t.versionLabel
  elements.sizeLabel.textContent = t.sizeLabel
  elements.categoryLabel.textContent = t.categoryLabel
  elements.statusLabel.textContent = t.statusLabel

  if (error) {
    elements.errorMessage.textContent = "Failed to load apps. Please try again later."
  }
}

// Fetch apps from API
async function fetchApps() {
  loading = true
  error = null
  showLoading()

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const t = translations[currentLanguage]
    const fakeApps = [
      {
        id: 1,
        name: t.projectManager,
        description: t.projectManagerDesc,
        version: "2.1.4",
        icon: "",
        download_url: "#",
        file_size: "45.2 MB",
        category: t.productivity,
        status: "available",
      },
      {
        id: 2,
        name: t.itSabab,
        description: t.itSababDesc,
        version: "1.0.0",
        icon: "",
        download_url: "#",
        file_size: "32.8 MB",
        category: t.business,
        status: "development",
      },
    ]

    apps = fakeApps
  } catch (err) {
    error = "Failed to load apps. Please try again later."
    console.error("Error fetching apps:", err)
  } finally {
    loading = false
    hideLoading()
    render()
  }
}

// Show loading screen
function showLoading() {
  elements.loadingScreen.style.display = "flex"
  elements.app.style.display = "none"
}

// Hide loading screen
function hideLoading() {
  elements.loadingScreen.style.display = "none"
  elements.app.style.display = "block"
}

// Main render function
function render() {
  if (error) {
    showError()
  } else if (apps.length === 0) {
    showEmpty()
  } else {
    renderApps()
  }
}

// Show error state
function showError() {
  elements.errorState.style.display = "block"
  elements.emptyState.style.display = "none"
  elements.appsGrid.style.display = "none"
  elements.errorMessage.textContent = error
}

// Show empty state
function showEmpty() {
  elements.errorState.style.display = "none"
  elements.emptyState.style.display = "block"
  elements.appsGrid.style.display = "none"
}

// Render apps grid
function renderApps() {
  elements.errorState.style.display = "none"
  elements.emptyState.style.display = "none"
  elements.appsGrid.style.display = "grid"

  const t = translations[currentLanguage]

  elements.appsGrid.innerHTML = apps
    .map(
      (app) => `
        <div class="app-card" onclick="showAppDetails(${app.id})">
            <div class="app-card-content">
                <div class="app-icon">
                    ${
                      app.icon
                        ? `<img src="${app.icon}" alt="${app.name}">`
                        : `<span class="app-icon-text">${app.name.charAt(0).toUpperCase()}</span>`
                    }
                </div>

                <div class="app-info">
                    <h3 class="app-name">${app.name}</h3>
                    <p class="app-description">${app.description}</p>
                    <div class="app-meta">
                        <span class="app-badge">${t.version}${app.version}</span>
                        ${app.file_size ? `<span class="app-badge">${app.file_size}</span>` : ""}
                    </div>
                </div>

                ${
                  app.category
                    ? `
                    <div class="app-category">
                        <span class="category-badge">${app.category}</span>
                    </div>
                `
                    : ""
                }

                <button class="download-btn ${app.status === "development" ? "disabled" : ""}" onclick="event.stopPropagation(); handleDownload(${app.id})">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span>${app.status === "development" ? (currentLanguage === "uz" ? "Ishlab chiqilmoqda" : "В разработке") : t.download}</span>
                </button>

                <div class="app-hover-effect"></div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Handle app download
function handleDownload(appId) {
  const app = apps.find((a) => a.id === appId)
  if (!app || app.status === "development") {
    const message =
      currentLanguage === "uz" ? "Bu ilova hali ishlab chiqilmoqda" : "Это приложение находится в разработке"
    alert(message)
    return
  }

  const link = document.createElement("a")
  link.href = app.download_url
  link.download = `${app.name}-${app.version}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Handle logout
function handleLogout() {
  // Add your logout logic here
  console.log("Logging out...")
  alert("Logout functionality - implement your logout logic here")
}

// Show app details modal
function showAppDetails(appId) {
  const app = apps.find((a) => a.id === appId)
  if (!app) return

  const t = translations[currentLanguage]

  elements.modalAppName.textContent = app.name
  elements.modalDescription.textContent = app.description
  elements.modalVersion.textContent = app.version
  elements.modalSize.textContent = app.file_size || "N/A"
  elements.modalCategory.textContent = app.category || "N/A"

  const statusText = app.status === "development" ? t.development : t.available
  elements.modalStatus.textContent = statusText
  elements.modalStatus.className = `detail-value status-badge ${app.status}`

  elements.modalIcon.innerHTML = app.icon
    ? `<img src="${app.icon}" alt="${app.name}">`
    : `<span class="app-icon-text">${app.name.charAt(0).toUpperCase()}</span>`

  if (app.status === "development") {
    elements.modalDownloadBtn.classList.add("disabled")
    elements.modalDownloadBtn.onclick = null
    elements.modalDownloadText.textContent = t.development
  } else {
    elements.modalDownloadBtn.classList.remove("disabled")
    elements.modalDownloadBtn.onclick = () => handleDownload(appId)
    elements.modalDownloadText.textContent = t.download
  }

  elements.modal.style.display = "flex"
  setTimeout(() => elements.modal.classList.add("show"), 10)
}

// Close app details modal
function closeModal() {
  elements.modal.classList.remove("show")
  setTimeout(() => (elements.modal.style.display = "none"), 300)
}

// Start the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
