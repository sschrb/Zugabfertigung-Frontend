import { evuService } from '../_services';

const state = {
    all: {},
    message: false,
    nachricht: {},
};

const actions = {

     create({ dispatch, commit }, evu) {
        //commit('createRequest');
        return new Promise(function(resolve, reject) {
            //run all your methodA code here
            evuService.create(evu)
            .then(
                evu => commit('createSuccess', evu),
                error => commit('createError', error),
                resolve('MethodA finished')
            );
     
           
         });

       
    },

    getAll({ commit }) {
        commit('getAllRequest');

        evuService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        evuService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },

    update({ commit }, evu) {
        commit('getAllRequest');

        evuService.update(evu)
            .then(
                evu => commit('updateSuccess', evu),
                error => commit('getAllFailure', error),
                
            );
    },
};

const mutations = {
    createSuccess(state, bahnhoefe) {
        state.all = { items: bahnhoefe };
        state.message =  true ;
        state.nachricht = {text: bahnhoefe.message};
        
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

export const evu = {
    namespaced: true,
    state,
    actions,
    mutations
};
