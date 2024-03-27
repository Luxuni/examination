import { Link, Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
const Main: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <SwitchTransition mode="out-in">
        <CSSTransition key={location.pathname} timeout={200} classNames="fade">
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Main;
