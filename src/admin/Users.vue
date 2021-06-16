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
        



    }
};
</script>
