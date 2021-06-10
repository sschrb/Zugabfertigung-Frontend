<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="adresse">Bahnhof bearbeiten/neu anlegen</label>



<select v-on:click="clearNachricht()" class="form-control" v-model="bahnhof">
        <option v-bind:value="bahnhof_def">neu anlegen</option>
        <option v-for="bahnhof in bahnhoefe" v-bind:value="bahnhof" v-bind:key="bahnhof.id">{{ bahnhof.name }}</option>
    </select>







            <div class="form-group">
                <label for="wagenummer">Name</label>
                <input type="text" v-model="bahnhof.name" name="Name" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Name') }"/>
                <div v-if="submitted && errors.has('Name')" class="invalid-feedback">{{ errors.first('Name') }}</div>

            </div>

            <div class="form-group">
                <label for="wagenummer">Bahnhofscode</label>
                <input type="text" v-model="bahnhof.bahnhofscode" name="Bahnhofscode" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Bahnhofscode') }"/>
                <div v-if="submitted && errors.has('Bahnhofscode')" class="invalid-feedback">{{ errors.first('Bahnhofscode') }}</div>
                <a href="https://dium.dbcargo.com/dium/bahnhofsuche.do?initContext=1&style=stinnes" target="_blank">Info</a>

            </div>

            <div class="form-group">
                <label for="wagenummer">Ländercode</label>
                <input type="text" v-model="bahnhof.laendercode" name="Ländercode" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Ländercode') }"/>
                <div v-if="submitted && errors.has('Ländercode')" class="invalid-feedback">{{ errors.first('Ländercode') }}</div>

            </div>

            <div class="form-group">
                <label for="wagenummer">Land</label>
                <input type="text" v-model="bahnhof.land" name="Land" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Land') }"/>
                <div v-if="submitted && errors.has('Land')" class="invalid-feedback">{{ errors.first('Land') }}</div>

            </div>



            <div class="form-group">
                <em v-if="bahnhof.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


            </div>
            <em v-if="bahnhof.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
            <em v-if="bahnhof.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>




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
            bahnhof_def: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },

            bahnhof: {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },


        }
    },
computed: {
        ...mapState('bahnhof', ['status']),

     ...mapState({

            bahnhoefe: state => state.bahnhof.all.items,
           message: state => state.bahnhof.message,
           nachricht: state => state.bahnhof.nachricht

        }),




    },
      mounted () {
        this.getAll();
        console.log('mount')
    },
    beforeUpdate () {
        if(this.message){this.getAll();
        console.log('update true')
        }

        console.log('update false')
    },
    methods: {
        ...mapActions('bahnhof', ['create']),
        ...mapActions('bahnhof', ['getAll']),
         ...mapActions('bahnhof', ['delete']),
         ...mapActions('bahnhof', ['update']),

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
                    this.create(this.bahnhof)
                    this.bahnhof_def= {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            },

            this.bahnhof= {
               name: "",
                bahnhofscode: '',
                laendercode: '',
                land: '',


            }
            this.submitted = false;
                }
            });
        },
        updaten(){


this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.bahnhof)
                }
            });
        },

        loeschen(){
this.delete(this.bahnhof.id).then(() => {this.bahnhof = this.bahnhof_def})
        },

         clearNachricht(){
            this.$store.state.bahnhof.nachricht = {};
            console.log('clear')
        }



    }
};
</script>
