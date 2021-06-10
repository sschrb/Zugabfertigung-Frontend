<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="erklarung">Erklärungen bearbeiten/neu anlegen</label>



<select v-on:click="clearNachricht()" class="form-control" v-model="erklarung">
        <option v-bind:value="erklarung_def">neu anlegen</option>
        <option v-for="erklarung in erklarungen" v-bind:value="erklarung" v-bind:key="erklarung.id">{{ erklarung.code }}</option>
    </select>







            <div class="form-group">
                <label for="wagenummer">Code mit Erläuterung</label>
                <textarea type="text" v-model="erklarung.code" name="Code" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Code') }"/>
                <div v-if="submitted && errors.has('Code')" class="invalid-feedback">{{ errors.first('Code') }}</div>
            </div>




            <div class="form-group">
                <em v-if="erklarung.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


            </div>
            <em v-if="erklarung.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
            <em v-if="erklarung.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>



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
            erklarung_def: {
                code: ''


            },

            erklarung: {
                code: ''


            },


        }
    },
computed: {
        ...mapState('erklarung', ['status']),

     ...mapState({

            erklarungen: state => state.erklarung.all.items,
           message: state => state.erklarung.message,
           nachricht: state => state.erklarung.nachricht

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
        ...mapActions('erklarung', ['create']),
        ...mapActions('erklarung', ['getAll']),
         ...mapActions('erklarung', ['delete']),
         ...mapActions('erklarung', ['update']),

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
                    this.create(this.erklarung)
                    this.erklarung_def= {
                code: ''


            },

            this.erklarung= {
                code: ''


            }
            this.submitted = false;
                }
            });
        },
        updaten(){

this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.erklarung)
                }
            });
        },

        loeschen(){
this.delete(this.erklarung.id).then(() => {this.erklarung = this.erklarung_def})
        },
         clearNachricht(){
            this.$store.state.erklarung.nachricht = {};
            console.log('clear')
        }





    }
};
</script>
