import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useToHome from '../../hooks/useToHome';
const Main: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  useToHome();
  return (
    <div className="flex flex-col gap-4">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          timeout={500}
          classNames="layout-main-page"
        >
          {currentOutlet}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Main;
