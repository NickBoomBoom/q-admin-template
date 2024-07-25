import { Subject } from "rxjs"

class GlobalService {
  $refresh = new Subject<void>()
  $closeTag = new Subject<string>()
  $closeAllTag = new Subject<void>()
  $pageScroll = new Subject<PageScroll>()
}

export const globalService = new GlobalService()