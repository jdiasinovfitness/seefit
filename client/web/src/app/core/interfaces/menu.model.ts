export interface MenuData {
  title: string;
  url?: string;
  icon?: string;
  subMenu?: Array<SubMenuData>;
  active?: boolean;
  disabled: boolean;
}

export interface SubMenuData {
  title: string;
  url?: string;
  icon?: string;
}
