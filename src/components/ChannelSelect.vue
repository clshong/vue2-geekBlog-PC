<template>
  <el-select placeholder="请选择" v-model="form.channel_id">
    <el-option
      v-for="item in channelList"
      :label="item.name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { getChannelList } from '@/api/index.js'
export default {
  name: 'ChannelSelect',
  props: {
    form: {
      type: Object
    }
  },
  data () {
    return {
      channelList: []
    }
  },
  async created () {
    const res = await getChannelList()
    // console.log(res)
    this.channelList = res.data.channels
  }
}
</script>

<style></style>
