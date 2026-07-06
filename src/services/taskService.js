import axios from 'axios';
import { DUMMYJSON_BASE } from '../data/constants';

const api = axios.create({ baseURL: DUMMYJSON_BASE, timeout: 8000 });

/**
 * Fetch todos from DummyJSON and map them to our Arabic Task model.
 * DummyJSON /todos: { todos: [{id, todo, completed, userId}], total, skip, limit }
 */
export const fetchTasks = async () => {
  const { data } = await api.get('/todos?limit=30');
  return data.todos.map(mapTodoToTask);
};

// ─── Arabic sample descriptions ───────────────────────────────────────────────
const AR_DESCRIPTIONS = [
  'إكمال هذه المهمة يساهم في تحقيق أهداف الفريق للربع الحالي.',
  'مراجعة جميع جوانب العمل والتأكد من اكتمالها وفق المعايير المطلوبة.',
  'التنسيق مع الفريق لضمان التسليم في الوقت المحدد.',
  'توثيق النتائج والخطوات المتخذة لمتابعة التقدم.',
  'اختبار الحل المقترح والتحقق من صحة المخرجات قبل التسليم.',
  'تحليل المتطلبات وبناء خطة عمل واضحة لإنجاز المهمة.',
  'متابعة تحديثات المشروع وضمان التوافق مع الجدول الزمني.',
  'إعداد تقرير مفصّل عن مراحل التنفيذ والنتائج المحققة.',
];

// ─── Mapper ───────────────────────────────────────────────────────────────────
const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES   = ['pending', 'in-progress', 'completed'];

const mapTodoToTask = (todo) => ({
  id:          `api_${todo.id}`,
  title:       todo.todo,
  description: AR_DESCRIPTIONS[todo.id % AR_DESCRIPTIONS.length],
  status:      todo.completed ? 'completed' : STATUSES[todo.id % 2],
  priority:    PRIORITIES[todo.id % 3],
  createdAt:   new Date(Date.now() - todo.id * 86_400_000).toISOString(),
  userId:      todo.userId,
});
