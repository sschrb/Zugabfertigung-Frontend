import { ladelisteService } from '../_services';

const state = {
    all: { items: {
        ladelistedata : ''}
    },
    ladelistedata: {},
    nachricht: false,
    pdf: {test: 'test'},
    status: '',
    vorlagen: {}
    
};

const actions = {

    create({ dispatch, commit }, ladeliste) {
        commit('createRequest');

       return ladelisteService.create(ladeliste)
            .then(
                //ladeliste => commit('getAllSuccess', ladeliste),
                error => commit('getAllFailure', error)
            );
    },

    createPDF({ dispatch, commit }, ladeliste) {
        commit('createRequest');

       ladelisteService.update(ladeliste)
            .then(
                ladeliste => {commit('updateSuccess', ladeliste)},
                error => commit('getAllFailure', error),
                
            ).then(

        ladelisteService.createPDF(ladeliste)
            .then(
                ladeliste => commit('createPDFSuccess', ladeliste),
                error => commit('getAllFailure', error)
            ));
    },

    update({ commit }, ladeliste) {
        commit('getAllRequest');

        ladelisteService.update(ladeliste)
            .then(
                ladeliste => {commit('updateSuccess', ladeliste)},
                error => commit('getAllFailure', error),
                
            );
    },

    updateO({ commit }, ladeliste) {
        commit('getAllRequest');

        ladelisteService.update(ladeliste)
            .then(
                ladeliste => {commit('updateSuccessO', ladeliste)},
                error => commit('getAllFailure', error),
                
            );
    },


    getAll({ commit }) {
        commit('getAllRequest');

        ladelisteService.getAll()
            .then(
                ladeliste => commit('getAllSuccess', ladeliste),
                error => commit('getAllFailure', error)
            );
    },

    getAllVorlagen({ commit }) {
        commit('getAllRequest');

        ladelisteService.getAllVorlagen()
            .then(
                frachtbrief => commit('getAllVorlagenSuccess', frachtbrief),
                error => commit('getAllFailure', error)
            );
    },

    getAllStatus({ commit }, status) {
        commit('getAllRequest');

        ladelisteService.getAllStatus(status)
            .then(
                ladeliste => commit('getAllStatusSuccess', ladeliste),
                error => commit('getAllFailure', error)
            );
    },

    getById({ commit }, id) {
        commit('getAllRequest');

        ladelisteService.getById(id)
            .then(
                ladeliste => commit('getAllSuccessD', ladeliste),
                error => commit('getAllFailure', error)
            );
    },

    getPdfById({ commit }, id) {
       // commit('getAllRequest');
console.log(1)
      return  ladelisteService.getPdfById(id)
            .then(
                pdf => commit('getAllPdfSuccess', pdf),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        ladelisteService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    createRequest(state) {
        state.all = { loading: true };
    },
    getAllRequest(state) {
        console.log('loading true')
        state.all = { loading: true };
    },
    
    createPDFSuccess(state, ladeliste) {
        console.log('createPDFSuccess');
        console.log(ladeliste)
        state.all = { items: ladeliste };
        state.nachricht = {text: 'PDF generiert'};

    },
    getAllSuccess(state, ladeliste) {
        console.log('getAllSuccess');
        console.log(ladeliste)
        state.all = { items: ladeliste };
    },
    getAllVorlagenSuccess(state, ladeliste) {
        
        console.log(ladeliste)
        state.vorlagen = { items: ladeliste };
    },
    updateSuccess(state, ladeliste) {
       
        state.all = { items: ladeliste };
        state.nachricht = {text: 'gespeichert'};
    },
    updateSuccessO(state, ladeliste) {
       
        
    },
    getAllSuccessD(state, ladeliste) {
        console.log('DDD');
        console.log(ladeliste)
        state.all = { items: ladeliste };
    },
    getAllStatusSuccess(state, frachtbrief) {
        
        console.log(frachtbrief)
        state.all = { items: frachtbrief };
    },
    getAllPdfSuccess(state, pdf) {
        console.log(pdf);
        console.log(state.pdf)
        state.pdf = { items: pdf };
        console.log(state.pdf)
        state.nachricht = {text: 'PDF runtergeladen'};
        
    },
    getAllFailure(state, error) {
        
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const ladeliste = {
    namespaced: true,
    state,
    actions,
    mutations
};
