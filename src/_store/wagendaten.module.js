import { wagendatenService } from '../_services';

const state = {
    all: {},
    message: false,
    nachricht: {},
};

const actions = {

     create({ dispatch, commit }, wagendaten) {
        //commit('createRequest');
        return new Promise(function(resolve, reject) {
            //run all your methodA code here
            wagendatenService.create(wagendaten)
            .then(
                wagendaten => commit('createSuccess', wagendaten),
                error => commit('createError', error),
                resolve('MethodA finished')
            );
     
           
         });

       
    },

    getAll({ commit }) {
        commit('getAllRequest');

        wagendatenService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        wagendatenService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    },

    update({ commit }, wagendaten) {
        commit('getAllRequest');

        wagendatenService.update(wagendaten)
            .then(
                wagendaten => commit('updateSuccess', wagendaten),
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
        state.nachricht = {text: 'gel??scht'};
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


export const wagendaten = {
    namespaced: true,
    state,
    actions,
    mutations
};
