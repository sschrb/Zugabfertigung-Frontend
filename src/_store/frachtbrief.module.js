import { frachtbriefService } from '../_services';

const state = {
    all: { items: {
        frachtbriefdata : ''}
    },
    frachtbriefdata: {},
    pdf: {test: 'test'},
    nachricht: {},
    vorlagen: {}
};

const actions = {

    create({ dispatch, commit }, frachtbrief) {
        commit('createRequest');

       return frachtbriefService.create(frachtbrief)
            .then(
                //frachtbrief => commit('getAllSuccess', frachtbrief),
                error => commit('getAllFailure', error)
            );
    },

    createPDF({ dispatch, commit }, frachtbrief) {
        commit('createRequest');

       frachtbriefService.update(frachtbrief)
            .then(
                frachtbrief => {commit('updateSuccess', frachtbrief)},
                error => commit('getAllFailure', error),
                
            ).then(

        frachtbriefService.createPDF(frachtbrief)
            .then(
                frachtbrief => commit('createPDFSuccess', frachtbrief),
                error => commit('createPDFFailure', error)
            ));
    },

    getAllStatus({ commit }, status) {
        commit('getAllRequest');

        frachtbriefService.getAllStatus(status)
            .then(
                ladeliste => commit('getAllStatusSuccess', ladeliste),
                error => commit('getAllFailure', error)
            );
    },

    createFinalPDF({ dispatch, commit }, frachtbrief) {
        commit('createRequest');

       frachtbriefService.update(frachtbrief)
            .then(
                frachtbrief => {commit('updateSuccess', frachtbrief)},
                error => commit('getAllFailure', error),
                
            ).then(

        frachtbriefService.createFinalPDF(frachtbrief)
            .then(
                frachtbrief => commit('createPDFSuccess', frachtbrief),
                error => commit('createPDFFailure', error)
            ));
    },

    update({ commit }, frachtbrief) {
        commit('getAllRequest');

        frachtbriefService.update(frachtbrief)
            .then(
                frachtbrief => {commit('updateSuccess', frachtbrief)},
                error => commit('getAllFailure', error),
                
            );
    },


    getAll({ commit }) {
        commit('getAllRequest');

        frachtbriefService.getAll()
            .then(
                frachtbrief => commit('getAllSuccess', frachtbrief),
                error => commit('getAllFailure', error)
            );
    },

    getAllVorlagen({ commit }) {
        commit('getAllRequest');

        frachtbriefService.getAllVorlagen()
            .then(
                frachtbrief => commit('getAllVorlagenSuccess', frachtbrief),
                error => commit('getAllFailure', error)
            );
    },

    getById({ commit }, id) {
        commit('getAllRequest');

        frachtbriefService.getById(id)
            .then(
                frachtbrief => {commit('getAllSuccessD', frachtbrief);
            return frachtbrief},
                error => commit('getAllFailure', error)
            );
    },

    getPdfById({ commit }, id) {
       // commit('getAllRequest');
console.log(1)
      return  frachtbriefService.getPdfById(id)
            .then(
                pdf => commit('getAllPdfSuccess', pdf),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        frachtbriefService.delete(id)
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
    
    createPDFFailure(state, error) {
        
        state.nachricht = {text: 'PDF Fehler: '+error};

    },
    createPDFSuccess(state, ladeliste) {
        console.log('createPDFSuccess');
        console.log(ladeliste)
        state.all = { items: ladeliste };
        state.nachricht = {text: 'PDF generiert'};

    },
    getAllStatusSuccess(state, frachtbrief) {
        
        console.log(frachtbrief)
        state.all = { items: frachtbrief };
    },
    getAllVorlagenSuccess(state, frachtbrief) {
        
        console.log(frachtbrief)
        state.vorlagen = { items: frachtbrief };
    },
    getAllSuccess(state, frachtbrief) {
        console.log('pdf');
        console.log(frachtbrief)
        state.all = { items: frachtbrief };
    },
    updateSuccess(state, frachtbrief) {
       console.log('updateasu')
        state.all = { items: frachtbrief };
        state.nachricht = {text: 'gespeichert'};
    },
    getAllSuccessD(state, frachtbrief) {
        console.log('DDD');
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

export const frachtbrief = {
    namespaced: true,
    state,
    actions,
    mutations
};
