<template>
    <div>

{{this.benutzer.username}}
<div class="form-group">
        <button class="btn btn-primary" v-on:click="show = !show">Bearbeiten</button>


      </div>

<em v-if="show">

 <div class="form-group">
                <label for="username">Benutzername</label>
                <input type="text" v-model="benutzer.username" name="Benutzername" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Benutzername') }"/>
                <div v-if="submitted && errors.has('Benutzername')" class="invalid-feedback">{{ errors.first('Benutzername') }}</div>

</div>

 <div class="form-group">
                <label for="password">Passwort</label>
                <input type="password" v-model="pw.password" name="Passwort" v-validate="'confirmed:password_check'" ref="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Passwort') }"/>
                <div v-if="submitted && errors.has('Passwort')" class="invalid-feedback">{{ errors.first('Passwort') }}</div>

</div>

 <div class="form-group">
                <label for="password">Neues Passwort wiederholen</label>
                <input type="password" v-model="pw.password_check" name="Passwort wiederholen" v-validate="'confirmed:password'" ref="password_check" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Passwort wiederholen') }"/>
                 <div v-if="submitted && errors.has('Passwort wiederholen')" class="invalid-feedback">{{ errors.first('Passwort wiederholen') }}</div>
                

            </div>

        <label for="adresse">Gruppenzuordnung</label>

              <select class="form-control" v-model="benutzer.role">
               
                <option v-for="role in roles" v-bind:value="role" v-bind:key="role">{{ role }}</option>
              </select>

     <div class="form-group">
        <button class="btn btn-primary" v-on:click="this.speichern">Speichern</button>


      </div>

</em>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";
import { Validator } from 'vee-validate';
import { Role } from '../_helpers';

export default {
    props: {
   benutzer: {
    //type: String,
    required: true
    
   }
  },

    data () {
        return {

            roles: Role,
            show: false,

             submitted: false,
             pw: {password: '',
             password_check: '',
             }

        }
    },
computed: {
        ...mapState('users', ['status']),

     ...mapState({

            users: state => state.users.all.items,
           

        }),




    },
      mounted () {
        //this.getAll();
        console.log('mount')
    },
    beforeUpdate () {
        if(this.message){this.getAll();
        console.log('update true')
        }

        console.log('update false')
    },
    methods: {
        ...mapActions('users', ['update']),
       

        speichern() {

            this.submitted = true;
console.log(this.submitted)
            this.$validator.validate().then(valid => {
                if (valid) {
              

       
       
       
       var u = this.benutzer;

       if(this.pw.password){
            Object.assign(u, this.pw);
       }
       
        
       console.log(u)
       this.update(u);
    
      
                }
            });
      
    

        },
        



    }
};
</script>
