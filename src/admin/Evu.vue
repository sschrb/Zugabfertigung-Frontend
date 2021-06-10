<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="adresse">EVU bearbeiten/neu anlegen</label>



<select v-on:click="clearNachricht()" class="form-control" v-model="evu">
        <option v-bind:value="evu_def">neu anlegen</option>
        <option v-for="evu in evus" v-bind:value="evu" v-bind:key="evu.id">{{ evu.name }}</option>
    </select>







            <div class="form-group">
                <label for="wagenummer">Name</label>
                <input type="text" v-model="evu.name" name="Name" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Name') }"/>
                <div v-if="submitted && errors.has('Name')" class="invalid-feedback">{{ errors.first('Name') }}</div>

            </div>

            <div class="form-group">
                <label for="wagenummer">Kurzbezeichnung</label>
                <input type="text" v-model="evu.short" name="Kurzbezeichnung" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Kurzbezeichnung') }"/>
                <div v-if="submitted && errors.has('Kurzbezeichnung')" class="invalid-feedback">{{ errors.first('Kurzbezeichnung') }}</div>

            </div>

            <div class="form-group">
                <label for="wagenummer">EVU Code</label>
                <input type="text" v-model="evu.code" name="EVU Code" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('EVU Code') }"/>
                <div v-if="submitted && errors.has('EVU Code')" class="invalid-feedback">{{ errors.first('EVU Code') }}</div>
            </div>





            <div class="form-group">
                <em v-if="evu.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


            </div>
            <em v-if="evu.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
            <em v-if="evu.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>




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
            evu_def: {
                name: "",
                short: '',
                code: '',



            },

            evu: {
                name: "",
                short: '',
                code: '',



            },


        }
    },
computed: {
        ...mapState('evu', ['status']),

     ...mapState({

            evus: state => state.evu.all.items,
           message: state => state.evu.message,
           nachricht: state => state.evu.nachricht

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
        ...mapActions('evu', ['create']),
        ...mapActions('evu', ['getAll']),
         ...mapActions('evu', ['delete']),
         ...mapActions('evu', ['update']),

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
                    this.create(this.evu)
                    this.evu_def= {
                name: "",
                short: '',
                code: '',



            },

            this.evu= {
                name: "",
                short: '',
                code: '',



            }
             this.submitted = false;
                }
            });

        },
        updaten(){

 this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.evu)
                }
            });
        },

        loeschen(){
this.delete(this.evu.id).then(() => {this.evu = this.evu_def})
        },
        clearNachricht(){
            this.$store.state.evu.nachricht = {};
            console.log('clear')
        }



    }
};
</script>
