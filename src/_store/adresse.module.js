import { adresseService } from '../_services';

const state = {
    all: {},
    message: false,
    nachricht: {},
};

const actions = {

     create({ dispatch, commit }, adresse) {
        //commit('createRequest');
        return new Promise(function(resolve, reject) {
            //run all your methodA code here
            adresseService.create(adresse)
            .then(
                adresse => commit('createSuccess', adresse),
                error => commit('createError', error),
                resolve('MethodA finished')
            );
     
           
         });

       
    },

    getAll({ commit }) {
        commit('getAllRequest');

        adresseService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        adresseService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },

    update({ commit }, adresse) {
        commit('getAllRequest');

        adresseService.update(adresse)
            .then(
                adresse => commit('updateSuccess', adresse),
                error => commit('getAllFailure', error),
                
            );
    },
};

const mutations = {
    createSuccess(state, bahnhoefe) {
        state.all = { items: bahnhoefe };
        state.message =  true ;
        state.nachricht = {text: bahnhoefe.message};
        console.log('adresse ')
    },
    createError(state, error){
alert(error);
    },
    updateSuccess(state, bahnhoefe) {
        state.all = { items: bahnhoefe };
        state.message =  true ;
        state.nachricht = {text: 'gespeichert'};
    },
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, bahnhoefe) {
        state.all = { items: bahnhoefe };
        state.message =  false ;
        
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
        state.all.items = state.all.items.filter(user => user.id !== id);
        state.message =  true ;
        state.nachricht = {text: 'gelöscht'};
    },
    deleteFailure(state, { id, error }) {
        alert(error);
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

export const adresse = {
    namespaced: true,
    state,
    actions,
    mutations
};
