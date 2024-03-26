import { Link, Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Outlet />
    </div>
  );
};

export default Main;
