import Vue from 'vue'
import ActionList from '../../../src/components/ActionList'

describe('ActionList.vue', () => {

    let vm = null;

    beforeEach(() => {
        const container = document.createElement('ul');
        const ActionListComponent = Vue.extend(ActionList);
        vm = new ActionListComponent({
            propsData: {
                logs: [
                    {"title": "Post 1"},
                    {"title": "Post 2"},
                ]
            }
        })

        vm.$mount(container);
    })


    it('should be instantiated', () => {
        expect(vm.logs.length).to.equal(2)
    })

})