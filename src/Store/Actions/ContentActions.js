
export const setError = (err) => {
    return (dispatch) => {
        dispatch({type: 'SET_ERROR', err: err})
    }
}
export const getSingleContent = (CID) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        try{
            await firestore.collection("Contents").doc(CID).get().then((doc) => {
                if(doc.exists){
                    dispatch({
                        type: 'SET_CONTENT',
                        content: doc.data()
                    })
                    //console.log(doc.data());
                }
                else{
                    console.log("data tidak diterima");
                }
                
            })
            // const snapshot = await firebase.firestore().collection('Contents').get();
            // console.log(snapshot.docs.map(doc => doc.data()));
        }
        catch(err){
            console.log(err);
            dispatch({
                type: 'SET_ERROR',
                err: err.message
            })
        }
    }
}
export const uploadimage = (file, CID) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        try{
            
            const firestore = getFirestore();
            const firebase = getFirebase();
            let filepath = `Images/Content/${CID}_image.jpeg`;
            const Storageref = firebase.storage().ref(filepath);

            const uploadtask = Storageref.put(file);

            uploadtask.on('state_changed',console.log,console.error, () => {
                Storageref.getDownloadURL().then((url) => {
                    firestore.collection('Contents').doc(CID).update({ImageUrl: url})
                })
            });
        }
        catch(err){
            dispatch({
                type: 'SET_ERROR',
                err: err.message
            })
        }
    }
}

export const updateContent = (CID,data) => {
    return async (dispatch,getstate, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const finaldata = {
            Title: data.title,
            FullContent: data.content,
            ShortDesc: data.short,
            updatedAt: new Date()
        }
        console.log("euy");
        dispatch({type: 'SET_LOADING', loading: true});
        try{
            await firestore.collection("Contents").doc(CID).update(finaldata).then((res) => {
                dispatch({type: 'UPDATE_CONTENT', status: true});
            })
            dispatch({type: 'SET_LOADING', loading: false});
        }
        catch(err) {
            console.log(err);
            dispatch({type: 'SET_LOADING', loading: false});
            dispatch({type: 'SET_ERROR',err:err.message});
        }
    }
}

export const TambahContent = (data) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        
        await firestore.collection('Contents').add({
            Title: data.title,
            ShortDesc: data.short,
            FullContent: data.content,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type: 'ADD_CONTENT',
                status: true
            })
        }).catch((err) => {
            console.log(err.message);
            dispatch({
                type: 'SET_ERROR',
                err: err
            });
        })
        // firestore.collection('Contents').add({
        //     Title: data.title,
        //     ShortDesc: data.short,
        //     FullContent: data.content,
        //     createdAt: new Date()
        // }).then((docref) => {
        //     uploadimage(data.file, docref.id);
        // }).catch((err) => {
        //     console.log(err.message);
        //     dispatch({
        //         type: 'SET_ERROR',
        //         err: err
        //     });
        // })
    }
}