export const getBanner = () => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log('euy');
        try{
            firestore.collection("Contents").doc("Da64YkisAkE46I5wSYwj").get().then((doc) => {
                if(doc.exists){
                    console.log(doc.exists);
                    const banner = {
                        title : doc.data().Title,
                        description: doc.data().ShortDesc,
                        content: doc.data().FullContent,
                        iamgeurl: doc.data().ImageUrl
                    }
                    dispatch({
                        type: 'SET_BANNER',
                        banner: banner
                    })
                    console.log(banner)
                }
                else{
                    console.log("data tidak diterima");
                }
            });
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
