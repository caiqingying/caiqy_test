<template>
  <div class="hello-layout">
    <aside class="sidebar">
      <el-menu :default-active="menu[0]?.name" class="el-menu-demo" mode="vertical">
        <el-sub-menu v-for="item in menu" :key="item.name" :index="item.name" v-if="item.children && item.children.length">
          <template #title>{{ item.name }}</template>
          <el-menu-item v-for="child in item.children" :key="child.name" :index="child.name">
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-for="item in menu" :key="item.name + '-single'" :index="item.name" v-if="!item.children || !item.children.length">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </aside>
    <main class="main-content">
      <h1>{{ msg }}</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br>
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      </ul>
      <h3>Essential Links</h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
      </ul>
      <h3>Ecosystem</h3>
      <ul>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      menu: [
        {
          name: '菜单一',
          children: [
            { name: '子菜单1-1' },
            { name: '子菜单1-2' }
          ]
        },
        {
          name: '菜单二',
          children: [
            { name: '子菜单2-1' },
            { name: '子菜单2-2' }
          ]
        },
        {
          name: '菜单三',
          children: []
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 220px;
  background: #f5f7fa;
  padding-top: 20px;
  box-shadow: 2px 0 8px #f0f1f2;
}
.main-content {
  flex: 1;
  padding: 40px;
}
</style>
