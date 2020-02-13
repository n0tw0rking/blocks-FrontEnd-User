import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/",
    title: "Main    ",
    icon: "mdi mdi-home",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/services",
    title: "Services",
    icon: "mdi mdi-image-filter-vintage",
    class: "",
    extralink: false,
    submenu: []
  },
  {
    path: "/blocks",
    title: "Blocks",
    icon: "mdi mdi-bandcamp",
    class: "",
    extralink: false,
    submenu: [
      {
        path: "/blocks/add",
        title: "Add Block",
        icon: "mdi mdi-bandcamp",
        class: "",
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: "/user",
    title: "Users",
    icon: "ngbDropdownToggle",
    class: "",
    extralink: false,
    submenu: [      
      {
        path: "/user/add",
        title: "Add User",
        icon: "mdi mdi-sort-variant",
        class: "",
        extralink: false,
        submenu: []
      },
      {
        path: "/user/balance",
        title: "Balance",
        icon: "mdi mdi-sort-variant",
        class: "",
        extralink: false,
        submenu: []
      }
    ]
  }
];
