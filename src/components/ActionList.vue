<template>
  <div class="w-full lg:w-4/5 rounded-t-lg rounded-b-lg border shadow bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="w-full bg-white rounded-t-lg">
      <h1 class="p-6 mb-4 text-2xl font-semibold text-gray-600">List of actions commited</h1>
    </div>
    <div class="p-2 w-4/5 rounded-lg shadow bg-white m-auto mb-4">
      <ul class="divide-y-2 divide-gray-100 actionList">
        <li v-if="logs.length == 0" class="text-center noData">No Data</li>
        <transition-group name="action-list">
          <li v-for="(item, index) in logs" :key="item.id"  class="p-3 flex justify-between bg-white">
            <span class="w-3/5 text-gray-600">Moved {{item.postTitle}} from index {{item.fromKey}} to index {{item.toKey}}</span>
            <button @click="actionTravel(index)" class="max-h-10 text-slate-400 font-semibold text-sm bg-green-300 py-1 px-2 rounded">
              Time travel
            </button>
          </li>
        </transition-group>
      </ul>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'ActionList',
  props: ['logs'],
  methods: {
    actionTravel(index){
      const arr = this.logs[index].postHistory
      this.$store.dispatch("actionTravel", arr);
      this.$store.dispatch("removeActionItem", index)
    }
  }
}

</script>


<style scoped>

.actionList li{
  border-bottom: solid 1px #ccc;
}
.actionList li:last-child{
  border-bottom: none;
}
.noData {
  border-bottom: none !important;
}

.action-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.action-list-enter-active {
  transition: all 1s ease-out;
}

.action-list-enter-to,
.action-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.action-list-leave-active {
  transition: all 1s ease-in;
  position: absolute;
}

.action-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.action-list-move {
  transition: transform 0.8s ease;
}
</style>
