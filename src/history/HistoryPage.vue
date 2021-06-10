<template>
  <div>
    <div class="card mb-2">
      <div class="card-header">
        <h3>Frachtbriefe</h3>
        <div class="row">
          <div class="col">
            <label class="mr-2">Statusfilter:</label>
          </div>

          <div>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false" v-on:click="getAllFrachtbriefStatus('in Bearbeitung')" >in Bearbeitung</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" v-on:click="getAllFrachtbriefStatus('freigegeben')"  >freigegeben</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" v-on:click="getAllFrachtbriefStatus('storniert')"  >storniert</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile2" role="tab" aria-controls="pills-profile2" aria-selected="false" v-on:click="getAllFrachtbriefStatus('Abgeschlossen')" >abgeschlossen</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact2" role="tab" aria-controls="pills-contact2" aria-selected="false" v-on:click="getAllFrachtbrief();" >alles</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card-body">
        <em v-if="users.loading">Loading...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <!--<ul v-if="frachtbrief.items">
        <li v-for="fbrief in frachtbrief.items" :key="fbrief.id">
        {{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.') + ' ' + fbrief.frachtbriefdata.refnr + ' ' + fbrief.status}}
        <span v-if="fbrief.deleting"><em> - Deleting...</em></span>
        <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
        <span v-else> - <a class="text-danger"><router-link v-bind:to="'/frachtbrief/' + fbrief.id">Anzeigen</router-link></a></span>
      </li>
    </ul>-->

    <table class="table table-striped table-sm">
      <thead class="thead">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Erstellt am</th>
          <th scope="col">Status</th>
          <th scope="col">Aktion</th>
        </tr>
      </thead>
      <tbody v-if="frachtbrief.items">
        <tr v-for="fbrief in frachtbrief.items" :key="fbrief.id">
          <td scope="row">{{fbrief.frachtbriefdata.refnr}}</td>
          <td>{{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.')}}</td>
          <td>{{fbrief.status}}</td>
          <td><span v-if="fbrief.deleting"><em> - Deleting...</em></span>
            <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
            <span v-else><a class="text-danger"><router-link v-bind:to="'/frachtbrief/' + fbrief.id">Anzeigen</router-link></a></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>







    <div class="card mb-2">
      <div class="card-header">
        <h3>Ladelisten</h3>
        <div class="row">
          <div class="col">
            <label class="mr-2">Statusfilter:</label>
          </div>

          <div>
          <!--<button class="btn btn-secondary mb-1" v-on:click="getAllLadelisteStatus('in Bearbeitung')" >in Bearbeitung</button>
          <button class="btn btn-secondary mb-1" v-on:click="getAllLadelisteStatus('freigegeben')"  >freigegeben</button>
          <button class="btn btn-secondary mb-1" v-on:click="getAllLadelisteStatus('storniert')"  >storniert</button>
          <button class="btn btn-secondary mb-1" v-on:click="getAllLadelisteStatus('Abgeschlossen')" >abgeschlossen</button>
          <button class="btn btn-secondary mb-1" v-on:click="getAllLadeliste();" >Alles</button> -->

          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false" v-on:click="getAllLadelisteStatus('in Bearbeitung')" >in Bearbeitung</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" v-on:click="getAllLadelisteStatus('freigegeben')"  >freigegeben</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" v-on:click="getAllLadelisteStatus('storniert')"  >storniert</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile2" role="tab" aria-controls="pills-profile2" aria-selected="false" v-on:click="getAllLadelisteStatus('Abgeschlossen')" >abgeschlossen</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact2" role="tab" aria-controls="pills-contact2" aria-selected="false" v-on:click="getAllLadeliste();" >alles</a>
            </li>
          </ul>
        </div>

      </div>
    </div>

      <div class="card-body">
        <em v-if="users.loading">Loading...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <em v-if="ladeliste.items[0]">
        <!--<ul v-if="ladeliste.items">
          <li v-for="fbrief in ladeliste.items" :key="fbrief.id">

             {{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.') + ' ' + fbrief.ladelistedata.refnr + ' ' + fbrief.status}}
            <span v-if="fbrief.deleting"><em> - Deleting...</em></span>
            <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
            <span v-else> - <a class="text-danger"><router-link v-bind:to="'/ladeliste/' + fbrief.id">Anzeigen</router-link></a></span>
          </li>
        </ul>-->
        </em>

        <table class="table table-striped table-sm">
          <thead class="thead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Erstellt am</th>
              <th scope="col">Status</th>
              <th scope="col">Aktion</th>
            </tr>
          </thead>
          <tbody v-if="ladeliste.items">
            <tr v-for="fbrief in ladeliste.items" :key="fbrief.id">
              <td scope="row">{{fbrief.ladelistedata.refnr}}</td>
              <td>{{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.')}}</td>
              <td>{{fbrief.status}}</td>
              <td><span v-if="fbrief.deleting"><em> - Deleting...</em></span>
              <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
              <span v-else><a class="text-danger"><router-link v-bind:to="'/ladeliste/' + fbrief.id">Anzeigen</router-link></a></span></td>
              </tr>
            </tbody>
          </table>


      </div>
    </div>





    <div class="card mb-2">
      <div class="card-header">
        <h3>Frachtbrief Vorlagen</h3>
      </div>

      <div class="card-body">
        <em v-if="users.loading">Loading...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <!--<ul v-if="vorlagen.items">
          <li v-for="fbrief in vorlagen.items" :key="fbrief.id">
            {{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.') + ' ' + fbrief.frachtbriefdata.refnr}}

            <span v-if="fbrief.deleting"><em> - Deleting...</em></span>
            <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
            <span v-else> - <a class="text-danger"><router-link v-bind:to="'/frachtbrief/' + fbrief.id">Anzeigen</router-link></a></span>
          </li>
        </ul>-->


        <table class="table table-striped table-sm">
          <thead class="thead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Erstellt am</th>
              <th scope="col">Aktion</th>
            </tr>
          </thead>
          <tbody v-if="vorlagen.items">
            <tr v-for="fbrief in vorlagen.items" :key="fbrief.id">
              <td scope="row">{{fbrief.frachtbriefdata.refnr}}</td>
              <td>{{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.')}}</td>
              <td><span v-if="fbrief.deleting"><em> - Deleting...</em></span>
              <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
              <span v-else><a class="text-danger"><router-link v-bind:to="'/frachtbrief/' + fbrief.id">Anzeigen</router-link></a></span></td>
              </tr>
            </tbody>
          </table>

      </div>
    </div>



        <div class="card mb-2">
      <div class="card-header">
        <h3>Ladeliste Vorlagen</h3>
      </div>

      <div class="card-body">
        <em v-if="users.loading">Loading...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <!--<ul v-if="vorlagen.items">
          <li v-for="fbrief in vorlagen.items" :key="fbrief.id">
            {{fbrief.createdAt.slice(0, 10).split('-').reverse().join('.') + ' ' + fbrief.frachtbriefdata.refnr}}

            <span v-if="fbrief.deleting"><em> - Deleting...</em></span>
            <span v-else-if="fbrief.deleteError" class="text-danger"> - ERROR: {{fbrief.deleteError}}</span>
            <span v-else> - <a class="text-danger"><router-link v-bind:to="'/frachtbrief/' + fbrief.id">Anzeigen</router-link></a></span>
          </li>
        </ul>-->


        <table class="table table-striped table-sm">
          <thead class="thead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Erstellt am</th>
              <th scope="col">Aktion</th>
            </tr>
          </thead>
          <tbody v-if="vorlagenLadeliste.items">
            <tr v-for="liste in vorlagenLadeliste.items" :key="liste.id">
              <td scope="row">{{liste.ladelistedata.refnr}}</td>
              <td>{{liste.createdAt.slice(0, 10).split('-').reverse().join('.')}}</td>
              <td><span v-if="liste.deleting"><em> - Deleting...</em></span>
              <span v-else-if="liste.deleteError" class="text-danger"> - ERROR: {{liste.deleteError}}</span>
              <span v-else><a class="text-danger"><router-link v-bind:to="'/ladeliste/' + liste.id">Anzeigen</router-link></a></span></td>
              </tr>
            </tbody>
          </table>

      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'


export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            frachtbrief: state => state.frachtbrief.all,
            vorlagen: state => state.frachtbrief.vorlagen,
            vorlagenLadeliste: state => state.ladeliste.vorlagen,
            ladeliste: state => state.ladeliste.all
        })
    },
    created () {
        this.getAllUsers();
        //this.getAllFrachtbrief();
        //this.getAllLadeliste();
        this.getAllLadelisteStatus("in Bearbeitung");
        this.getAllFrachtbriefStatus("in Bearbeitung");
        this.getAllVorlagenFrachtbrief();
        this.getAllVorlagenLadeliste();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),


       ...mapActions( 'frachtbrief', {
            getAllFrachtbrief: 'getAll',
            getAllVorlagenFrachtbrief: 'getAllVorlagen',
            getAllFrachtbriefStatus: 'getAllStatus',
            deleteFrachtbrief: 'delete'
        }),

        ...mapActions( 'ladeliste', {
            getAllLadeliste: 'getAll',
            getAllVorlagenLadeliste: 'getAllVorlagen',
            getAllLadelisteStatus: 'getAllStatus'

        })
    }
};
</script>
