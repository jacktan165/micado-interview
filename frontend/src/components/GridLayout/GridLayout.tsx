import ReactGridLayout, {
  WidthProvider,
  Responsive,
  ResponsiveProps,
} from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export type Layouts = ReactGridLayout.Layouts;

export type GridLayoutProps = ResponsiveProps;

const ResponseGridLayout = WidthProvider(Responsive);

const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  ...otherGridLayoutProps
}) => {
  return (
    <ResponseGridLayout {...otherGridLayoutProps}>
      {children}
    </ResponseGridLayout>
  );
};

export default GridLayout;
