import MockAjax from 'mockajax'
import faker from 'faker'

MockAjax.setBasePath('/api')

MockAjax.mock([
  {
    url: '/login',
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
  },
  {
    url: '/user',
    response (req) {
      return {
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: faker.lorem.words(1)[0]
      }
    }
  },
  {
    url: '/transaction/list',
    response (req) {
      const items = []
      for (let i = 0, len = 20; i < len; i++) {
        items.push({
          order_no: faker.random.uuid(),
          timestamp: faker.date.recent().getTime(),
          username: faker.name.findName(),
          price: faker.random.number(),
          status: ['success', 'pending'][faker.random.number(1)]
        })
      }
      return {
        code: 0,
        data: {
          total: 20,
          items
        }
      }
    }
  }
])
