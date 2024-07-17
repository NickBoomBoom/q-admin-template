import { Subject } from "rxjs"

class BusService {
  $refresh = new Subject<void>()
  $closeTag = new Subject<string>()
  $closeAllTag = new Subject<void>()
}

export const busService = new BusService()