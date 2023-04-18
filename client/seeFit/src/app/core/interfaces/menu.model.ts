export interface MenuData {
  title: string;
  url?: string;
  icon?: string;
  subMenu?: Array<SubMenuData>;
}

export interface SubMenuData {
  title: string;
  url?: string;
  icon?: string;
}
