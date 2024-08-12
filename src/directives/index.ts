import { height } from './height'
export default {
  install(app: any) {
    app.directive('height', height)
  }
}
