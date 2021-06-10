<template>
    <div>
       








 
        
<em v-if="brief.loading">Loading ...</em>
<em v-if="frachtbrief">
<form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="adresse">Absender</label>
                <input type="text" v-model="frachtbrief.adresse" value="default value" class="form-control" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>
            <div class="form-group">
                <label for="wagenummer">Wagennummer</label>
                <input type="text" v-model="frachtbrief.wagenummer" class="form-control" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>

            <div class="form-group">
                <label for="wagenummer">Bahnhof</label>
                <input type="text" v-model="frachtbrief.bahnhof" class="form-control" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>

             <div class="form-group">
                <label for="wagenummer">Bahnhofscode</label>
                <input type="text" v-model="frachtbrief.bahnhofscode" class="form-control" @change="bahnhofscodeChange" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>

      

            <div class="form-group">
                <label for="wagenummer">Land</label>
                <input type="text" v-model="frachtbrief.land" class="form-control" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>

            <div class="form-group">
                <label for="wagenummer">Ländercode</label>
                <input type="text" v-model="frachtbrief.laendercode" class="form-control" :disabled="frachtbrief.pdf_id != null"/>
                
            </div>

            <div class="form-group">
                <button class="btn btn-primary" :disabled="frachtbrief.pdf_id != null" >Update</button>
              
            </div>
            <em v-if="frachtbrief.pdf_id == null"><button class="btn btn-primary" v-on:click="generatePdfButton">PDF generieren</button></em>
            <em v-if="frachtbrief.pdf_id != null"><button class="btn btn-primary" v-on:click="viewPdfButton">PDF anzeigen</button></em>



</form>
</em>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            test1: {
            loading: null
            },
            
        }

    },
    computed: {
        ...mapState({
            
            frachtbrief: state => state.frachtbrief.all.items,
            brief: state => state.frachtbrief.all,
            pdf: state => state.frachtbrief.pdf.items
        })
    },
    created () {
        
        this.getById(this.$route.params.id)
        
        
    },
    mounted() {

       
  
},
    methods: {
        
        
        
       ...mapActions( 'frachtbrief', ['getById']
        ),
        ...mapActions( 'frachtbrief', ['update']
        ),
        ...mapActions( 'frachtbrief', ['createPDF']
        ),
        ...mapActions( 'frachtbrief', ['getPdfById']
        ),
        handleSubmit(e) {
            
                    this.update(this.frachtbrief);
              
        },
    generatePdfButton() {
            
                   
                  this.createPDF(this.frachtbrief).then(this.getById(this.$route.params.id));
                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});
                   
                   
                  
              
        },
    viewPdfButton() {
            
                   
                  this.getPdfById(this.frachtbrief.pdf_id).then(() => {
                      console.log(this.pdf.pdf)

                      const file = new Blob(
    [Uint8Array.from(this.pdf.pdf.data)], 
    {type: 'application/pdf'});
                      
                      const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);})
                  
                  
                   //.then((reslut) => {this.getById(this.$route.params.id);console.log('test')});
                   
                   
                  
              
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