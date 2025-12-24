export interface MenuItem {
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string;
    count?: number;
  };
  children?: MenuItem[];
}

export const MENUS: MenuItem[] = [
  {
    path: "dashboard",
    name: "Dashboard",
    meta: {
      title: "Dashboard",
      icon: "i-material-symbols-dashboard",
      count: 11,
    },
  },
  {
    path: "panel",
    name: "Panel",
    meta: {
      title: "Panel",
      icon: "i-material-symbols-space-dashboard-sharp",
      count: 11,
    },
    children: [
      {
        path: "index",
        name: "PanelIndex",
        meta: {
          title: "总面板",
          icon: "i-material-symbols-cards",
          count: 11,
        },
      },
      {
        path: "one",
        name: "PanelOne",
        meta: {
          title: "面板一",
          icon: "i-material-symbols-calendar-today",
          count: 11,
        },
      },
      {
        path: "two",
        name: "PanelTwo",
        meta: {
          title: "面板二",
          icon: "i-material-symbols-sentiment-calm-outline-rounded",
        },
      },
    ],
  },
  {
    path: "table",
    name: "Table",
    meta: {
      title: "Table",
      icon: "i-material-symbols-table-chart-view",
    },
  },
  {
    path: "https://www.google.com",
    name: "外链",
    meta: {
      title: "Google",
      icon: "i-material-symbols-attach-file-rounded",
    },
  },
];
