

import Vue from 'vue'
import { mount } from '@vue/test-utils'
import PostList from '../../../src/components/PostList'

describe('PostList.vue', () => {

    let vm = null;
    //let wrapper;

    beforeEach(() => {
        const container = document.createElement('ul');
        
        const PostListComponent = Vue.extend(PostList);
        vm = new PostListComponent({
            propsData: {
                posts: [
                    {"title": "Post 1"},
                    {"title": "Post 2"},
                    {"title": "Post 3"},
                    {"title": "Post 4"},
                    {"title": "Post 5"}
                ]
            }
        })

        vm.$mount(container);

        //wrapper = mount(PostList);
    })

    it('renderd props.posts when passed', () => {
        expect(vm.posts.length).to.equal(5)
    })

    it('if click moveUp Swap array position with prior element', () => {
       
        const fromIndex = 1; //click item
        const toIndex = (fromIndex * 1) - 1;
        const itemCopy = {...vm.posts[fromIndex]};
        const priorItemCopy = {...vm.posts[toIndex]};
        vm.posts[toIndex] = itemCopy
        vm.posts[fromIndex] = priorItemCopy

        vm.timeTravel = vm.posts[0];
        expect(vm.timeTravel).to.contains({title: "Post 2"});
    })

    it('if click moveDown Swap array position with next element', () => {
        const fromIndex = 3; //click item
        const toIndex = (fromIndex * 1) + 1;
        const itemCopy = {...vm.posts[fromIndex]};
        const priorItemCopy = {...vm.posts[toIndex]};
        vm.posts[toIndex] = itemCopy
        vm.posts[fromIndex] = priorItemCopy

        vm.timeTravel = vm.posts[3];
        expect(vm.timeTravel).to.contains({title: "Post 5"});
    })
})