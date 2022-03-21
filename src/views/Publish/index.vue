<template>
  <div class="publish">
    <el-card>
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/layout/home' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!-- form表单 -->
      <el-form label-width="100px">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input
            placeholder="请输入文章标题"
            v-model="form.title"
          ></el-input>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道：">
          <ChannelSelect :form="form"></ChannelSelect>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面：">
          <el-radio-group v-model="form.cover.type" @change="radioChange">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="bol">
            <el-upload
              v-if="form.cover.type > 0"
              :action="baseUrl + '/v1_0/upload'"
              name="image"
              :limit="form.cover.type"
              :on-success="onSuccsee"
              :before-upload="beforeUpload"
              :on-remove="onRemove"
              list-type="picture-card"
              v-model="form.cover.images"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容：">
          <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      form: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: '' // 文章频道id
      },
      bol: true,
      baseUrl: process.env.VUE_APP_URL
    }
  },
  methods: {
    onSuccsee (fileList) {
      // console.log(fileList)
      this.form.cover.images.push(fileList.data.url)
    },
    // 点击按钮清空之前images里面的值
    radioChange () {
      this.form.cover.images = []
      // 设置静默刷新
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
    },
    // 上传前限制
    beforeUpload (file) {
      // console.log(file)
      const _type =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      const _size = file.size / 1024 / 1024 < 3
      if (!_type) {
        this.$message.error('仅支持上传 png、jpg、jpeg 格式的图片')
      }
      if (!_size) {
        this.$message.error('图片大小限制3MB')
      }
      return _size && _type
    },
    // 删除后
    onRemove () {
      this.form.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  ::v-deep .ql-editor {
    min-height: 200px;
  }
}
</style>
