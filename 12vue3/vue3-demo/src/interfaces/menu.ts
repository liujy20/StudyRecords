export interface IMenu {
  children?: IMenu[];
  component: string;
  icon: string;
  meta: {
    closeable: boolean;
  };
  name: string;
  path: string;
}
