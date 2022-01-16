import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const state = {
	posts: [],
	logs: [],
	error: null,
}

const store = new Vuex.Store({

	state: {
		posts: [],
		logs: [],
		error: null,
	},
	
	getters: {
		posts: state => {
			return state.posts;
		},
		logs: (state) => {
			return state.logs;
		}
	},
	mutations: {
		set_post(state, posts) {
			state.posts = posts
		},
		set_log(state, item) {
			state.logs.unshift(item);
		},
		removeAction(state, item) {
			state.logs.splice(item, 1);
		}
	},
	actions: {
		async loadPosts({ commit }) {
			try {
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
				commit('set_post', response.data.slice(0, 5))
			}
			catch (error) {
				console.log(error);
			}
		},
		actionLog(context, payload) {
			if(payload){
				context.commit('set_log', payload)
			}
		},
		actionTravel(context, payload) {
			if(payload){
				context.commit('set_post', payload)
			}
		},
		removeActionItem(context, payload) {		
			context.commit('removeAction', payload)	
		}
	}

});

export default store;
