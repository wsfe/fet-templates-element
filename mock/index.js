import MockAjax from 'mockajax'
import faker from 'faker'

MockAjax.mock([
  {
    url: '/api/login',
    response (req) {
      req.headers = Object.assign(req.headers || {}, {
        Authorization: faker.random.uuid()
      })
      return {
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: faker.lorem.words(1)[0]
      }
    }
  }
])
