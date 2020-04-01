import Vue from 'vue'

class Store extends Vue {
  /* eslint-disable no-useless-constructor */
  constructor ({context, formParamsAttrName = 'formModel', data, ajax = {method: 'GET'}, local = false, autoload = true, pageSize = 20, current = 1}) {
    super({
      data: {
        rows: data ? data.slice(0, pageSize) : [], // 实际要展示的列表数据,
        _rows: data || [], // 做缓存，适配本地分页
        response: null, // 请求返回的数据
        pageConf: {
          total: data ? data.length : 0,
          pageSize,
          current
        }
      }
    })
    this.context = context // 当前的组件
    this.formParamsAttrName = formParamsAttrName.split('.') // 从context中获取相应的form数据
    this.data = data // 如果配置了这个，默认是本地数据本地分页，不进行远程请求，有这个配置就没有ajax配置
    this.ajax = ajax // 远程请求配置
    this.local = local // 如果是本地分页
    this.autoload = autoload // 是否自动请求
    this.attachEvents()
    if (!this.data && this.autoload) {
      this.search()
    }
  }

  attachEvents () {
    this.$on('page-size-change', this.handlePageSizeChange)
    this.$on('page-change', this.handlePageChange)
  }

  handlePageSizeChange (pageSize) {
    this.pageConf.pageSize = pageSize
    this.pageConf.current = 1
    this.load()
  }

  handlePageChange (page) {
    this.pageConf.current = page
    this.load()
  }

  transformResponse (data) {
    this.$emit('after-search')
    return data
  }

  load () {
    if (this.local || this.data) {
      this.setRows(this._rows)
    } else {
      this.search()
    }
  }

  search (params = {}) {
    let data = Object.assign({}, this.getFormParams(), params, this.getPageParams(this.pageConf.current, this.pageConf.pageSize))
    this.$emit('before-search', data)
    Vue.$http({
      ...this.ajax,
      [!this.ajax.method || this.ajax.method.toUpperCase() === 'GET' ? 'params' : 'data']: data,
      transformResponse: [this.transformResponse.bind(this)]
    }).then(response => {
      response = JSON.parse(response).data
      this.pageConf.total = response.total
      this._rows = response.rows
      this.setRows(response.rows)
      this.$emit('search-success', response)
    })
  }

  setRows (rows) {
    this.rows = this.local || this.data ? rows.slice((this.pageConf.current - 1) * this.pageConf.pageSize, this.pageConf.pageSize) : rows
  }

  getFormParams () {
    let params = this.context
    this.formParamsAttrName.forEach(name => {
      params = params[name]
    })
    return params
  }

  getPageParams (current, pageSize) {
    return {
      start: (current - 1) * pageSize,
      limit: current * pageSize
    }
  }
}

export default Store
