<template>
  <el-container>
    <el-aside width="200px">
      <!-- 菜单导航 -->

      <img class="imgBox" src="@/assets/logo.png" alt="" />
      <el-menu
        background-color="#234"
        text-color="#fff"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/layout/home">
          <i class="el-icon-s-home"></i>
          <!-- <span slot="title">数据概览</span> -->
          <template #title>
            <span>数据概览</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/layout/article">
          <i class="el-icon-document"></i>
          <!-- <span slot="title">内容管理</span> -->
          <template #title>
            <span>内容管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/layout/publish">
          <i class="el-icon-s-promotion"></i>
          <!-- <span slot="title">发布文章</span> -->
          <template #title>
            <span>文章发布</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="userInfo">
        <span class="idInfo">{{ $store.state.userInfo.name }}</span>
        <el-link icon="el-icon-unlock" @click="secedeLogin">退出</el-link>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from '../../api/index'
import { removeItem } from '../../utils/auth'
export default {
  async created () {
    const res = await getUserInfo()
    this.$store.commit('setUserInfo', res.data)
    // console.log(res)
  },
  methods: {
    secedeLogin () {
      const title = confirm('是否退出登录')
      if (title) {
        removeItem()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #223343;
  }
  .el-main {
    background-color: #f5f5f5;
  }
  .imgBox {
    width: 200px;
  }
  .el-menu {
    width: 200px;
    border: 0;
  }
  .userInfo {
    text-align: right;
    line-height: 60px;
    .idInfo {
      padding-right: 10px;
    }
    .el-link.is-underline:hover:after {
      border: 0;
    }
    .el-link {
      margin-bottom: 3px;
    }
  }
}
</style>
