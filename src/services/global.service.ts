import mitt from "mitt";

export type MittEvents = {
  refresh: void;
  closeTag: string;
  closeAllTag: void;
  pageScroll: PageScroll;
};

export const globalEventBus = mitt<MittEvents>();
