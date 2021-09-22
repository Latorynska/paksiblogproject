
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

export const TambahContent = (data) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        
        firestore.collection('Contents').add({
            Title: data.title,
            ShortDesc: data.short,
            FullContent: data.content,
            createdAt: new Date()
        }).then((docref) => {
            uploadimage(data.file, docref.id);
        }).catch((err) => {
            console.log(err.message);
            dispatch({
                type: 'SET_ERROR',
                err: err
            });
        })
    }
}