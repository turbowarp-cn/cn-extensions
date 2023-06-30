<script setup lang="ts">
import ExtensionCard from "@/components/ExtensionCard.vue";
</script>

<template>
  <main>
    <div class="title">
      <h1 style="text-align:center;">TurboWarp 第三方扩展</h1>
      <section class="container">
        <ExtensionCard data="lab/Animated-Text">
          <template v-slot:name>Animated-Text</template>
          <template v-slot:author>Scratch Lab</template>
          <template v-slot:desc>一个显示和动画文本的简单方法<br>与Scratch Lab的动画文本兼容</template>
        </ExtensionCard>

        <ExtensionCard data="-SIPC-/Recording">
          <template v-slot:name>Recording</template>
          <template v-slot:author>-SIPC-</template>
          <template v-slot:desc>利用用户设备上的麦克风录制音频<br>并将录制的音频文件进行下载</template>
        </ExtensionCard>

        <ExtensionCard data="-SIPC-/Consoles">
          <template v-slot:name>Consoles</template>
          <template v-slot:author>-SIPC-</template>
          <template v-slot:desc>用于控制和操作浏览器内置的JavaScript控制台</template>
        </ExtensionCard>

        <ExtensionCard data="-SIPC-/Encoding">
          <template v-slot:name>Encoding</template>
          <template v-slot:author>-SIPC-</template>
          <template v-slot:desc>将字符串编码或解码为 Unicode,Base64,URL</template>
        </ExtensionCard>

        <ExtensionCard data="-SIPC-/Time">
          <template v-slot:name>Time</template>
          <template v-slot:author>-SIPC-</template>
          <template v-slot:desc>用于与unix时间戳和其他日期字符串交互的块</template>
        </ExtensionCard>

        <ExtensionCard data="-SIPC-/Temporaryvariables">
          <template v-slot:name>Temporaryvariables</template>
          <template v-slot:author>-SIPC-</template>
          <template v-slot:desc>在Scratch中实时创建,修改,删除变量</template>
        </ExtensionCard>

        <ExtensionCard data="0832/rxFS">
          <template v-slot:name>rxFS</template>
          <template v-slot:author>0832</template>
          <template v-slot:desc>在Scratch中轻松地构建一个文件系统<br>实现管理,存储,访问数据功能</template>
        </ExtensionCard>

        <ExtensionCard data="skyhigh173/json">
          <template v-slot:name>json</template>
          <template v-slot:author>skyhigh173</template>
          <template v-slot:desc>用于对字符进行 JSON 格式的处理和转换<br>轻松地创建数组,解析JSON</template>
        </ExtensionCard>

        <ExtensionCard data="LoserFox/post-process">
          <template v-slot:name>post-process</template>
          <template v-slot:author>LoserFox</template>
          <template v-slot:desc>用于对舞台进行色散、故障<br>和其他视觉效果的操作</template>
        </ExtensionCard>

        <ExtensionCard data="zmh-program/ChatGPT">
          <template v-slot:name>ChatGPT</template>
          <template v-slot:author>zmh-program</template>
          <template v-slot:desc>允许用户调用 ChatGPT 模型进行自然语言对话</template>
        </ExtensionCard>

        <ExtensionCard data="CK七星松/bitwiseoper">
          <template v-slot:name>bitwiseoper</template>
          <template v-slot:author>CK七星松</template>
          <template v-slot:desc>提供了多个位运算和位操作符<br>可以在编程和逻辑表达式中进行高级操作</template>
        </ExtensionCard>

        <ExtensionCard data="CK七星松/mathandgeom">
          <template v-slot:name>mathandgeom</template>
          <template v-slot:author>CK七星松</template>
          <template v-slot:desc>提供了丰富的数学运算和图形处理功能<br>适用于编程和数据可视化等领域</template>
        </ExtensionCard>
      </section>
    </div>
    <!-- <div class="title"> -->
    <!-- <h1>rCodenow 第三方扩展</h1> -->
    <!-- </div> -->
    <!-- 更多扩展 -->
    <footer class="post">
      <a
        href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Hgd2J7dxazSx1QE462aKjLi5CXcm5U4G&authKey=Vb%2FA%2BFamtI97LgQkc3LWA0bE%2Bc1W1%2FonuAqfrtaZNRmz3Ia%2Fks%2Bfbd37UPd81xn1&noverify=0&group_code=770741679">提交你的扩展</a>
    </footer>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

.title {
  padding: 40px 45px;
  width: 1500px;
  background: rgba(255, 255, 255, .1);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  margin: 68px auto;
  top: 50%;
  color: #fff;
  font-weight: bold !important;
  transition: .25s ease-in;
}

.title:hover {
  background: rgba(255, 255, 255, .2);
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 40px;
  gap: 12px;

}

.post {
  text-align: center;
  margin: 24px auto 16px;
}

.post a {
  padding: 0 4px;
}
</style>
