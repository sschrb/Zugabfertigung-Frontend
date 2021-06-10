<template>
    <div>








 <form @submit.prevent="handleSubmit">

<label for="adresse">Absender</label>



<select class="form-control" v-model="frachtbrief.adresseform" required @change="changeAdress">
        <option selected>Adresse auswählen</option>
        <option v-for="adresse in adressen" v-bind:key="adresse.name" >{{ adresse.name }}</option>
    </select>


<em v-if="this.frachtbrief.adresseview">
            <div class="form-group">
                
                <label for="adresse">Neue Adresse anlegen</label>
                <input type="text" v-model="frachtbrief.adresse" class="form-control"/>
                
            </div>
</em>
            <div class="form-group">
                <label for="wagenummer">Wagennummer</label>
                <input type="text" v-model="frachtbrief.wagenummer" class="form-control"/>
                
            </div>

            <div class="form-group">
                <label for="wagenummer">Bahnhof</label>
                <input type="text" v-model="frachtbrief.bahnhof" class="form-control"/>
                
            </div>

             <div class="form-group">
                <label for="wagenummer">Bahnhofscode</label>
                <input type="text" v-model="frachtbrief.bahnhofscode" @change="bahnhofscodeChange" class="form-control"/>
                
            </div>

      

            <div class="form-group">
                <label for="wagenummer">Land</label>
                <input type="text" v-model="frachtbrief.land" class="form-control"/>
                
            </div>

            <div class="form-group">
                <label for="wagenummer">Ländercode</label>
                <input type="text" v-model="frachtbrief.laendercode" class="form-control"/>
                
            </div>

            <div class="form-group">
                <button class="btn btn-primary" >Speichern</button>
                
              
            </div>



</form>








        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import "vue-select/dist/vue-select.css";


export default {

    data () {
        return {
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