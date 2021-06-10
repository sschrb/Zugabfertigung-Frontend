<template>
  <div>
    <h3>Ladeliste anlegen</h3>
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="adresse">Ladelisten-Vorlage laden (optional)</label>
          <div class="row">
            <div class="col">
              <em v-if="ladelisten">
                <v-select :get-option-label='option => option.ladelistedata.refnr' :options="ladelisten" v-model="vorlagedata" > </v-select>
              </em>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary" v-on:click="vorlageLaden()" >laden</button>
            </div>
          </div>

        </div>
      </div>
    </div>





    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="adresse">Name der Ladeliste</label>
          <input type="text" v-model="ladelistedata.refnr"  name="Referenz" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Referenz') }"/>
                <div v-if="submitted && errors.has('Referenz') " class="invalid-feedback">{{ errors.first('Referenz') }}</div>
        </div>

      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="adresse">Datum</label>

          <datetime type="date" v-model="ladelistedata.datum" value-zone="Europe/Berlin" ></datetime>
        </div>
      </div>
    </div>



    <!-- ############################################################ 1. LADEGUT ############################################################ -->
    <div class="card mb-5">
      <div class="card-header">
        <label for="adresse">Ladegut 1</label>

        <select class="form-control" v-model="ladelistedata.ladegut1.ladegut">
          <option v-bind:value="ladegut_def"></option>
          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>

      </div>
      <div class="card-body">


        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladelistedata.ladegut1.wagen" :key="k">

            <div class="row">
              <div class="col-5">

                <!--
                <select class="form-control" v-model="input.wagendaten">
                <option v-for="wagendaten in wagendatens" v-bind:value="wagendaten" v-bind:key="wagendaten.id">{{ formatWagennummer(wagendaten.wagennummer) }}</option>
              </select> -->

              <v-select label="wagennummer" :options="wagendatens" v-model="input.wagendaten" >
                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
                 </v-select>

              </div>







              <div class="col-3"><input type="number" class="form-control" v-model="input.liter"></div>



              <div class="col-1"><button type="button" class="btn btn-info" @click="swap1(k, k-1)" v-show="k != 0" >↑</button></div>
              <div class="col-1"><button type="button" class="btn btn-info" @click="swap1(k, k+1)" v-show="k != ladelistedata.ladegut1.wagen.length-1" >↓</button></div>


              <div class="col-1"><button type="button" class="btn btn-success" @click="add1(k)" v-show="k == ladelistedata.ladegut1.wagen.length-1">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove1(k)" v-show="k || ( !k && ladelistedata.ladegut1.wagen.length > 1)">-</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- ############################################################ 2. LADEGUT ############################################################ -->

    <div class="card mb-5">
      <div class="card-header">
        <label for="adresse">Ladegut 2</label>
        <select class="form-control" v-model="ladelistedata.ladegut2.ladegut">
          <option v-bind:value="ladegut_def"></option>
          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>
      </div>
      <div class="card-body">

        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladelistedata.ladegut2.wagen" :key="k">

            <div class="row">

              <div class="col-5"><v-select label="wagennummer" :options="wagendatens" v-model="input.wagendaten" >
                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
                </v-select></div>
              <div class="col-3"><input type="text" class="form-control" v-model="input.liter"></div>

              <div class="col-1"><button type="button" class="btn btn-info" @click="swap2(k, k-1)" v-show="k != 0" >↑</button></div>
              <div class="col-1"><button type="button" class="btn btn-info" @click="swap2(k, k+1)" v-show="k != ladelistedata.ladegut2.wagen.length-1" >↓</button></div>


              <div class="col-1"><button type="button" class="btn btn-success" @click="add2(k)" v-show="k == ladelistedata.ladegut2.wagen.length-1">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove2(k)" v-show="k || ( !k && ladelistedata.ladegut2.wagen.length > 1)">-</button></div>

            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- ############################################################ 3. LADEGUT ############################################################ -->


    <div class="card mb-5">
      <div class="card-header">
        <label for="adresse">Ladegut 3</label>



        <select class="form-control" v-model="ladelistedata.ladegut3.ladegut">
          <option v-bind:value="ladegut_def"></option>
          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>
      </div>

      <div class="card-body">

        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladelistedata.ladegut3.wagen" :key="k">

            <div class="row">

              <div class="col-5"><v-select label="wagennummer" :options="wagendatens" v-model="input.wagendaten" >
                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>

                </v-select></div>
              <div class="col-3"><input type="text" class="form-control" v-model="input.liter"></div>

              <div class="col-1"><button type="button" class="btn btn-info" @click="swap3(k, k-1)" v-show="k != 0" >↑</button></div>
              <div class="col-1"><button type="button" class="btn btn-info" @click="swap3(k, k+1)" v-show="k != ladelistedata.ladegut3.wagen.length-1" >↓</button></div>

              <div class="col-1"><button type="button" class="btn btn-success" @click="add3(k)" v-show="k == ladelistedata.ladegut3.wagen.length-1">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove3(k)" v-show="k || ( !k && ladelistedata.ladegut3.wagen.length > 1)">-</button></div>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="form-group">
      <div class="row mx-1">
        <div class="col">
          <label>Als Vorlage verwenden:</label>
          <div class="form-check form-check-inline">
            <input v-on:click="status= 'in Bearbeitung'" class="form-check-input" id="vorlagefalse" type="radio" name="vorlage" value="false" v-model="vorlage"/>
            <label class="form-check-label" for="vorlagefalse">Nein</label>
          </div>

          <div class="form-check form-check-inline">
            <input v-on:click="status= 'Vorlage'" class="form-check-input" id="vorlagetrue" type="radio" name="vorlage" value="true" v-model="vorlage"/>
            <label class="form-check-label" for="vorlagetrue">Ja</label>
          </div>
        </div>

        <div class="col alert-info">
          <em v-if="message.error">
            {{message.error.message}}
          </em>
        </div>

        <div class="col-auto">

        <button class="btn btn-success" v-on:click="saveLadeliste()" >Speichern u. Schließen</button>

      </div>
    </div>
  </div>




  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";

