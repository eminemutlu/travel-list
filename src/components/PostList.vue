<template>
  <div class="flex justify-center">
    <div class="w-full lg:w-4/5 ">
        <h1 class="text-2xl font-medium text-white mb-4 text-slate-400">Sortable Post List</h1>
        <transition-group tag="ul" name="post-list" class="divide-y-2 divide-gray-100 posts">
        <li v-for="(item, index) in posts" :key="item.id" data-item="postsList" class="flex justify-between leading-10 p-3 mb-4 bg-white rounded-lg shadow-lg">
          <span class="text-gray-600">{{ item.title }}</span>
          <span>
            <svg @click="moveUp(index)" class="h-5 w-5 cursor-pointer moveUp mb-3 text-purple-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 15 12 9 18 15" /></svg>
            <svg @click="moveDown(index)" class="h-5 w-5 cursor-pointer moveDown text-purple-900"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>
          </span>
        </li>
        </transition-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostList',
  props: {
    posts: { required: true } 
  },
  data () {
    return { 
      timeTravel: [],
      toIndex: ''
     }
  },

  methods: {
    moveUp(index) {
      if (index === 0) {
        return;
      }
      this.toIndex = (index * 1) - 1;
      this.moveAction(index);
    },

    moveDown(index) {
      if (index === this.posts.length - 1) {
        return;
      }
      this.toIndex = (index * 1) + 1;
      this.moveAction(index);
    },

    moveAction(fromIndex) {
      //Copying post array for time travel
      this.timeTravel = {...this.posts};
  
      let itemCopy = {...this.posts[fromIndex]};
      let priorItemCopy = {...this.posts[this.toIndex]};

      //Swap array position with prior element
      this.$set(this.posts, this.toIndex, itemCopy);
      this.$set(this.posts, fromIndex, priorItemCopy); 

      let moveObj = {
        id: Math.random(),
        fromKey: fromIndex,
        toKey: this.toIndex,
        postTitle: this.posts[this.toIndex].title,
        postHistory: this.timeTravel
      }
      this.$store.dispatch("actionLog", moveObj)
    },
  }
}
</script>

<style scoped>

ul.posts li:first-child .moveUp,
ul.posts li:last-child .moveDown{
  display: none;
}

.post-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.post-list-enter-active {
  transition: all 1s ease-out;
}

.post-list-enter-to,
.post-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.post-list-leave-active {
  transition: all 1s ease-in;
  position: absolute;
}

.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-move {
  transition: transform 0.8s ease;
}
</style>
