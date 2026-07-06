import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { LS_KEYS } from '../data/constants';
import { fetchTasks } from '../services/taskService';
import { generateId } from '../utils/helpers';

const TaskContext = createContext(null);

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':   return { ...state, tasks: action.payload, loading: false, error: null };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR':   return { ...state, error: action.payload, loading: false };
    case 'ADD_TASK':    return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK': return {
      ...state,
      tasks: state.tasks.map((t) => t.id === action.payload.id ? { ...t, ...action.payload } : t),
    };
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    default:            return state;
  }
};

const initialState = { tasks: [], loading: true, error: null };

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const loadFromAPI = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tasks = await fetchTasks();
      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'فشل تحميل المهام. يرجى المحاولة مجدداً.' });
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEYS.TASKS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'SET_TASKS', payload: parsed });
          return;
        }
      } catch (_) { /* ignore */ }
    }
    loadFromAPI();
  }, [loadFromAPI]);

  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem(LS_KEYS.TASKS, JSON.stringify(state.tasks));
    }
  }, [state.tasks, state.loading]);

  const addTask = useCallback((data) => {
    const task = {
      id:          generateId(),
      title:       data.title.trim(),
      description: data.description.trim(),
      status:      data.status,
      priority:    data.priority,
      createdAt:   new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: task });
    return task;
  }, []);

  const updateTask = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, ...data } });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const resetTasks = useCallback(async () => {
    localStorage.removeItem(LS_KEYS.TASKS);
    await loadFromAPI();
  }, [loadFromAPI]);

  return (
    <TaskContext.Provider value={{ ...state, addTask, updateTask, deleteTask, resetTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider');
  return ctx;
};