import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import { Validator } from 'vee-validate';


Validator.extend('objectNotEmpty', {
  validate: (value) => {
    if (value[Object.keys(value)[0]]) {

      return true;
    }
    return false
  },
});



export default {

    data () {
        return {

submitted: false,
ladegut_def: '',
vorlagedata: [],
vorlage: 'false',
          ladelistedata: {


                                    refnr: '',
                                    datum: new Date().toJSON(),




                                    ladegut1: {
                                        ladegut: {},
                                        wagen:[{
                                            liter: '',
                                            wagendaten: [{
                                                wagennummer: '',
                                                halter: '',
                                                achsanzahl: '',
                                                eigengewicht: ''


                                            }

                                            ]
                                        }]

                                    },
                                    ladegut2: {

                                        ladegut: {},
                                        wagen:[{
                                            liter: '',
                                            wagendaten: [{
                                                wagennummer: '',
                                                halter: '',
                                                achsanzahl: '',
                                                eigengewicht: ''


                                            }

                                            ]
                                        }]


                                    },
                                    ladegut3: {

                                        ladegut: {},
                                        wagen:[{
                                            liter: '',
                                            wagendaten: [{
                                                wagennummer: '',
                                                halter: '',
                                                achsanzahl: '',
                                                eigengewicht: ''


                                            }

                                            ]
                                        }]


                                    },



        },

            status: 'in Bearbeitung'
        }
    },
computed: {
        ...mapState('frachtbrief', ['status']),
        ...mapState('bahnhof', ['status']),

     ...mapState({

            bahnhoefe: state => state.bahnhof.all.items,
            evus: state => state.evu.all.items,
            adressen: state => state.adresse.all.items,
            erklarungen: state => state.erklarung.all.items,
            ladegueter: state => state.ladegut.all.items,
            wagendatens: state => state.wagendaten.all.items,
            message: state => state.ladeliste.all,
            ladelisten: state => state.ladeliste.vorlagen.items,


        }),
    },
    mounted () {

this.getAllWagendaten(),
this.getAllLadegut(),
this.getAllVorlagenLadeliste();
        console.log('mount')
    },
    methods: {

        ...mapActions('ladegut', {getAllLadegut: 'getAll'}),
        ...mapActions('wagendaten', {getAllWagendaten: 'getAll'}),

        ...mapActions('bahnhof', ['create']),
        ...mapActions('bahnhof', {getAllBahnhof: 'getAll'}),
        ...mapActions('evu', {getAllEvu: 'getAll'}),
        ...mapActions('adresse', {getAllAdresse: 'getAll'}),
        ...mapActions('erklarung', {createErklarung: 'create'}),
        ...mapActions('erklarung', {getAllErklarung: 'getAll'}),

         ...mapActions('bahnhof', ['delete']),
         ...mapActions('bahnhof', ['update']),
        ...mapActions('frachtbrief', {createFrachtbrief: 'create'}),
        ...mapActions('ladeliste', {createLadeliste: 'create'}),
        ...mapActions( 'ladeliste', {
            getAllLadeliste: 'getAll',
            getAllVorlagenLadeliste: 'getAllVorlagen',
            getAllLadelisteStatus: 'getAllStatus'

        }),
        handleSubmit(e) {
            //this.submitted = true;

        },

        swap1(indexA, indexB) {

    var temp = this.ladelistedata.ladegut1.wagen[indexA];

    this.ladelistedata.ladegut1.wagen[indexA] = this.ladelistedata.ladegut1.wagen[indexB];
    this.ladelistedata.ladegut1.wagen[indexB] = temp;

     this.add1();
     this.ladelistedata.ladegut1.wagen.pop()

},

        add1 () {
      this.ladelistedata.ladegut1.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      })
      console.log(this.inputs)
    },

    remove1 (index) {
      this.ladelistedata.ladegut1.wagen.splice(index, 1)
    },

    swap2(indexA, indexB) {

    var temp = this.ladelistedata.ladegut2.wagen[indexA];

    this.ladelistedata.ladegut2.wagen[indexA] = this.ladelistedata.ladegut2.wagen[indexB];
    this.ladelistedata.ladegut2.wagen[indexB] = temp;

     this.add2();
     this.ladelistedata.ladegut2.wagen.pop()

},

    add2 () {
      this.ladelistedata.ladegut2.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      })
      console.log(this.inputs)
    },

    remove2 (index) {
      this.ladelistedata.ladegut2.wagen.splice(index, 1)
    },

    swap3(indexA, indexB) {

    var temp = this.ladelistedata.ladegut3.wagen[indexA];

    this.ladelistedata.ladegut3.wagen[indexA] = this.ladelistedata.ladegut3.wagen[indexB];
    this.ladelistedata.ladegut3.wagen[indexB] = temp;

     this.add3();
     this.ladelistedata.ladegut3.wagen.pop()

},

    add3 () {
      this.ladelistedata.ladegut3.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      })
      console.log(this.inputs)
    },

    remove3 (index) {
      this.ladelistedata.ladegut3.wagen.splice(index, 1)
    },

