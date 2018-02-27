<template>
  <div class="root">
    <div class="drawAlert">{{drawInfo}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["drawInfo"]
};
</script>
<style lang="less" scoped>
.root {
  position: fixed;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 6666666666;
  width: 211px;
  height: 166px;
  font-size: 26px;
  color: #fff;
  text-align: center;
  line-height: 166px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
</style>

