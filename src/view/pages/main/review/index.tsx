import CodeHeighlighter from '../../../components/CodeHighlighter';
import { selectUnikey } from '../../../features/unikeySlice';
import { useAppSelector } from '../../../hooks';
import ReviewForm from './components/ReviewForm';

const App: React.FC = () => {
  const unikey = useAppSelector(selectUnikey);
  return (
    <div className="flex flex-col gap-4">
      <CodeHeighlighter hoverable bordered={false} code={unikey} />
      <ReviewForm />
    </div>
  );
};

export default App;
