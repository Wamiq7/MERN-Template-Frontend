import { ReactQueryProvider } from "./react-query-provider";
import { ReduxProvider } from "./redux-proivder";
import { ThemeProvider } from "./theme-provider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <>{children}</>
        </ThemeProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
};
