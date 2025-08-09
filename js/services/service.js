const postData = async (url, data) =>{
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json(); 
   };

   //creating card: request - fetch
const getResource = async (url) =>{
        let res = await fetch(url)
        if(!res.ok){
            throw new Error(`Something is wrong with fetch ${url}, status: ${res.status}`)
        }

        return await res.json(); 
   };

export {postData}
    
