<template>
  <div>
    <h3>Datentabellen bearbeiten</h3>

    <!-- ############################################################ WAGENDATEN ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="wagendatenview = !wagendatenview">
        Wagendaten
      </div>

      <em v-if="wagendatenview">
        <div class="card-body">
          <Wagendaten />
        </div>
      </em>
    </div>

    <!-- ############################################################ Benutzer ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="benutzerview = !benutzerview">
        Benutzer
      </div>

      <em v-if="benutzerview">
        <div class="card-body">
          <Users />
        </div>
      </em>
    </div>


    <!-- ############################################################ ADRESSEN ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="adresseview = !adresseview">
        Adressen
      </div>

      <em v-if="adresseview">
        <div class="card-body">
          <Adresse />
        </div>
      </em>
    </div>

    <!-- ############################################################ EVU ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="evuview = !evuview">
        EVU
      </div>

      <em v-if="evuview">
        <div class="card-body">
          <Evu />
        </div>
      </em>
    </div>

    <!-- ############################################################ BAHNHOF ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="bahnhofview = !bahnhofview">
        Bahnhöfe
      </div>

      <em v-if="bahnhofview">
        <div class="card-body">
          <Bahnhof />
        </div>
      </em>
    </div>

    <!-- ############################################################ LADEGUT ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="ladegutview = !ladegutview">
        Ladegut
      </div>

      <em v-if="ladegutview">
        <div class="card-body">
          <Ladegut />
        </div>
      </em>
    </div>

    <!-- ############################################################ ERKLÄRUNGEN ############################################################ -->
    <div class="card mb-2">
      <div class="card-header" v-on:click="erklarungview = !erklarungview">
        Erklärungen
      </div>

      <em v-if="erklarungview">
        <div class="card-body">
          <Erklarung />
        </div>
      </em>
    </div>



  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";


export default {

    data () {
        return {
            bahnhofview: false,
            adresseview: false,
            erklarungview: false,
            evuview: false,
            wagendatenview: false,
            ladegutview: false,
            benutzerview: false,
            frachtbrief: {
                adresse: '',
                adresseview: false,
                wagenummer: '',
                bahnhof: '',
                laendercode: '',
                land: ''

            },
            adressen: [
              {
                id: "1",
                name: "neu anlegen"
            },

             {
                id: "2",
                name: "Teststr. 7, 12345 Dorf"
            },
            {
                id: "3",
                name: "Weg. 5, 12345 Stadt"
            }
            ]

        }
    },
computed: {
        ...mapState('frachtbrief', ['status'])
    },
    methods: {
        ...mapActions('frachtbrief', ['create']),
        handleSubmit(e) {
            //this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.create(this.frachtbrief);
                    this.$router.push('/history');
                }
            });
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
