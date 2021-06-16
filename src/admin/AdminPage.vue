<template>
  <div>
    <h3>Datentabellen bearbeiten</h3>

    <!-- ############################################################ WAGENDATEN ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="wagendatenview = !wagendatenview">
        Wagendaten
      </div>

      <em v-if="wagendatenview">
        <div class="card-body">
          <Wagendaten />
        </div>
      </em>
    </div>

    <!-- ############################################################ Benutzer ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="benutzerview = !benutzerview">
        Benutzer
      </div>

      <em v-if="benutzerview">
        <div class="card-body">
          <Users />
        </div>
      </em>
    </div>


    



  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";


export default {

    data () {
        return {
            
            wagendatenview: false,
            
            benutzerview: false,
        }
    },
computed: {
        
    },
    methods: {
       
    }
};
</script>
