export type Lang = 'en' | 'ru' | 'es' | 'zh'

export type DictKey =
  | 'app.allTasks'
  | 'app.task'
  | 'app.tasks'
  | 'app.noTasks'
  | 'app.createOne'
  | 'app.newTask'
  | 'app.settings'
  | 'app.theme'
  | 'app.light'
  | 'app.dark'
  | 'app.language'
  | 'app.selectTask'
  | 'app.welcome'
  | 'app.selectHint'
  | 'app.welcomeDesc'
  | 'app.createFirst'
  | 'app.taskNotFound'
  | 'app.goBack'
  | 'block.text'
  | 'block.image'
  | 'block.table'
  | 'block.drawing'
  | 'block.addBlock'
  | 'block.deleteBlock'
  | 'block.typeSomething'
  | 'block.clickToUpload'
  | 'block.saveDrawing'
  | 'block.clear'
  | 'task.open'
  | 'task.addSubtask'
  | 'task.deleteTask'
  | 'task.whatToAccomplish'
  | 'task.addNotes'
  | 'task.startWithName'
  | 'task.addTask'
  | 'task.cancel'
  | 'task.blocks'
  | 'task.addBlock'
  | 'table.addColumn'
  | 'table.addRow'
  | 'table.deleteColumn'
  | 'table.deleteRow'
  | 'ai.improve'
  | 'ai.split'
  | 'ai.processing'
  | 'ai.apply'
  | 'ai.cancel'
  | 'ai.error'
  | 'ai.noKey'
  | 'ai.apiKey'
  | 'ai.apiKeyPlaceholder'
  | 'ai.apiKeyHint'
  | 'ai.structure'
  | 'ai.describe'
  | 'ai.suggest'
  | 'ai.explain'
  | 'ai.improveTable'
  | 'ai.assist'
  | 'ai.comingSoon'
  | 'search.placeholder'
  | 'search.noResults'
  | 'filter.all'
  | 'filter.active'
  | 'filter.completed'

