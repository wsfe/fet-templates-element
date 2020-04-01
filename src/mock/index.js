import MockAjax from 'mockajax'
import faker from 'faker'

MockAjax.mock([
  {
    url: '/common/userInfo',
    response (req) {
      return {
        userName: faker.lorem.words(1)[0]
      }
    }
  }
])
