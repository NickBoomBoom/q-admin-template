import { Subject } from "rxjs"

class BusService {

  $refresh = new Subject()

}

export const busService = new BusService()