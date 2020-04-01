<template>
  <Table
    v-bind="tableProps"
    :loading="loading"
    :data="store.rows"
    ref="table">
    <div slot="header">
      <slot name="header"></slot>
    </div>
    <div slot="footer">
      <slot name="footer"></slot>
      <div class="page-wrapper">
        <Page
          :total="store.pageConf.total"
          :current="store.pageConf.current"
          v-bind="pageProps"
          :page-size="store.pageConf.pageSize"
          ref="page"
          @on-page-size-change="handlePageSizeChange" @on-change="handlePageChange"></Page>
      </div>
    </div>
  </Table>
</template>

<script>
const TABLE_EVENTS = ['on-current-change', 'on-select', 'on-select-cancel', 'on-select-all', 'on-selection-change', 'on-sort-change', 'on-filter-change', 'on-row-click', 'on-row-dblclick', 'on-expand']
export default {
  props: {
    store: {
      type: Object,
      required: true
    },
    table: {
      type: Object,
      default () {
        return {}
      }
    },
    page: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.bindStoreEvents()
  },
  mounted () {
    this.extendTableEvents()
  },
  computed: {
    pageProps () {
      return Object.assign({
        'size': 'small',
        'show-total': true,
        'show-elevator': true,
        'show-sizer': true,
        'page-size-opts': [20, 40, 60, 100]
      }, this.page)
    },
    tableProps () {
      return Object.assign({
        size: 'small'
      }, this.table)
    }
  },
  methods: {
    handleBeforeSearch () {
      this.loading = true
    },
    handleAfterSearch () {
      this.loading = false
    },
    bindStoreEvents () {
      this.store.$on('before-search', this.handleBeforeSearch)
      this.store.$on('after-search', this.handleAfterSearch)
    },
    handlePageSizeChange (pageSize) {
      this.store.$emit('page-size-change', pageSize)
    },
    handlePageChange (page) {
      this.store.$emit('page-change', page)
    },
    extendTableEvents () {
      TABLE_EVENTS.forEach(eventName => {
        this.$refs.table.$on(eventName, (...args) => {
          args.unshift(eventName)
          this.$emit.apply(this, args)
        })
      })
    },
    exportCsv (...args) {
      this.$refs.table.exportCsv(...args)
    },
    clearCurrentRow (...args) {
      this.$refs.table.clearCurrentRow(...args)
    }
  },
  beforeDestroy () {
    this.store.$off()
  }
}
</script>

<style scoped>
  .page-wrapper {
    float: right;
    padding-top: 20px;
    padding-bottom: 30px;
  }
</style>
