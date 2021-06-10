import Vue from 'vue';
//import VeeValidate from 'vee-validate';

import de from 'vee-validate/dist/locale/de';
import VeeValidate, { Validator } from 'vee-validate';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import Bahnhof from './admin/Bahnhof';
import Adresse from './admin/Adresse';
import Erklarung from './admin/Erklarung';
import Evu from './admin/Evu';
import Wagendaten from './admin/Wagendaten';
import Ladegut from './admin/Ladegut';
import Users from './admin/Users';
import User from './admin/User';

import { Datetime } from 'vue-datetime';

//import "vue-select/dist/vue-select.css";




import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);


Validator.localize('de', de);

Vue.component('datetime', Datetime);
Vue.component("v-select", vSelect);
Vue.component("Bahnhof", Bahnhof);
Vue.component("Adresse", Adresse);
Vue.component("Erklarung", Erklarung);
Vue.component("Evu", Evu);
Vue.component("Wagendaten", Wagendaten);
Vue.component("Ladegut", Ladegut);
Vue.component("Users", Users);
Vue.component("User", User);

Vue.directive("disable-all", {
    // When all the children of the parent component have been updated
    componentUpdated: function(el, binding) {
      if (!binding.value) return;
      const tags = ["input", "button", "textarea", "select"];
      tags.forEach(tagName => {
        const nodes = el.getElementsByTagName(tagName);
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].disabled = true;
          nodes[i].tabIndex = -1;
        }
      });
    }
  });



// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});