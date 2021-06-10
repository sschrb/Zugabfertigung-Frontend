<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="adresse">Ladegut bearbeiten/neu anlegen</label>





<select v-on:click="clearNachricht()" class="form-control" v-model="ladegut">
        <option v-bind:value="ladegut_def">neu anlegen</option>
        <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
    </select>







            <div class="form-group">
                <label for="wagenummer">Bezeichnung</label>
                <input type="text" v-model="ladegut.bezeichnung" name="Bezeichnung" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Bezeichnung') }"/>
                <div v-if="submitted && errors.has('Bezeichnung')" class="invalid-feedback">{{ errors.first('Bezeichnung') }}</div>

            </div>

            <div class="form-group">
                <label for="wagenummer">Bemerkung</label>
                <input type="text" v-model="ladegut.bemerkung" name="Bemerkung" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Bemerkung') }"/>
                <div v-if="submitted && errors.has('Bemerkung')" class="invalid-feedback">{{ errors.first('Bemerkung') }}</div>

            </div>

             <div class="form-group">
                <label>Einheit auf Ladeliste:</label>
          <div class="form-check form-check-inline">
            <input v-on:click="ladegut.dichte = ''" class="form-check-input" id="LITER" type="radio" name="einheit" value="Liter" v-model="ladegut.einheit"/>
            <label class="form-check-label" for="LITER">Liter</label>
          </div>

          <div class="form-check form-check-inline">
            <input v-on:click="ladegut.dichte = '1000'" class="form-check-input" id="KG" type="radio" name="einheit" value="Kg" v-model="ladegut.einheit"/>
            <label class="form-check-label" for="KG">Kilogramm</label>
          </div>

            </div>

            <div v-if="ladegut.dichte != 1000" class="form-group">
                <label for="wagenummer">Dichte [kg/m³]</label>
                <input type="text" v-model="ladegut.dichte" name="Dichte" v-validate="{ required: true, decimal: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Dichte') }"/>
                <div v-if="submitted && errors.has('Dichte')" class="invalid-feedback">{{ errors.first('Dichte') }}</div>


            </div>

            <div class="form-group">
                <label>RID:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" id="CIM" type="radio" name="rid" value="Ja" v-model="ladegut.rid"/>
            <label class="form-check-label" for="CIM">Ja</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" id="CUV" type="radio" name="rid" value="Nein" v-model="ladegut.rid"/>
            <label class="form-check-label" for="CUV">Nein</label>
          </div>

            </div>



            <div class="form-group">
                <label for="wagenummer">NHM Code</label>
                <input type="text" v-model="ladegut.nhm" name="NHM Code" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('NHM Code') }"/>
                <div v-if="submitted && errors.has('NHM Code')" class="invalid-feedback">{{ errors.first('NHM Code') }}</div>
                <a href="https://agp.dbcargo.com/agp/NHMSuche" target="_blank">Info</a>

            </div>

            <div class="form-group">
                <label for="wagenummer">Wagentyp</label>
                <input type="text" v-model="ladegut.wagentyp" name="Wagentyp" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Wagentyp') }"/>
                <div v-if="submitted && errors.has('Wagentyp')" class="invalid-feedback">{{ errors.first('Wagentyp') }}</div>

            </div>





            <div class="form-group">
                <em v-if="ladegut.id == null"><button class="btn btn-primary" v-on:click="anlegen">Anlegen</button></em>


            </div>
            <em v-if="ladegut.id != null"><button class="btn btn-success" v-on:click="updaten">Änderungen speichern</button></em>
            <em v-if="ladegut.id != null"><button class="btn btn-danger" v-on:click="loeschen">Löschen</button></em>




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

Validator.extend("decimal", {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;

    const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

    return {
      valid: regex.test(value),
    };
  },
  message: 'The {_field_} field must contain only decimal values'
})

export default {

    data () {
        return {

            submitted: false,
            ladegut_def: {
                bezeichnung: "",
                bemerkung: "",
                dichte: "",
                rid: "Nein",
                einheit: "Liter",
                nhm: "",
                wagentyp: ""



            },

            ladegut: {
                bezeichnung: "",
                bemerkung: "",
                dichte: "",
                rid: "Nein",
                einheit: "Liter",
                nhm: "",
                wagentyp: ""



            },


        }
    },
computed: {
        ...mapState('ladegut', ['status']),

     ...mapState({

            ladegueter: state => state.ladegut.all.items,
           message: state => state.ladegut.message,
           nachricht: state => state.ladegut.nachricht

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
        ...mapActions('ladegut', ['create']),
        ...mapActions('ladegut', ['getAll']),
         ...mapActions('ladegut', ['delete']),
         ...mapActions('ladegut', ['update']),

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
            this.ladegut.dichte = this.ladegut.dichte.replace(',', '.')


 this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.create(this.ladegut)
                    this.ladegut_def= {
                bezeichnung: "",
                bemerkung: "",
                dichte: "",
                rid: "Nein",
                einheit: "Liter",
                nhm: "",
                wagentyp: ""



            },

            this.ladegut= {
                bezeichnung: "",
                bemerkung: "",
                dichte: "",
                rid: "Nein",
                einheit: "Liter",
                nhm: "",
                wagentyp: ""



            }
                    this.submitted = false;
                }
            });
        },
        updaten(){
            this.ladegut.dichte = this.ladegut.dichte.toString().replace(',', '.')


 this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update(this.ladegut)
                    this.submitted = false;
                }
            });
        },

        loeschen(){
this.delete(this.ladegut.id).then(() => {this.ladegut = this.ladegut_def})
        },
         clearNachricht(){
            this.$store.state.ladegut.nachricht = {};
            console.log('clear')
        }




    }
};
</script>
