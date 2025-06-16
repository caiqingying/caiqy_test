<template>
  <nav class="nav-menu">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" class="logo-img">
    </div>
    <div class="menu-toggle" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul class="menu-items" :class="{ 'active': isMenuOpen }">
      <li><a href="#" class="active">首页</a></li>
      <li><a href="#">关于我们</a></li>
      <li><a href="#">服务</a></li>
      <li><a href="#">联系我们</a></li>
    </ul>
  </nav>


</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
  }
}
</script>

<style scoped>
.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
}

.menu-items {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-items li {
  margin: 0 1rem;
}

.menu-items a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
}

.menu-items a:hover,
.menu-items a.active {
  color: #42b983;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #2c3e50;
  margin: 2px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .menu-items {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .menu-items.active {
    display: flex;
  }

  .menu-items li {
    margin: 0.5rem 2rem;
  }
}
</style> 