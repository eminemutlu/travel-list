<template>
  <div id="app">
    <div class="min-h-screen bg-gray-200">
      <div class="absolute z-10 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#584CB3" fill-opacity="1" d="M0,224L1440,0L1440,0L0,0Z"></path></svg>
      </div>
      <main class="py-6 px-4 sm:p-6 md:py-10 md:px-8 relative z-30">
        <div class="grid md:grid-cols-2 lg:grid-cols-2  gap-2 sm:grid-cols-1">
          <PostList :posts="posts" />
          <ActionList :logs="logs" />
        </div>
      </main>
    </div>
    
    
  </div>
</template>

<script>

import ActionList from './components/ActionList.vue';
import PostList from './components/PostList.vue';
import './assets/tailwind.css';

export default {
  name: 'App',
  components: {
    PostList,
    ActionList
  },
  computed: {
    posts() {
      return this.$store.getters.posts;  
    },
    logs() {
      return this.$store.getters.logs;  
    }
  },
  created() {
    this.$store.dispatch('loadPosts');
    this.$store.dispatch('actionLog', '');  
  },
}

</script>