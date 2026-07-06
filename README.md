# TaskFlow — مدير المهام الذكي 🚀

> **نظام إدارة مهام احترافي** مبني بـ React + Vite + Tailwind CSS، يدعم اللغة العربية والتصميم RTL بالكامل.

---

## 📸 نظرة عامة

TaskFlow هو تطبيق ويب حديث لإدارة المهام يوفر تجربة مستخدم سلسة باللغة العربية مع تصميم داكن أنيق وميزات متقدمة.

---

## ✨ المميزات

- 🌐 **دعم كامل للغة العربية** — واجهة RTL بالكامل
- 🌙 **وضع داكن أنيق** — تصميم حديث ومريح للعين
- 📋 **إدارة المهام** — إضافة، تعديل، حذف مع تأكيد
- 🔍 **بحث فوري** — البحث في العنوان والوصف
- 🎛️ **فلترة متعددة** — حسب الحالة والأولوية
- 📊 **إحصائيات** — بطاقات إحصاء مع معدل الإنجاز
- 🃏 **عرضان** — بطاقات وجدول
- 📄 **ترقيم الصفحات** — 9 مهام لكل صفحة
- 🔔 **إشعارات Toast** — تأكيد جميع العمليات
- 💾 **LocalStorage** — حفظ البيانات محلياً
- 📱 **تجاوب كامل** — Desktop, Tablet, Mobile
- ⚡ **سريع** — مبني بـ Vite + React 19
- 🌐 **API** — يجلب البيانات من DummyJSON

---

## 🛠️ التقنيات

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| React | 19 | UI Framework |
| Vite | 8 | Build Tool |
| Tailwind CSS | 4 | Styling |
| React Router DOM | 7 | Routing |
| Axios | 1.x | HTTP Client |
| React Hook Form | 7 | Form Management |
| Lucide Icons | latest | Icons |

---

## 🚀 تشغيل المشروع محلياً

```bash
# 1. استنساخ المشروع
git clone https://github.com/username/taskflow.git
cd taskflow

# 2. تثبيت الحزم
npm install

# 3. تشغيل خادم التطوير
npm run dev

# 4. فتح المتصفح
# http://localhost:5173
```

---

## 📁 هيكل المشروع

```
src/
├── assets/                  # الصور والأيقونات
├── components/              # المكونات القابلة لإعادة الاستخدام
│   ├── ui.jsx               # Button, Input, Select, Badge
│   ├── Loader.jsx           # شاشة التحميل
│   ├── EmptyState.jsx       # حالة القائمة الفارغة
│   ├── Modal.jsx            # Modal + ConfirmModal
│   ├── SearchBar.jsx        # شريط البحث
│   ├── TaskForm.jsx         # نموذج إضافة/تعديل المهمة
│   ├── TaskCard.jsx         # بطاقة المهمة
│   ├── TaskTable.jsx        # جدول المهام
│   ├── StatsCards.jsx       # بطاقات الإحصائيات
│   ├── Pagination.jsx       # ترقيم الصفحات
│   ├── Sidebar.jsx          # الشريط الجانبي
│   └── Navbar.jsx           # شريط التنقل العلوي
├── data/
│   └── constants.js         # الثوابت والنصوص العربية
├── hooks/
│   ├── useTasks.jsx         # Context + Reducer للمهام
│   └── useToast.jsx         # نظام الإشعارات
├── layouts/
│   └── DashboardLayout.jsx  # تخطيط لوحة التحكم
├── pages/
│   ├── LoginPage.jsx        # صفحة تسجيل الدخول
│   ├── DashboardPage.jsx    # صفحة لوحة التحكم
│   └── NotFoundPage.jsx     # صفحة 404
├── routes/
│   └── AppRouter.jsx        # مسارات التطبيق
├── services/
│   └── taskService.js       # طبقة API
├── utils/
│   └── helpers.js           # دوال مساعدة
├── App.jsx                  # المكون الجذري
├── main.jsx                 # نقطة الدخول
└── index.css                # التصميم العام
```

---

## 📝 اقتراحات Commits

```bash
git init
git add .
git commit -m "feat: initial project setup with Vite + React + Tailwind"

git commit -m "feat: add Arabic RTL support and Cairo font"
git commit -m "feat: create login page with form validation"
git commit -m "feat: implement dashboard layout with sidebar and navbar"
git commit -m "feat: add task CRUD operations (add, edit, delete)"
git commit -m "feat: integrate DummyJSON API with local state"
git commit -m "feat: implement search and multi-filter functionality"
git commit -m "feat: add card and table view toggle"
git commit -m "feat: add pagination and stats cards"
git commit -m "feat: implement toast notifications system"
git commit -m "feat: add LocalStorage persistence"
git commit -m "style: improve responsive design for mobile/tablet"
git commit -m "docs: add professional README"
```

---

## 🔑 بيانات تسجيل الدخول

> لا يوجد مصادقة حقيقية — أدخل أي بريد إلكتروني وكلمة مرور (6 أحرف+)

---

## 📊 نموذج بيانات المهمة

```js
{
  id:          "task_1234567_abc",
  title:       "عنوان المهمة",
  description: "وصف تفصيلي للمهمة",
  status:      "pending" | "in-progress" | "completed",
  priority:    "low" | "medium" | "high",
  createdAt:   "2024-01-15T10:30:00.000Z"
}
```

---

## 🌐 API المستخدمة

```
GET https://dummyjson.com/todos?limit=30
```

البيانات تُعيَّن إلى نموذج المهام المحلي مع إضافة وصف عربي.

---

## 📸 لقطات الشاشة

| الصفحة | الوصف |
|--------|-------|
| `/login` | صفحة تسجيل الدخول |
| `/dashboard` | لوحة التحكم الرئيسية |

---

<div align="center">
  صُنع بـ ❤️ للمطورين العرب
</div>
