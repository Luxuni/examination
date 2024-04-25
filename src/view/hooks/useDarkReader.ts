import { disable, enable, isEnabled } from 'darkreader';
import { useEffect } from 'react';

const useDarkReader = () => {
  useEffect(() => {
    const isDarkReader = isEnabled();
    if (!isDarkReader) {
      const body = document.querySelector('body');
      const theme = body?.getAttribute('data-vscode-theme-kind');
      if (theme === 'vscode-dark') {
        enable(
          {
            brightness: 100,
            contrast: 100,
            sepia: 10,
            darkSchemeBackgroundColor: '#0F0F0F',
          },
          
        );
      } else if (theme === 'vscode-light') {
        disable();
      }
    } else {
      disable();
    }
  }, []);
};

export default useDarkReader;