const dict: Record<Lang, Record<DictKey, string>> = {
  en: {
    'app.allTasks': 'All Tasks',
    'app.task': 'task',
    'app.tasks': 'tasks',
    'app.noTasks': 'No tasks yet',
    'app.createOne': 'Create one',
    'app.newTask': 'New task',
    'app.settings': 'Settings',
    'app.theme': 'Theme',
    'app.light': 'Light',
    'app.dark': 'Dark',
    'app.language': 'Language',
    'app.selectTask': 'Select a task',
    'app.welcome': 'Welcome to Focus',
    'app.selectHint': 'Choose a task from the sidebar to view its details, or create a new one.',
    'app.welcomeDesc': 'Break down your goals into focused tasks. Start by creating your first task.',
    'app.createFirst': 'Create your first task',
    'app.taskNotFound': 'Task not found',
    'app.goBack': 'Go back',
    'block.text': 'Text',
    'block.image': 'Image',
    'block.table': 'Table',
    'block.drawing': 'Drawing',
    'block.addBlock': 'Add block',
    'block.deleteBlock': 'Delete block',
    'block.typeSomething': 'Type something…',
    'block.clickToUpload': 'Click to upload an image',
    'block.saveDrawing': 'Save drawing',
    'block.clear': 'Clear',
    'task.open': 'Open task',
    'task.addSubtask': 'Add subtask',
    'task.deleteTask': 'Delete task',
    'task.whatToAccomplish': 'What do you want to accomplish?',
    'task.addNotes': 'Add notes, details, or ideas…',
    'task.startWithName': 'Start by giving your task a name above',
    'task.addTask': 'Add task',
    'task.cancel': 'Cancel',
    'task.blocks': 'Blocks',
    'task.addBlock': 'Add block',
    'table.addColumn': 'Add column',
    'table.addRow': 'Add row',
    'table.deleteColumn': 'Delete column',
    'table.deleteRow': 'Delete row',
    'ai.improve': 'Improve text',
    'ai.split': 'Split into subtasks',
    'ai.processing': 'AI is thinking…',
    'ai.apply': 'Apply',
    'ai.cancel': 'Cancel',
    'ai.error': 'AI request failed. Check your API key in Settings.',
    'ai.noKey': 'Set AI API key in Settings',
    'ai.apiKey': 'AI API Key',
    'ai.apiKeyPlaceholder': 'Enter your Groq API key',
    'ai.apiKeyHint': 'Get a free key at console.groq.com',
    'ai.structure': 'Structure as list',
    'ai.describe': 'Describe image',
    'ai.suggest': 'Suggest improvements',
    'ai.explain': 'Explain in plain language',
    'ai.improveTable': 'Improve structure',
    'ai.assist': 'AI assist',
    'ai.comingSoon': 'Coming soon',
    'search.placeholder': 'Search tasks\u2026',
    'search.noResults': 'Nothing found',
    'filter.all': 'All',
    'filter.active': 'Active',
    'filter.completed': 'Completed',
  },
  ru: {
    'app.allTasks': 'Все задачи',
    'app.task': 'задача',
    'app.tasks': 'задач',
    'app.noTasks': 'Пока нет задач',
    'app.createOne': 'Создать',
    'app.newTask': 'Новая задача',
    'app.settings': 'Настройки',
    'app.theme': 'Тема',
    'app.light': 'Светлая',
    'app.dark': 'Тёмная',
    'app.language': 'Язык',
    'app.selectTask': 'Выберите задачу',
    'app.welcome': 'Добро пожаловать в Focus',
    'app.selectHint': 'Выберите задачу из боковой панели, чтобы просмотреть её детали, или создайте новую.',
    'app.welcomeDesc': 'Разбивайте свои цели на сфокусированные задачи. Начните с создания первой задачи.',
    'app.createFirst': 'Создать первую задачу',
    'app.taskNotFound': 'Задача не найдена',
    'app.goBack': 'Назад',
    'block.text': 'Текст',
    'block.image': 'Изображение',
    'block.table': 'Таблица',
    'block.drawing': 'Рисунок',
    'block.addBlock': 'Добавить блок',
    'block.deleteBlock': 'Удалить блок',
    'block.typeSomething': 'Напишите что-нибудь…',
    'block.clickToUpload': 'Нажмите, чтобы загрузить изображение',
    'block.saveDrawing': 'Сохранить',
    'block.clear': 'Очистить',
    'task.open': 'Открыть задачу',
    'task.addSubtask': 'Добавить подзадачу',
    'task.deleteTask': 'Удалить задачу',
    'task.whatToAccomplish': 'Что вы хотите сделать?',
    'task.addNotes': 'Добавьте заметки, детали или идеи…',
    'task.startWithName': 'Сначала напишите название задачи',
    'task.addTask': 'Добавить задачу',
    'task.cancel': 'Отмена',
    'task.blocks': 'Блоки',
    'task.addBlock': 'Добавить блок',
    'table.addColumn': 'Добавить колонку',
    'table.addRow': 'Добавить строку',
    'table.deleteColumn': 'Удалить колонку',
    'table.deleteRow': 'Удалить строку',
    'ai.improve': 'Улучшить текст',
    'ai.split': 'Разбить на подзадачи',
    'ai.processing': 'ИИ обрабатывает…',
    'ai.apply': 'Применить',
    'ai.cancel': 'Отмена',
    'ai.error': 'Ошибка ИИ. Проверьте API-ключ в настройках.',
    'ai.noKey': 'Укажите API-ключ в настройках',
    'ai.apiKey': 'API-ключ ИИ',
    'ai.apiKeyPlaceholder': 'Введите ваш Groq API-ключ',
    'ai.apiKeyHint': 'Получить ключ: console.groq.com',
    'ai.structure': 'Структурировать в список',
    'ai.describe': 'Описать изображение',
    'ai.suggest': 'Предложить улучшения',
    'ai.explain': 'Объяснить простым языком',
    'ai.improveTable': 'Улучшить структуру',
    'ai.assist': 'AI помощь',
    'ai.comingSoon': 'Скоро добавим',
    'search.placeholder': 'Поиск задач\u2026',
    'search.noResults': 'Ничего не найдено',
    'filter.all': 'Все',
    'filter.active': 'Активные',
    'filter.completed': 'Завершённые',
  },
  es: {
    'app.allTasks': 'Todas las tareas',
    'app.task': 'tarea',
    'app.tasks': 'tareas',
    'app.noTasks': 'Aún no hay tareas',
    'app.createOne': 'Crear una',
    'app.newTask': 'Nueva tarea',
    'app.settings': 'Ajustes',
    'app.theme': 'Tema',
    'app.light': 'Claro',
    'app.dark': 'Oscuro',
    'app.language': 'Idioma',
    'app.selectTask': 'Selecciona una tarea',
    'app.welcome': 'Bienvenido a Focus',
    'app.selectHint': 'Elige una tarea de la barra lateral para ver sus detalles o crea una nueva.',
    'app.welcomeDesc': 'Divide tus metas en tareas enfocadas. Empieza creando tu primera tarea.',
    'app.createFirst': 'Crear tu primera tarea',
    'app.taskNotFound': 'Tarea no encontrada',
    'app.goBack': 'Volver',
    'block.text': 'Texto',
    'block.image': 'Imagen',
    'block.table': 'Tabla',
    'block.drawing': 'Dibujo',
    'block.addBlock': 'Añadir bloque',
    'block.deleteBlock': 'Eliminar bloque',
    'block.typeSomething': 'Escribe algo…',
    'block.clickToUpload': 'Haz clic para subir una imagen',
    'block.saveDrawing': 'Guardar dibujo',
    'block.clear': 'Limpiar',
    'task.open': 'Abrir tarea',
    'task.addSubtask': 'Añadir subtarea',
    'task.deleteTask': 'Eliminar tarea',
    'task.whatToAccomplish': '¿Qué quieres lograr?',
    'task.addNotes': 'Añade notas, detalles o ideas…',
    'task.startWithName': 'Empieza dando un nombre a tu tarea',
    'task.addTask': 'Añadir tarea',
    'task.cancel': 'Cancelar',
    'task.blocks': 'Bloques',
    'task.addBlock': 'Añadir bloque',
    'table.addColumn': 'Añadir columna',
    'table.addRow': 'Añadir fila',
    'table.deleteColumn': 'Eliminar columna',
    'table.deleteRow': 'Eliminar fila',
    'ai.improve': 'Mejorar texto',
    'ai.split': 'Dividir en subtareas',
    'ai.processing': 'La IA está pensando…',
    'ai.apply': 'Aplicar',
    'ai.cancel': 'Cancelar',
    'ai.error': 'Error de IA. Revisa tu clave API en Ajustes.',
    'ai.noKey': 'Configura la clave API de IA en Ajustes',
    'ai.apiKey': 'Clave API de IA',
    'ai.apiKeyPlaceholder': 'Introduce tu clave de Groq API',
    'ai.apiKeyHint': 'Obtén una clave gratis en console.groq.com',
    'ai.structure': 'Estructurar como lista',
    'ai.describe': 'Describir imagen',
    'ai.suggest': 'Sugerir mejoras',
    'ai.explain': 'Explicar en lenguaje simple',
    'ai.improveTable': 'Mejorar estructura',
    'ai.assist': 'Asistencia IA',
    'ai.comingSoon': 'Próximamente',
    'search.placeholder': 'Buscar tareas\u2026',
    'search.noResults': 'No se encontraron resultados',
    'filter.all': 'Todas',
    'filter.active': 'Activas',
    'filter.completed': 'Completadas',
  },
  zh: {
    'app.allTasks': '所有任务',
    'app.task': '任务',
    'app.tasks': '个任务',
    'app.noTasks': '暂无任务',
    'app.createOne': '创建一个',
    'app.newTask': '新任务',
    'app.settings': '设置',
    'app.theme': '主题',
    'app.light': '浅色',
    'app.dark': '深色',
    'app.language': '语言',
    'app.selectTask': '选择任务',
    'app.welcome': '欢迎使用 Focus',
    'app.selectHint': '从侧边栏选择一个任务查看详情，或创建一个新任务。',
    'app.welcomeDesc': '将你的目标分解为聚焦的任务。从创建第一个任务开始。',
    'app.createFirst': '创建第一个任务',
    'app.taskNotFound': '任务未找到',
    'app.goBack': '返回',
    'block.text': '文本',
    'block.image': '图片',
    'block.table': '表格',
    'block.drawing': '绘图',
    'block.addBlock': '添加块',
    'block.deleteBlock': '删除块',
    'block.typeSomething': '输入内容…',
    'block.clickToUpload': '点击上传图片',
    'block.saveDrawing': '保存绘图',
    'block.clear': '清除',
    'task.open': '打开任务',
    'task.addSubtask': '添加子任务',
    'task.deleteTask': '删除任务',
    'task.whatToAccomplish': '你想完成什么？',
    'task.addNotes': '添加笔记、详情或想法…',
    'task.startWithName': '请先在上方输入任务名称',
    'task.addTask': '添加任务',
    'task.cancel': '取消',
    'task.blocks': '区块',
    'task.addBlock': '添加区块',
    'table.addColumn': '添加列',
    'table.addRow': '添加行',
    'table.deleteColumn': '删除列',
    'table.deleteRow': '删除行',
    'ai.improve': '改进文本',
    'ai.split': '拆分为子任务',
    'ai.processing': 'AI 正在思考…',
    'ai.apply': '应用',
    'ai.cancel': '取消',
    'ai.error': 'AI 请求失败。请在设置中检查 API 密钥。',
    'ai.noKey': '请在设置中配置 AI API 密钥',
    'ai.apiKey': 'AI API 密钥',
    'ai.apiKeyPlaceholder': '输入你的 Groq API 密钥',
    'ai.apiKeyHint': '在 console.groq.com 免费获取密钥',
    'ai.structure': '结构化为列表',
    'ai.describe': '描述图片',
    'ai.suggest': '建议改进',
    'ai.explain': '用简单语言解释',
    'ai.improveTable': '改进结构',
    'ai.assist': 'AI 辅助',
    'ai.comingSoon': '即将推出',
    'search.placeholder': '搜索任务\u2026',
    'search.noResults': '未找到结果',
    'filter.all': '全部',
    'filter.active': '进行中',
    'filter.completed': '已完成',
  },
}

export default dict
