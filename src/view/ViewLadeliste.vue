<template>
  <div>
    <h3>Ladeliste bearbeiten</h3>
    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="adresse">Referenz Nummer (Name der Ladeliste)</label>
          <input type="text" v-model="ladeliste.ladelistedata.refnr" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" name="Referenz" v-validate="{ required: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Referenz') }"/>
                <div v-if="submitted && errors.has('Referenz') " class="invalid-feedback">{{ errors.first('Referenz') }}</div>
        </div>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <div class="form-group">
          <label for="adresse">Datum</label>

          <datetime type="date" v-model="ladeliste.ladelistedata.datum" value-zone="Europe/Berlin" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'"></datetime>
        </div>
      </div>
    </div>


    <!-- ############################################################ 1. LADEGUT ############################################################ -->
    <div class="card mb-5">
      <div class="card-header">
        <label for="adresse">Ladegut 1</label>

        <select class="form-control" v-model="ladeliste.ladelistedata.ladegut1.ladegut" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" name="Ladegut 1" v-validate="{ checkLadegut: true}" :class="{ 'is-invalid': submitted && errors.has('Ladegut 1') }">
           <option v-bind:value="ladegut_def"></option>

          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>
        <div v-if="submitted && errors.has('Ladegut 1')" class="invalid-feedback">{{ errors.first('Ladegut 1') }}</div>

      </div>
      <em v-if="ladeliste.ladelistedata.ladegut1.ladegut.bezeichnung">
      <div class="card-body">


        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladeliste.ladelistedata.ladegut1.wagen" :key="k">

            <div class="row">
              <div class="col-5">


              <v-select class="form-control" placeholder="Suche" label="wagennummer" :options="wagendatens" v-model="input.wagendaten" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Wagendaten ' +(k+1)" v-validate="{ required: true, checkWagen: true}" :class="{ 'is-invalid': submitted && errors.has('Wagendaten '+ (k+1)) }">

                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
              </v-select>

              <div v-if="submitted && errors.has('Wagendaten '+ (k+1))" class="invalid-feedback">{{ errors.first('Wagendaten '+ (k+1)) }}</div></div>
              <div class="col-3"><input type="text" v-model="input.liter" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Liter ' +(k+1)" v-validate="{ required: true, numeric: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Liter ' +(k+1)) }"/>
                <div v-if="submitted && errors.has('Liter ' +(k+1)) " class="invalid-feedback">{{ errors.first('Liter ' +(k+1)) }}</div> </div>

                <div class="col-1"><button type="button" class="btn btn-info" @click="swap1(k, k-1)" v-show="k != 0" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↑</button></div>
                <div class="col-1"><button type="button" class="btn btn-info" @click="swap1(k, k+1)" v-show="k != ladeliste.ladelistedata.ladegut1.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↓</button></div>


              <div class="col-1"><button type="button" class="btn btn-success" @click="add1(k)" v-show="k == ladeliste.ladelistedata.ladegut1.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove1(k)" v-show="k || ( !k && ladeliste.ladelistedata.ladegut1.wagen.length > 1)" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">-</button></div>
            </div>
          </div>
        </div>
      </div>
      </em>
    </div>


    <!-- ############################################################ 2. LADEGUT ############################################################ -->

    <div class="card mb-5">
      <div class="card-header">
        <label for="adresse">Ladegut 2</label>
        <select class="form-control" v-model="ladeliste.ladelistedata.ladegut2.ladegut" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">
           <option v-bind:value="ladegut_def"></option>
          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>

      </div>
      <em v-if="ladeliste.ladelistedata.ladegut2.ladegut.bezeichnung">
      <div class="card-body">

        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladeliste.ladelistedata.ladegut2.wagen" :key="k">

            <div class="row">

              <div class="col-5">


              <v-select class="form-control" placeholder="Suche" label="wagennummer" :options="wagendatens" v-model="input.wagendaten" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Ladegut 2 Wagendaten ' +(k+1)" v-validate="{ required: true, checkWagen: true}" :class="{ 'is-invalid': submitted && errors.has('Ladegut 2 Wagendaten '+ (k+1)) }">

                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
              </v-select>


              <div v-if="submitted && errors.has('Ladegut 2 Wagendaten '+ (k+1))" class="invalid-feedback">{{ errors.first('Ladegut 2 Wagendaten '+ (k+1)) }}</div></div>
              <div class="col-3"><input type="text" v-model="input.liter" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Ladegut 2 Liter ' +(k+1)" v-validate="{ required: true, numeric: true}" class="form-control" :class="{ 'is-invalid': submitted && errors.has('Ladegut 2 Liter ' +(k+1)) }"/>
                <div v-if="submitted && errors.has('Ladegut 2 Liter ' +(k+1)) " class="invalid-feedback">{{ errors.first('Ladegut 2 Liter ' +(k+1)) }}</div> </div>

              <div class="col-1"><button type="button" class="btn btn-info" @click="swap2(k, k-1)" v-show="k != 0" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↑</button></div>
              <div class="col-1"><button type="button" class="btn btn-info" @click="swap2(k, k+1)" v-show="k != ladeliste.ladelistedata.ladegut2.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↓</button></div>



              <div class="col-1"><button type="button" class="btn btn-success" @click="add2(k)" v-show="k == ladeliste.ladelistedata.ladegut2.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove2(k)" v-show="k || ( !k && ladeliste.ladelistedata.ladegut2.wagen.length > 1)" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">-</button></div>

            </div>
          </div>
        </div>
      </div>
      </em>
    </div>


    <!-- ############################################################ 3. LADEGUT ############################################################ -->


    <div class="card mb-1">
      <div class="card-header">
        <label for="adresse">Ladegut 3</label>



        <select :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" class="form-control" v-model="ladeliste.ladelistedata.ladegut3.ladegut">
          <option v-bind:value="ladegut_def"></option>

          <option v-for="ladegut in ladegueter" v-bind:value="ladegut" v-bind:key="ladegut.id">{{ ladegut.bezeichnung }}</option>
        </select>
      </div>
      <em v-if="ladeliste.ladelistedata.ladegut3.ladegut.bezeichnung">
      <div class="card-body">

        <div class="row mb-2">
          <div class="col-5">Wagennummer</div>
          <div class="col-3">Liter / Kilogramm</div>
        </div>

        <div id=app>
          <div class="form-group" v-for="(input,k) in ladeliste.ladelistedata.ladegut3.wagen" :key="k">

            <div class="row">

              <div class="col-5">


              <v-select class="form-control" placeholder="Suche" label="wagennummer" :options="wagendatens" v-model="input.wagendaten" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Ladegut 3 Wagendaten ' +(k+1)" v-validate="{ required: true, checkWagen: true}" :class="{ 'is-invalid': submitted && errors.has('Ladegut 3 Wagendaten '+ (k+1)) }">

                <template slot="selected-option" slot-scope="data">
    <!-- HTML that describe how select should render selected items -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
  <template slot="option" slot-scope="data">
    <!-- HTML that describe how select should render items when the select is open -->
    {{ formatWagennummer(data.wagennummer) }}
  </template>
              </v-select>

              <div v-if="submitted && errors.has('Ladegut 3 Wagendaten '+ (k+1))" class="invalid-feedback">{{ errors.first('Ladegut 3 Wagendaten '+ (k+1)) }}</div></div>
              <div class="col-3"><input type="text" class="form-control" v-model="input.liter" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'" :name="'Ladegut 3 Liter ' +(k+1)" v-validate="{ required: true, numeric: true}" :class="{ 'is-invalid': submitted && errors.has('Ladegut 3 Liter ' +(k+1)) }"/>
              <div v-if="submitted && errors.has('Ladegut 3 Liter ' +(k+1)) " class="invalid-feedback">{{ errors.first('Ladegut 3 Liter ' +(k+1)) }}</div></div>

              <div class="col-1"><button type="button" class="btn btn-info" @click="swap3(k, k-1)" v-show="k != 0" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↑</button></div>
              <div class="col-1"><button type="button" class="btn btn-info" @click="swap3(k, k+1)" v-show="k != ladeliste.ladelistedata.ladegut3.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">↓</button></div>


              <div class="col-1"><button type="button" class="btn btn-success" @click="add3(k)" v-show="k == ladeliste.ladelistedata.ladegut3.wagen.length-1" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">+</button></div>
              <div class="col-1"><button type="button" class="btn btn-danger" @click="remove3(k)" v-show="k || ( !k && ladeliste.ladelistedata.ladegut3.wagen.length > 1)" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'freigegeben' || ladeliste.status == 'storniert'">-</button></div>

            </div>
          </div>
        </div>
      </div>
      </em>
    </div>

    <div class="form-group">
      <div class="row mx-1">
        <div class="col">
          <label>Als Vorlage verwenden:</label>
          <div class="form-check form-check-inline">
            <input v-on:click="ladeliste.status= 'in Bearbeitung'" class="form-check-input" id="vorlagefalse" type="radio" name="vorlage" value="false" v-model="ladeliste.vorlage"/>
            <label class="form-check-label" for="vorlagefalse">Nein</label>
          </div>

          <div class="form-check form-check-inline">
            <input v-on:click="ladeliste.status= 'Vorlage'" class="form-check-input" id="vorlagetrue" type="radio" name="vorlage" value="true" v-model="ladeliste.vorlage"/>
            <label class="form-check-label" for="vorlagetrue">Ja</label>
          </div>
        </div>
        <div class="col alert-info">
          <em v-if="nachricht">
            {{nachricht.text}}
          </em>
        </div>

        <div class="col-auto">
          <button class="btn btn-success" v-on:click="speichern()" >Zwischenspeichern</button>
        </div>
      </div>
    </div>



    <div class="card mb-2">
      <div class="card-header">
        PDF-Dokumente
      </div>
      <div class="card-body">

        <label>PDF-Vorschau</label>
        <div class="form-group">
          <button class="btn btn-secondary mx-1" v-on:click="generatePdfButton">PDF-Vorschau generieren</button>
          <button class="btn btn-link mx-1" v-on:click="viewPdfButton" :disabled="ladeliste.pdf_id == null">PDF-Vorschau anzeigen</button>
        </div>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-header">
        <label>Aktueller Status der Ladeliste: {{ladeliste.status}}</label>
        <!--<select v-model="ladeliste.status">
        <option disabled value="Abgeschlossen">Abgeschlossen</option>
        <option disabled value="in Bearbeitung">in Bearbeitung</option>
        <option disabled value="freigegeben">freigegeben</option>
        <option disabled value="storniert">storniert</option>
      </select>-->
    </div>
    <div class="card-body">
      <label>Status der Ladeliste ändern und Speichern:</label>
      <div class="form-group">
        <button class="btn btn-info mx-1" v-on:click="setStatus('in Bearbeitung')" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'storniert'" >in Bearbeitung</button>
        <button class="btn btn-info mx-1" v-on:click="setStatus('freigegeben')" :disabled="ladeliste.status == 'Abgeschlossen' || ladeliste.status == 'storniert'">freigegeben</button>
        <button class="btn btn-info mx-1" v-on:click="setStatus('storniert')" :disabled="ladeliste.status == 'Abgeschlossen'">storniert</button>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Validator } from 'vee-validate';


