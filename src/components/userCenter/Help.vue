<template>
  <div
    class="help"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.3)"
  >
    <el-tabs v-if="help" v-model="activeName">
      <el-tab-pane
        v-for="(item, i) in help"
        :key="i"
        :label="item.typeName"
        :name="item.typeId + ''"
      >
        <div class="content">
          <el-collapse v-model="activeNames">
            <el-collapse-item
              v-for="(child, j) in item.list"
              :key="j"
              :title="child.title"
              :name="child.id"
            >
              <div v-html="child.content"></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Help",
  data() {
    return {
      activeName: "8",
      activeNames: ""
    };
  },
  created() {
    if (!this.help) {
      this.$store.dispatch("helps");
    }
    console.log(this.help);
  },
  computed: {
    ...mapGetters(["help", "loading"])
  }
};
</script>

<style scoped lang="scss">
.help {
  display: flex;
  flex: 1;
  .content {
    margin: 20px 20px 0 20px;
  }
}
</style>
