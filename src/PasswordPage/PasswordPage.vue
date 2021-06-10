<template>
  <div>
    <h3>Passwort ändern</h3>

    <div class="form-group">
                <label for="password_old">Altes Passwort</label>
                <input type="password" v-model="userg.password_old" name="altes Passwort" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('altes Passwort') }" />
             <div v-if="submitted && errors.has('altes Passwort')" class="invalid-feedback">{{ errors.first('altes Passwort') }}</div>

            </div>

      <div class="form-group">
                <label for="password">Neues Passwort</label>
                <input type="password" v-model="userg.password" name="Passwort" v-validate="{ required: true}" ref="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Passwort') }" />
               <div v-if="submitted && errors.has('Passwort')" class="invalid-feedback">{{ errors.first('Passwort') }}</div>

            </div>

    <div class="form-group">
                <label for="password">Neues Passwort wiederholen</label>
                <input type="password" v-model="password_check" name="Passwort wiederholen" v-validate="'required|confirmed:password'" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Passwort wiederholen') }"/>
                 <div v-if="submitted && errors.has('Passwort wiederholen')" class="invalid-feedback">{{ errors.first('Passwort wiederholen') }}</div>
                

            </div>


     <div class="form-group">
        <button class="btn btn-primary" v-on:click="this.changePW">Ändern</button>

{{this.users.error}}
{{this.users.success}}
      </div>



  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";
import { Validator } from 'vee-validate';


export default {

    data () {
        return {
            submitted: false,
            password_check: '',
            userg: {
                password: '',
                password_old: '',
                id: ''
                


            },
            


        }
    },
computed: {
        
        ...mapActions('users', {updatePassword: 'updatePassword'}),

        ...mapState({

            users: state => state.users.all,
            

        }),
        
    },
methods: {
    changePW(){


this.submitted = true;
console.log(this.submitted)
            this.$validator.validate().then(valid => {
                if (valid) {
              

       var currentUser = JSON.parse(localStorage.getItem('user'));
       
       this.userg.id = currentUser.id;
       var u = this.userg;
        
       
       this.updatePassword(u);
       this.clearFields();
      
                }
            });
      
    },

    clearFields(){
        this.userg.password = '';
       this.userg.password_old = '';
       this.password_check = '';
       this.$forceUpdate();

    }
}
   
};
</script>
