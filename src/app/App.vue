<template>
  <div class="container-fluid">
    <div class="row">


      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a class="navbar-brand"><router-link to="/">Zugabfertigung</router-link></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <!-- klappt Navbar auf Smartphones ein -->
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            
            <li class="nav-item">
              <a class="nav-link" href="#"><router-link to="/history">Bearbeiten u. Historie</router-link></a>
            </li>
            <li class="nav-item">
               <a class="nav-link" href="#" v-if="isAdmin" ><router-link to="/verwaltung">Administration</router-link></a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#"><router-link to="/passwort">Passwort ändern</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://tim-langhoff.de/projekte/cim-frachtbrief/index.html" target="_blank">Anleitung</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><router-link to="/login">Abmelden</router-link></a>
            </li>
          </ul>
        </div>
      </nav>


      <div class="container col-sm-6 offset-sm-3 bg-light pt-3"> <!-- Content würde sonst hinter Navbar liegen -->
      </div>
      <div class="container pt-5">
              <div v-if="alert.message" :class="`alert ${alert.type}`"> <!-- Fehlermeldung werden unterhalb der Navbar dargestellt -->
               {{alert.message}}
              </div>

         <router-view></router-view><!-- Inhalt der einzelnen Seiten -->

      </div>
      
    </div>
    
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Role } from '../_helpers';
import { userService } from '../_services';

export default {
    name: 'app',
    data () {
        return {
            currentUser: ""
        };
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        }),

        isAdmin() {
          console.log("isADmin")
         // this.currentUser = JSON.parse(localStorage.getItem('user'));
          console.log(this.currentUser)
         return this.currentUser && this.currentUser.role === Role.Admin
        }
    },
  
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
       
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            console.log(to)
            if (to.path == "/login") this.currentUser = "";
              else this.currentUser = JSON.parse(localStorage.getItem('user'));
            this.clearAlert();
        }
    }
};
</script>
