import { useState, useMemo, useCallback } from 'react';
import { Plus, LayoutGrid, Table2, SlidersHorizontal, X } from 'lucide-react';

import { useTasks }   from '../hooks/useTasks';
import { useToast }   from '../hooks/useToast';
import {
  AR, STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS, TASKS_PER_PAGE, VIEW,
} from '../data/constants';
import {
  filterTasks, sortTasks, paginate, computeStats, totalPages,
} from '../utils/helpers';

import StatsCards from '../components/StatsCards';
import TaskCard   from '../components/TaskCard';
import TaskTable  from '../components/TaskTable';
import SearchBar  from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader     from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Modal, { ConfirmModal } from '../components/Modal';
import TaskForm   from '../components/TaskForm';
import { Button } from '../components/ui';

const DashboardPage = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const toast = useToast();

  const [view,            setView]           = useState(VIEW.CARD);
  const [query,           setQuery]          = useState('');
  const [filterStatus,    setFilterStatus]   = useState('');
  const [filterPriority,  setFilterPriority] = useState('');
  const [sortBy,          setSortBy]         = useState('newest');
  const [page,            setPage]           = useState(1);
  const [showFilters,     setShowFilters]    = useState(false);

  const [addModal,    setAddModal]    = useState(false);
  const [editModal,   setEditModal]   = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const filtered = useMemo(
    () => filterTasks(tasks, { query, status: filterStatus, priority: filterPriority }),
    [tasks, query, filterStatus, filterPriority],
  );
  const sorted = useMemo(() => sortTasks(filtered, sortBy), [filtered, sortBy]);
  const pages  = useMemo(() => totalPages(sorted.length, TASKS_PER_PAGE), [sorted.length]);
  const paged  = useMemo(() => paginate(sorted, page, TASKS_PER_PAGE), [sorted, page]);
  const stats  = useMemo(() => computeStats(tasks), [tasks]);
  const isFiltered = !!query || !!filterStatus || !!filterPriority;

  const handleQuery    = useCallback((v) => { setQuery(v);                    setPage(1); }, []);
  const handleStatus   = useCallback((e) => { setFilterStatus(e.target.value);  setPage(1); }, []);
  const handlePriority = useCallback((e) => { setFilterPriority(e.target.value); setPage(1); }, []);
  const handleSort     = useCallback((e) => { setSortBy(e.target.value);       setPage(1); }, []);

  const clearFilters = () => {
    setQuery(''); setFilterStatus(''); setFilterPriority(''); setSortBy('newest'); setPage(1);
  };

  const handleAdd = useCallback(async (data) => {
    setFormLoading(true);
    await delay(400);
    addTask(data);
    toast.success(AR.taskAdded);
    setAddModal(false);
    setFormLoading(false);
  }, [addTask, toast]);

  const handleEdit = useCallback(async (data) => {
    setFormLoading(true);
    await delay(400);
    updateTask(editModal.id, data);
    toast.success(AR.taskUpdated);
    setEditModal(null);
    setFormLoading(false);
  }, [editModal, updateTask, toast]);

  const handleDelete = useCallback(async () => {
    setFormLoading(true);
    await delay(400);
    deleteTask(deleteModal.id);
    toast.success(AR.taskDeleted);
    setDeleteModal(null);
    setFormLoading(false);
  }, [deleteModal, deleteTask, toast]);

  if (loading) return <Loader fullscreen />;
  if (error)   return (
    <div className="flex flex-col items-center justify-center h-64 gap-6">
      <p className="text-red-600 font-bold text-base">{error}</p>
      <Button variant="secondary" onClick={clearFilters}>{AR.retry}</Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">

      {/* ── Stats ── */}
      <StatsCards stats={stats} tasks={tasks} />

      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-4">

        {/* Row 1: search + buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={query} onChange={handleQuery} />

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(p => !p)}
            className={`
              flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold
              border transition-all cursor-pointer shrink-0 select-none
              ${showFilters
                ? 'bg-figma-primary/10 border-figma-primary/30 text-figma-primary'
                : 'bg-figma-card border-figma-border/40 text-figma-muted hover:border-figma-border hover:text-figma-text'}
            `}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">{AR.filter}</span>
          </button>

          {/* View toggle */}
          <div className="flex items-center bg-figma-card border border-figma-border/40 rounded-xl p-1.5 gap-1">
            <ViewBtn active={view === VIEW.CARD}  onClick={() => setView(VIEW.CARD)}  icon={LayoutGrid} title={AR.cardView} />
            <ViewBtn active={view === VIEW.TABLE} onClick={() => setView(VIEW.TABLE)} icon={Table2}     title={AR.tableView} />
          </div>

          {/* Add task */}
          <Button icon={Plus} onClick={() => setAddModal(true)} size="md" className="shrink-0">
            <span className="hidden sm:inline">{AR.addTask}</span>
          </Button>
        </div>

        {/* Row 2: filters panel */}
        {showFilters && (
          <div className="flex items-end gap-4 flex-wrap p-5 bg-figma-panel rounded-2xl
                          border border-figma-border/20 shadow-sm shadow-figma-border/5">
            <SelectField
              label={AR.status}
              value={filterStatus}
              onChange={handleStatus}
              options={STATUS_OPTIONS}
              placeholder={AR.all}
            />
            <SelectField
              label={AR.priority}
              value={filterPriority}
              onChange={handlePriority}
              options={PRIORITY_OPTIONS}
              placeholder={AR.all}
            />
            <SelectField
              label={AR.sort}
              value={sortBy}
              onChange={handleSort}
              options={SORT_OPTIONS}
            />
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold
                           text-figma-muted hover:text-figma-primary hover:bg-figma-secondary/10 transition-all cursor-pointer"
              >
                <X size={14} /> {AR.reset}
              </button>
            )}
          </div>
        )}

        {/* Active filter chips */}
        {isFiltered && !showFilters && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs text-figma-muted font-bold">{AR.filter}:</span>
            {query && <Chip label={`"${query}"`} onRemove={() => handleQuery('')} />}
            {filterStatus   && <Chip label={STATUS_OPTIONS.find(o => o.value === filterStatus)?.label}    onRemove={() => { setFilterStatus('');   setPage(1); }} />}
            {filterPriority && <Chip label={PRIORITY_OPTIONS.find(o => o.value === filterPriority)?.label} onRemove={() => { setFilterPriority(''); setPage(1); }} />}
          </div>
        )}
      </div>

      {/* ── Result count ── */}
      {sorted.length > 0 && (
        <p className="text-sm text-figma-muted font-semibold">
          عرض <span className="text-figma-primary font-black">{paged.length}</span> من{' '}
          <span className="text-figma-primary font-black">{sorted.length}</span> {AR.tasks_count}
        </p>
      )}

      {/* ── Task list ── */}
      {paged.length === 0 ? (
        <EmptyState onAdd={() => setAddModal(true)} filtered={isFiltered} />
      ) : view === VIEW.CARD ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {paged.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t)   => setEditModal(t)}
              onDelete={(t) => setDeleteModal(t)}
            />
          ))}
        </div>
      ) : (
        <TaskTable
          tasks={paged}
          onEdit={(t)   => setEditModal(t)}
          onDelete={(t) => setDeleteModal(t)}
        />
      )}

      {/* ── Pagination ── */}
      <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />

      {/* ── Modals ── */}
      <Modal isOpen={addModal}    onClose={() => setAddModal(false)}  title={AR.addTask}>
        <TaskForm onSubmit={handleAdd}  onCancel={() => setAddModal(false)}  loading={formLoading} />
      </Modal>
      <Modal isOpen={!!editModal} onClose={() => setEditModal(null)}  title={AR.editTask}>
        <TaskForm onSubmit={handleEdit} onCancel={() => setEditModal(null)}  loading={formLoading} initialData={editModal} />
      </Modal>
      <ConfirmModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        title={AR.deleteTask}
        description={AR.deleteConfirmDesc}
        confirmLabel={AR.delete}
        loading={formLoading}
      />
    </div>
  );
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const ViewBtn = ({ active, onClick, icon: Icon, title }) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-lg transition-all cursor-pointer
      ${active
        ? 'bg-figma-primary text-white shadow-md shadow-figma-primary/20'
        : 'text-figma-muted hover:text-figma-text hover:bg-figma-secondary/10'}`}
    title={title}
  >
    <Icon size={16} />
  </button>
);

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div className="flex flex-col gap-2 min-w-36">
    <label className="text-xs font-bold text-figma-muted uppercase tracking-wide">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="bg-figma-card border border-figma-border/40 rounded-xl px-4 py-3 text-figma-text
                 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-figma-primary/30
                 hover:border-figma-border transition-all"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-figma-card">{o.label}</option>
      ))}
    </select>
  </div>
);

const Chip = ({ label, onRemove }) => (
  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-figma-primary/10
                   border border-figma-primary/20 text-figma-primary text-xs font-bold">
    {label}
    <button onClick={onRemove} className="hover:text-figma-secondary transition-colors cursor-pointer">
      <X size={11} />
    </button>
  </span>
);

export default DashboardPage;
