<script setup lang="ts">
//@ts-ignore
import { ElNotification } from 'element-plus'

const props = defineProps<{
  data: string,
}>();
const name: string = props.data;

function open(): void {
  window.open(
      `https://turbowarp.cn/editor.html?extension=${location.origin}/extensions/${name}.js`,
  );
}
function copy(){
  const url: string = `${location.origin}/extensions/${name}.js`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
        .then(() => {
          ElNotification({
            title: '复制成功！',
            message: '已将链接复制到剪贴板！',
            type: 'success',
          })
        })
        .catch(() => {
          ElNotification({
            title: '复制失败！',
            message: '无法将链接复制到剪贴板！请手动复制！\n' + url,
            type: 'error',
          })
        });
  } else {
      ElNotification({
        title: '复制失败！',
        message: '无法将链接复制到剪贴板！请手动复制！\n' + url,
        type: 'error',
      })
  }
}
</script>

<template>
  <div class="card">
    <header>
      <h2 class="name"><slot name="name" /></h2>
      <span class="author">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
        <slot name="author" />
      </span>
    </header>
    <main>
      <span class="description"><slot name="desc" /></span>
    </main>
    <footer style="display: flex; flex-direction: row; gap: 6px; float: right; transform: translate(16px, 26px)">
      <el-popover placement="top-start" trigger="hover" :show-after="250" :hide-after="250" content="打开扩展">
        <template #reference>
          <div class="icon" @click="open">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758a2.01 2.01 0 0 1 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.08.182.15.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.046.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.01 2.01 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 15h-4.758a4.03 4.03 0 0 0-2.242.689V6c0-.551.448-1 1-1h6v13z"></path></svg>
          </div>
        </template>
      </el-popover>
      <el-popover placement="top-start" trigger="hover" :show-after="250" :hide-after="250" content="复制链接">
        <template #reference>
          <div class="icon" @click="copy">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path><path d="M6 12h6v2H6zm0 4h6v2H6z"></path></svg>
          </div>
        </template>
      </el-popover>
    </footer>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  background: rgba(30,30,30,.8);
  backdrop-filter: blur(2px);
  border-radius: 10px;
  margin: 18px auto;
  padding: 40px 45px 50px;
  color: #fff;
  font-weight: bold !important;
  transition: .25s ease-in;
  box-shadow: rgba(0,0,0,.2) 0 10px 30px;
}

.card:hover {
  background: rgba(30,30,30,.95);
}

.name {
  font-family: "Poppins", Ubuntu, sans-serif;
}

.author {
  display: flex;
  gap: 2px;
}

.author svg {
  fill: #fff;
  width: 16px;
  height: 16px;
  transform: translateY(5px);
}

.description {
  display: block;
  max-width: 340px;
  word-break: break-all;
  word-wrap: anywhere;
  margin: 4px 0;
}

.icon {
  width: 32px;
  height: 32px;
  display: block;
  background: rgba(130,130,130,0.2);
  backdrop-filter: blur(2px);
  padding: 4px;
  border-radius: 4px;
}
.icon svg {
  fill: #fff;
}
</style>
