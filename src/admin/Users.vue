<template>
    <div>


<User :myName="'Soeren'"></User>

<div class="form-group" v-for="(input,k) in users" :key="k">
    <User :benutzer="input"></User>
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
        ...mapState('users', ['status']),

     ...mapState({

            users: state => state.users.all.items,
            alles: state => state.users.all,
           

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
        ...mapActions('users', ['getAll']),
       

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
