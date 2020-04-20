import _ from 'lodash'

const getters = {
  sidebar: state => _.cloneDeep(state.app.sidebar),
  size: state => _.cloneDeep(state.app.size),
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => _.cloneDeep(state.user.avatar),
  name: state => _.cloneDeep(state.user.name),
  introduction: state => _.cloneDeep(state.user.introduction),
  permission_routes: state => _.cloneDeep(state.permission.routes),
  errorLogs: state => _.cloneDeep(state.errorLog.logs)
}
export default getters
