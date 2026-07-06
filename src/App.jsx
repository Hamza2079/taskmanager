import AppRouter           from './routes/AppRouter';
import { TaskProvider }    from './hooks/useTasks';
import { ToastProvider }   from './hooks/useToast';

const App = () => (
  <ToastProvider>
    <TaskProvider>
      <AppRouter />
    </TaskProvider>
  </ToastProvider>
);

export default App;
