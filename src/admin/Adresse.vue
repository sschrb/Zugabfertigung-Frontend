<template>
  <div>


    <form @submit.prevent="handleSubmit">

      <label for="adresse">Adresse bearbeiten/neu anlegen</label>



      <select v-on:click="clearNachricht()" class="form-control" v-model="adresse">
        <option v-bind:value="adresse_def">neu anlegen</option>
        <option v-for="adresse in adressen" v-bind:value="adresse" v-bind:key="adresse.id">{{ adresse.name }}</option>
      </select>







      <div class="form-group">
        <label for="wagenummer">Name</label>
        <input type="text" v-model="adresse.name" name="Name" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Name') }"/>
                <div v-if="submitted && errors.has('Name')" class="invalid-feedback">{{ errors.first('Name') }}</div>


      </div>

      <div class="form-group">
        <label for="wagenummer">Straße und Hausnummer</label>
        <input type="text" v-model="adresse.strasse" name="Straße" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Straße') }"/>
                <div v-if="submitted && errors.has('Straße')" class="invalid-feedback">{{ errors.first('Straße') }}</div>


      </div>

      <div class="form-group">
        <label for="wagenummer">PLZ und Ort</label>
        <input type="text" v-model="adresse.ort" name="Ort" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Ort') }"/>
                <div v-if="submitted && errors.has('Ort')" class="invalid-feedback">{{ errors.first('Ort') }}</div>


      </div>

      <div class="form-group">
        <label for="wagenummer">E-Mailadresse</label>
        <input type="text" v-model="adresse.mail" class="form-control"/>

      </div>

      <div class="form-group">
        <label for="wagenummer">Telefonnummer</label>
        <input type="text" v-model="adresse.telefon" class="form-control"/>

      </div>



      <div class="form-group">
        <em v-if="adresse.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


      </div>
      <em v-if="adresse.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
      <em v-if="adresse.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>



    </form>


    <em v-if="nachricht.text">
      {{nachricht.text}}
    </em>








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
            adresse_def: {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },

            adresse: {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },


        }
    },
computed: {
        ...mapState('adresse', ['status']),

     ...mapState({

            adressen: state => state.adresse.all.items,
           message: state => state.adresse.message,
           nachricht: state => state.adresse.nachricht

        }),




    },
      mounted () {
        this.getAll();
        console.log('mount')
    },
    beforeUpdate () {
        if(this.message){this.getAll(); }


    },
    methods: {
        ...mapActions('adresse', ['create']),
        ...mapActions('adresse', ['getAll']),
         ...mapActions('adresse', ['delete']),
         ...mapActions('adresse', ['update']),

        handleSubmit(e) {
            //this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {



                   // this.getAll();
    }

                }
            )
        },
        anlegen(){


 this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.create(this.adresse)
                    this.adresse_def= {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            },

            this.adresse= {
                name: '',
                strasse: '',
                ort: '',
                mail: '',
                telefon: ''


            }
            this.submitted = false;
                }
            });

        },
        updaten(){

 this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.adresse)
                }
            });


        },

        loeschen(){
this.delete(this.adresse.id).then(() => {this.adresse = this.adresse_def})
        },

        clearNachricht(){
            this.$store.state.adresse.nachricht = {};
            console.log('clear')
        }



    }
};
</script>
