import { GetBearerToken } from "./AccountApi";

export const GetAllComponentBackoffice= async(category) => {
    try {
        let url = `https://localhost:7099/api/${category}/backoffice`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching details");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
    }

//SUPPORT TABLE GET
export const GetAllManufacturers= async(category = "") => {
    try {
        let url = `https://localhost:7099/api/Support/manufacturers?category=${category}`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching manufacturers");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
export const GetAllSockets= async() => {
    try {
        let url = `https://localhost:7099/api/Support/socket`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching sockets");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
export const GetAllRamType= async() => {
    try {
        let url = `https://localhost:7099/api/Support/ramtype`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching ramtypes");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
export const GetAllFormFactor= async() => {
    try {
        let url = `https://localhost:7099/api/Support/formfactor`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching formFactors");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}
export const GetAllStorageType= async() => {
    try {
        let url = `https://localhost:7099/api/Support/storagetype`;
        const response = await fetch(url,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            }
        })
        if(!response.ok){
            throw new Error("Error While Fetching StorageTypes");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
}





// ACTIONS ADD EDIT DELETE
export const AddNewComponent= async(category, formdata) => {
    try {
        let url = `https://localhost:7099/api/${category}`;
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
            body: formdata
        })
        if(!response.ok){
            throw new Error(`Error While Adding new ${category}`);
        }
        // const data = await response.json();
        // return data;
        
    } catch (error) {
        console.log(error)
    }
    }
export const EditComponent= async(category,id, formdata) => {
        try {
            let url = `https://localhost:7099/api/${category}?id=${id}`;
            const response = await fetch(url,{
                method:"PUT",
                headers:{
                    "Authorization": "Bearer " + GetBearerToken()
                },
                body: formdata
            })
            if(!response.ok){
                throw new Error(`Error While Editing a ${category}`);
            }
            // const data = await response.json();
            // return data;
            
        } catch (error) {
            console.log(error)
        }
    }

    export const DeleteComponent= async(category,id) => {
            try {
                let url = `https://localhost:7099/api/${category}?id=${id}`;
                const response = await fetch(url,{
                    method:"DELETE",
                    headers:{
                        "Authorization": "Bearer " + GetBearerToken()
                    },
                })
                if(!response.ok){
                    throw new Error(`Error While Deleting ${category}`);
                }
                // const data = await response.json();
                // return data;
                
            } catch (error) {
                console.log(error)
            }
        }