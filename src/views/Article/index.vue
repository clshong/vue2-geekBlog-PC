<template>
  <div class="article">
    <!-- 筛选功能 -->
    <el-card class="box-card">
      <!-- 头部导航 -->
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/home' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!-- 底部内容管理 -->
      <el-form label-width="100px">
        <!-- 单选按钮组 -->
        <el-form-item label="状态:">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="频道:">
          <ChannelSelect :form="form"></ChannelSelect>
          <!-- <el-select placeholder="请选择" v-model="form.channel_id">
            <el-option
              v-for="item in channelList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期:">
          <el-date-picker
            v-model="form.picker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="filtrateArticle">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表信息 -->
    <el-card class="article_list">
      <!-- 头部信息 -->
      <template #header> 根据筛选条件共查询到{{ total }}条结果 </template>
      <!-- 文章列表信息 -->
      <el-table :data="articleList">
        <el-table-column label="封面">
          <template v-slot="scope">
            <img class="cover" :src="scope.row.cover.images[0]" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title"
          width="200"
        ></el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            {{ scope.row.status === 2 ? '审核通过' : '审核失败' }}
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="pubdate"
          width="200"
        ></el-table-column>
        <el-table-column label="阅读数" prop="read_count"></el-table-column>
        <el-table-column label="评论数" prop="comment_count"></el-table-column>
        <el-table-column label="点赞数" prop="like_count"></el-table-column>
        <el-table-column label="操作" width="200">
          <template v-slot="scope">
            <!-- <h3>{{ scope.$index }}</h3> -->
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delArticle(scope)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航组件 -->
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
        :page-size="form.per_page"
        :page-sizes="[1, 10, 20]"
        :current-page="form.page"
        @size-change="sizeChange"
        @current-change="pageChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getChannelList, getArticle } from '../../api/index'
export default {
  data () {
    return {
      form: {
        status: null, // 文章状态
        channel_id: '', // 不传是全部
        begin_pubdate: '', // 起始时间
        end_pubdate: '', // 截止时间
        page: 1, // 页码,默认为1页
        per_page: 10, // 每页数量.默认10
        picker: [] // [起始时间,结束时间]
      },
      total: 0,
      channelList: '',
      articleList: []
    }
  },
  async created () {
    const res = await getChannelList()
    // console.log(res)
    this.channelList = res.data.channels
    this.getData()
  },
  watch: {
    'form.picker': {
      handler (newVal) {
        // console.log(newVal)
        if (newVal.length === 2) {
          this.form.begin_pubdate = newVal[0]
          this.form.end_pubdate = newVal[1]
        }
      }
      // deep: true
    }
  },
  methods: {
    async getData () {
      const res = await getArticle(this.form)
      // console.log(res)
      this.articleList = res.data.results
      this.total = res.data.total_count
      // console.log(this.total)
    },
    filtrateArticle () {
      this.form.page = 1
      this.getData()
    },
    // look (value) {
    //   console.log(value)
    // },
    // 页码修改
    pageChange (page) {
      // 页码默认设置成第一页
      this.form.page = page
      this.getData()
    },
    // 页容量修改
    sizeChange (size) {
      this.form.per_page = size
      this.form.page = 1
      this.getData()
    },
    delArticle () {
      this.$confirm('是否删除改文章数据', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.article_list {
  margin-top: 30px;
  .cover {
    width: 50px;
  }
  ::v-deep .el-date-editor .el-range-separator {
    padding: 0;
  }
}
</style>
