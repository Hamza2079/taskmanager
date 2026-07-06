// ─── Status ───────────────────────────────────────────────────────────────────
export const STATUS = {
  PENDING:     'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED:   'completed',
};

export const STATUS_LABELS = {
  [STATUS.PENDING]:     'قيد الانتظار',
  [STATUS.IN_PROGRESS]: 'قيد التنفيذ',
  [STATUS.COMPLETED]:   'مكتملة',
};

export const STATUS_OPTIONS = [
  { value: STATUS.PENDING,     label: 'قيد الانتظار' },
  { value: STATUS.IN_PROGRESS, label: 'قيد التنفيذ' },
  { value: STATUS.COMPLETED,   label: 'مكتملة' },
];

// ─── Priority ─────────────────────────────────────────────────────────────────
export const PRIORITY = {
  LOW:    'low',
  MEDIUM: 'medium',
  HIGH:   'high',
};

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]:    'منخفضة',
  [PRIORITY.MEDIUM]: 'متوسطة',
  [PRIORITY.HIGH]:   'عالية',
};

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW,    label: 'منخفضة' },
  { value: PRIORITY.MEDIUM, label: 'متوسطة' },
  { value: PRIORITY.HIGH,   label: 'عالية' },
];

// ─── Sort ─────────────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: 'newest',   label: 'الأحدث أولاً' },
  { value: 'oldest',   label: 'الأقدم أولاً' },
  { value: 'title',    label: 'العنوان أ–ي' },
  { value: 'priority', label: 'الأولوية' },
];

// ─── View ─────────────────────────────────────────────────────────────────────
export const VIEW = {
  CARD:  'card',
  TABLE: 'table',
};

// ─── Pagination ───────────────────────────────────────────────────────────────
export const TASKS_PER_PAGE = 9;

// ─── Local Storage Keys ───────────────────────────────────────────────────────
export const LS_KEYS = {
  TASKS: 'taskmanager_tasks',
  THEME: 'taskmanager_theme',
  VIEW:  'taskmanager_view',
};

// ─── API ──────────────────────────────────────────────────────────────────────
export const DUMMYJSON_BASE = 'https://dummyjson.com';

// ─── Arabic Strings ───────────────────────────────────────────────────────────
export const AR = {
  appName:           'TaskFlow',
  appTagline:        'مدير المهام الذكي',
  dashboard:         'لوحة التحكم',
  tasks:             'المهام',
  addTask:           'إضافة مهمة',
  editTask:          'تعديل المهمة',
  deleteTask:        'حذف المهمة',
  search:            'البحث في المهام...',
  filter:            'تصفية',
  sort:              'ترتيب',
  all:               'الكل',
  status:            'الحالة',
  priority:          'الأولوية',
  title:             'العنوان',
  description:       'الوصف',
  createdAt:         'تاريخ الإنشاء',
  actions:           'الإجراءات',
  save:              'حفظ',
  cancel:            'إلغاء',
  delete:            'حذف',
  edit:              'تعديل',
  confirm:           'تأكيد',
  loading:           'جارٍ التحميل...',
  noTasks:           'لا توجد مهام',
  noTasksDesc:       'ابدأ بإضافة مهمتك الأولى الآن',
  noResults:         'لا توجد نتائج',
  noResultsDesc:     'لم يتم العثور على مهام تطابق بحثك',
  deleteConfirm:     'هل أنت متأكد من حذف هذه المهمة؟',
  deleteConfirmDesc: 'لا يمكن التراجع عن هذه العملية.',
  error:             'حدث خطأ',
  retry:             'إعادة المحاولة',
  titleRequired:     'العنوان مطلوب',
  descRequired:      'الوصف مطلوب',
  titleMin:          'العنوان يجب أن يكون 3 أحرف على الأقل',
  descMin:           'الوصف يجب أن يكون 10 أحرف على الأقل',
  taskAdded:         'تمت إضافة المهمة بنجاح',
  taskUpdated:       'تم تحديث المهمة بنجاح',
  taskDeleted:       'تم حذف المهمة بنجاح',
  totalTasks:        'إجمالي المهام',
  pendingTasks:      'قيد الانتظار',
  inProgressTasks:   'قيد التنفيذ',
  completedTasks:    'مكتملة',
  highPriority:      'أولوية عالية',
  viewCard:          'عرض البطاقات',
  viewTable:         'عرض الجدول',
  cardView:          'بطاقات',
  tableView:         'جدول',
  page:              'صفحة',
  of:                'من',
  previous:          'السابق',
  next:              'التالي',
  settings:          'الإعدادات',
  logout:            'تسجيل الخروج',
  profile:           'الملف الشخصي',
  welcome:           'مرحباً بعودتك',
  loginTitle:        'تسجيل الدخول',
  loginSubtitle:     'مرحباً بك! سجّل دخولك للمتابعة',
  email:             'البريد الإلكتروني',
  password:          'كلمة المرور',
  rememberMe:        'تذكرني',
  forgotPassword:    'نسيت كلمة المرور؟',
  loginBtn:          'تسجيل الدخول',
  emailPlaceholder:  'أدخل بريدك الإلكتروني',
  passwordPlaceholder:'أدخل كلمة المرور',
  emailRequired:     'البريد الإلكتروني مطلوب',
  emailInvalid:      'بريد إلكتروني غير صحيح',
  passwordRequired:  'كلمة المرور مطلوبة',
  passwordMin:       'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
  reset:             'إعادة ضبط',
  resetData:         'إعادة تحميل البيانات',
  selectStatus:      'اختر الحالة',
  selectPriority:    'اختر الأولوية',
  selectSort:        'الترتيب',
  filterStatus:      'تصفية حسب الحالة',
  filterPriority:    'تصفية حسب الأولوية',
  task:              'مهمة',
  tasks_count:       'مهام',
  completionRate:    'معدل الإنجاز',
  overview:          'نظرة عامة',
};
