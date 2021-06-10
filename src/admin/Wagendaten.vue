<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="adresse">Wagendaten bearbeiten/neu anlegen</label>



<select v-on:click="clearNachricht()" class="form-control" v-model="wagendaten">
        <option v-bind:value="wagendaten_def">neu anlegen</option>
        <option v-for="wagendaten in wagendatens" v-bind:value="wagendaten" v-bind:key="wagendaten.id">{{ wagendaten.wagennummer }}</option>
    </select>







            <div class="form-group">
                <label for="Wagennummer">Wagennummer</label>
                <input type="Wagennummer" v-model="wagendaten.wagennummer" v-validate="{ required: true, test: true }" name="Wagennummer" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Wagennummer') }"/>
                <div v-if="submitted && errors.has('Wagennummer')" class="invalid-feedback">{{ errors.first('Wagennummer') }}</div>



            </div>

            <div class="form-group">
                <label for="wagenummer">Halterkürzel</label>
                <input type="text" v-model="wagendaten.halter" class="form-control"/>

            </div>

            <div class="form-group">
                <label for="wagenummer">Achsanzahl</label>
                <input type="text" v-model="wagendaten.achsanzahl" class="form-control"/>

            </div>

            <div class="form-group">
                <label for="Eigengewicht">Eigengewicht [kg]</label>
                <input type="Eigengewicht" v-model="wagendaten.eigengewicht" v-validate="{ required: true, integer: true }" name="Eigengewicht" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Eigengewicht') }"/>
                <div v-if="submitted && errors.has('Eigengewicht')" class="invalid-feedback">{{ errors.first('Eigengewicht') }}</div>




            </div>



            <div class="form-group">
                <em v-if="wagendaten.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


            </div>
            <em v-if="wagendaten.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
            <em v-if="wagendaten.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>




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

var luhnChk = (function (arr) {
    return function (ccNum) {

            ccNum = String(ccNum)

        var
            len = ccNum.length,
            bit = 1,
            sum = 0,

            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }
        if (ccNum.length != 12) return false

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

Validator.extend('test', {
  getMessage: field => 'The ' + field + ' value is not truthy.',
  validate: value => luhnChk(value)
});

export default {

    data () {
        return {
            submitted: false,
            wagendaten_def: {
                wagennummer: '',
                halter: '',
                achsanzahl: '',
                eigengewicht: ''


            },

            wagendaten: {
                wagennummer: '',
                halter: '',
                achsanzahl: '',
                eigengewicht: ''


            },


        }
    },
computed: {
        ...mapState('wagendaten', ['status']),

     ...mapState({

            wagendatens: state => state.wagendaten.all.items,
           message: state => state.wagendaten.message,
           nachricht: state => state.wagendaten.nachricht

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
        ...mapActions('wagendaten', ['create']),
        ...mapActions('wagendaten', ['getAll']),
         ...mapActions('wagendaten', ['delete']),
         ...mapActions('wagendaten', ['update']),

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
                    this.create(this.wagendaten);

                    this.wagendaten_def = {
                wagennummer: '',
                halter: '',
                achsanzahl: '',
                eigengewicht: ''


            },
            this.wagendaten = {
                wagennummer: '',
                halter: '',
                achsanzahl: '',
                eigengewicht: ''


            }
            this.submitted = false;
                }
            });


        },
        updaten(){


this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.wagendaten);
                }
            });


        },

        loeschen(){
this.delete(this.wagendaten.id).then(() => {this.wagendaten = this.wagendaten_def})
        },
         clearNachricht(){
            this.$store.state.wagendaten.nachricht = {};
            console.log('clear')
        },




    }
};
</script>