Validator.extend('objectNotEmpty', {
  validate: (value) => {
    console.log("in1")
    console.log(value[Object.keys(value)[0]])
    if (value[Object.keys(value)[0]]) {
      console.log("true")
      return true;
    }
    console.log("false")
    return false
  },
});

Validator.extend('checkLadegut', {
  validate: (value) => {
    console.log("in2")
    console.log(value.bezeichnung)
    if (value.bezeichnung) {
      console.log("true")
      return true;
    }
    console.log("false")
    return false
  },
});

Validator.extend('checkWagen', {
  validate: (value) => {
    console.log("in3")
    console.log(value)

    if (Object.keys(value).length) {
      console.log("true")
      return true;
    }
    console.log("#######################false")
    return false
  },
});

export default {
    data () {
        return {
          submitted: false,
            wagendaten_def: 123,
            ladegut_def: {
              bezeichnung: ''
              },


        }

    },
    computed: {
        ...mapState({

            ladeliste: state => state.ladeliste.all.items,
            pdf: state => state.ladeliste.pdf.items,

            ladegueter: state => state.ladegut.all.items,
            wagendatens: state => state.wagendaten.all.items,

            bahnhoefe: state => state.bahnhof.all.items,
            evus: state => state.evu.all.items,
            adressen: state => state.adresse.all.items,
            erklarungen: state => state.erklarung.all.items,
            nachricht: state => state.ladeliste.nachricht
        })
    },
    created () {

        this.getById(this.$route.params.id)


    },
    mounted () {
        this.getAllWagendaten(),
this.getAllLadegut(),
this.clearErrorMessages(),
        console.log('mount')
    },
    methods: {

        ...mapActions('ladegut', {getAllLadegut: 'getAll'}),
        ...mapActions('wagendaten', {getAllWagendaten: 'getAll'}),

       ...mapActions( 'ladeliste', ['getById']
        ),
        ...mapActions( 'ladeliste', ['update']
        ),
        ...mapActions( 'ladeliste', ['createPDF']
        ),
        ...mapActions( 'ladeliste', ['getPdfById']
        ),
         ...mapActions('bahnhof', {getAllBahnhof: 'getAll'}),
        ...mapActions('evu', {getAllEvu: 'getAll'}),
        ...mapActions('adresse', {getAllAdresse: 'getAll'}),
        ...mapActions('erklarung', {createErklarung: 'create'}),
        ...mapActions('erklarung', {getAllErklarung: 'getAll'}),
        speichern() {


            console.log("handlesub")

if(this.ladeliste.vorlage=='true'){
              console.log(true)
              this.ladeliste.status = 'Vorlage'
            }
            let data = this.ladeliste;





this.update(data);





        },
        clearErrorMessages(){
this.nachricht.text = ''
        },

        setStatus(s){


if(s == 'freigegeben'){
  this.submitted = true;
this.$validator.validate().then(valid => {
                if (valid) {
                  this.ladeliste.status = s;
            this.speichern()
                }
            });


} else {
this.ladeliste.status = s;
          this.speichern()
}



        },

    generatePdfButton() {

                   let data = this.ladeliste;
                  this.createPDF(data).then(this.getById(this.$route.params.id));
                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});




        },
    viewPdfButton() {


                  this.getPdfById(this.ladeliste.pdf_id).then(() => {
                    console.log('Test')
                      console.log(this.pdf)

                      const file = new Blob(
    [Uint8Array.from(this.pdf.pdf.data)],
    {type: 'application/pdf'});

                      const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);})


                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});




        },

      swap1(indexA, indexB) {
        console.log("swap1")
        console.log(this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen)
    var temp = this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen[indexA];

    this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen[indexA] = this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen[indexB];
    this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen[indexB] = temp;
     console.log(this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen)
     this.add1();
     this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen.pop()

},

        add1 () {

             this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      }),

      console.log('add1')
    },

    remove1 (index) {
      this.$store.state.ladeliste.all.items.ladelistedata.ladegut1.wagen.splice(index, 1)
    },

    swap2(indexA, indexB) {

    var temp = this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen[indexA];

    this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen[indexA] = this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen[indexB];
    this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen[indexB] = temp;

     this.add2();
     this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen.pop()

},

    add2 () {
      this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      })
      console.log(this.inputs)
    },

    remove2 (index) {
      this.$store.state.ladeliste.all.items.ladelistedata.ladegut2.wagen.splice(index, 1)
    },

    swap3(indexA, indexB) {

    var temp = this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen[indexA];

    this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen[indexA] = this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen[indexB];
    this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen[indexB] = temp;

     this.add3();
     this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen.pop()

},

    add3 () {
      this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen.push({
                                                liter: '',
                                                wagendaten: {}
      })
      console.log(this.inputs)
    },

    remove3 (index) {
      this.$store.state.ladeliste.all.items.ladelistedata.ladegut3.wagen.splice(index, 1)
    },

    formatWagennummer(wagennummer){

      if (!wagennummer) return ''
          var wagennummer2 = wagennummer.slice(0,2) + " " + wagennummer.slice(2, 4) + " " + wagennummer.slice(4, 8) + " " + wagennummer.slice(8, 11) + "-" + wagennummer.slice(11);


          return wagennummer2

        },




    }
};



</script>

<style>
@import '/node_modules/vue-datetime/dist/vue-datetime.css';


</style>