saveLadeliste(){

this.submitted = true;
this.$validator.validate().then(valid => {
                if (valid) {

            this.createLadeliste(this.$data);


setTimeout(() => this.$router.push('/history') , 2000);
                }
            });





},

        aBefordererVorschlag() {





if(this.evu2.name==''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof7.name;
}

if(this.evu2.name!='' && this.evu3.name==''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.name;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.name!='' && this.evu3.name!='' && this.evu4.name==''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.name;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.name;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.name!='' && this.evu3.name!='' && this.evu4.name!='' && this.evu5.name==''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.name;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.name;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.name;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.name!='' && this.evu3.name!='' && this.evu4.name!='' && this.evu5.name!='' && this.evu6.name==''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.name;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.name;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.name;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof5.name;

    this.aBeforderer5.name=this.evu5.name;
    this.aBeforderer5.strecke=this.bahnhof5.name + ' - ' + this.bahnhof7.name;

}

if(this.evu2.name!='' && this.evu3.name!='' && this.evu4.name!='' && this.evu5.name!='' && this.evu6.name!=''){
    this.aBeforderer1.name=this.evu1.name;
    this.aBeforderer1.strecke=this.bahnhof1.name + ' - ' + this.bahnhof2.name;

    this.aBeforderer2.name=this.evu2.name;
    this.aBeforderer2.strecke=this.bahnhof2.name + ' - ' + this.bahnhof3.name;

    this.aBeforderer3.name=this.evu3.name;
    this.aBeforderer3.strecke=this.bahnhof3.name + ' - ' + this.bahnhof4.name;

    this.aBeforderer4.name=this.evu4.name;
    this.aBeforderer4.strecke=this.bahnhof4.name + ' - ' + this.bahnhof5.name;

    this.aBeforderer5.name=this.evu5.name;
    this.aBeforderer5.strecke=this.bahnhof5.name + ' - ' + this.bahnhof6.name;

    this.aBeforderer6.name=this.evu6.name;
    this.aBeforderer6.strecke=this.bahnhof6.name + ' - ' + this.bahnhof7.name;

}


        },
        formatWagennummer(wagennummer){
          if (!wagennummer) return ''
          var wagennummer2 = wagennummer.slice(0,2) + " " + wagennummer.slice(2, 4) + " " + wagennummer.slice(4, 8) + " " + wagennummer.slice(8, 11) + "-" + wagennummer.slice(11);


          return wagennummer2

        },
        vorlageLaden(){
this.ladelistedata = this.vorlagedata.ladelistedata
        },
        changeAdress() {
            if(this.frachtbrief.adresseform==this.adressen[0].name){
                this.frachtbrief.adresseview=true;
            } else {
                this.frachtbrief.adresseview=false;
            }
            this.frachtbrief.adresse=this.frachtbrief.adresseform;

        },
        bahnhofscodeChange() {
        if(this.frachtbrief.bahnhofscode.charAt(0).toUpperCase()=='O'){
            this.frachtbrief.laendercode = '81';
            this.frachtbrief.land = "Österreich";


        } else {
            this.frachtbrief.laendercode = '80';
            this.frachtbrief.land = "Deutschland";
        }
    }
    }
};
</script>

<style>
@import '/node_modules/vue-datetime/dist/vue-datetime.css';

</style>
