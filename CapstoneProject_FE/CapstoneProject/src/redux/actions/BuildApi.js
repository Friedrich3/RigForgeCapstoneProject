import { GetBearerToken } from "./AccountApi"


export const AddComponent = (category, product) => {
    return async (dispatch) => {
        dispatch({
            type: "ADD_BUILD_ITEM",
            payload: { category, product }
        })

    }
}

export const RemoveComponent = (category) => {
    return async (dispatch) => {
        dispatch({
            type: "REMOVE_BUILD_ITEM",
            payload: category
        });


    }
}

export const calculateTotalWattage = (build) => {
    let total = 0;
    if (build.cpu) total += build.cpu.tdp || 0;
    if (build.gpu) total += build.gpu.tdp || 0;
    if (build.cpucooler) total += build.cpucooler.wattage || 0;
  
    // Aggiungi un margine di sicurezza del 10%
    total = Math.ceil(total * 1.1);
  
    return total;
  };

export const CloneBuildLocal = (build) =>{
    return async (dispatch) => {
        dispatch({
            type: "CLONE_BUILD_LOCAL",
            payload: build
        });
}
}


//SE USER LOGGATO

export const StartupLoadFromApi = () => {
    return async (dispatch) => {
        try {
            const url = "https://localhost:7099/api/Build";
            const response = await fetch(url, {
                method: "GET",
                headers:{
                    "Authorization": "Bearer " + GetBearerToken()
                }
            });
            if (!response.ok) {
                throw new Error("Error While Fetching active build");
            }
            const data = await response.json();
            dispatch({
                type: "ADD_BUILD_FROM_API",
                payload: data
            })

        } catch (error) {
            console.log("Error", error)
        }
    }
}

export const NewBuild =  ()=>{
    return async (dispatch) => {
    try {
        const url = "https://localhost:7099/api/Build/new";
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + GetBearerToken()
            }
        });
        if(!response.ok){
            throw new Error("Error while creating a new build")
        }
        dispatch(StartupLoadFromApi())

        
    } catch (error) {
        console.log("Error", error)
    }
}
}

export const AddComponentApi = async (productId, category) =>{
    const component = {componentId:productId, componentType:category}
    try {
        const url = "https://localhost:7099/api/Build/editComp";
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + GetBearerToken()
            },
            body: JSON.stringify(component)
        })
        if(!response.ok){
            throw new Error("Error While Adding new component");
        }
    } catch (error) {
        console.log("Error", error)
    }
}

export const RemoveComponentApi = (category) =>{
    return async (dispatch) => {
    try {
        const url = `https://localhost:7099/api/Build/${category}`;
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + GetBearerToken()
            },
            body: category
        })
        if(!response.ok){
            throw new Error(`Error While removing ${category} component`);
        }
        dispatch(StartupLoadFromApi())

    } catch (error) {
        console.log("Error", error)
    }
}
}


export const ResetBuildFromApi = () => {
    return async (dispatch) => {
        const url= "https://localhost:7099/api/Build/reset";
        try {
            const response = await fetch(url,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GetBearerToken()
                },
            })
            if(response.ok){
                dispatch({type:"RESET_BUILD"})
            }


        } catch (error) {
            console.log("Error", error)
        }
    }
}

export const DeleteBuild = async (id) => {
    const url = `https://localhost:7099/api/Build/delete?id=${id}`
    try {
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
        });
        if(!response.ok){throw new Error("Error while deleting build ")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}

export const RenameBuild = async (id , newname) => {
    const url = `https://localhost:7099/api/Build/editname?id=${id}`
    try {
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + GetBearerToken()
            },
            body: JSON.stringify(newname)
        });
        if(!response.ok){throw new Error("Error while renaming build ")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}

export const SetActiveBuild = async (id) => {
    const url = `https://localhost:7099/api/Build/setactive?id=${id}`
    try {
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
        });
        if(!response.ok){throw new Error("Error while setting build to active")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}

export const CloneBuildAuthorize = async (buildId) =>{
    const url = `https://localhost:7099/api/Build/clone?buildId=${buildId}`
    try {
        const response = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
        });
        if(!response.ok){
            throw new Error("Error while cloning a build")
        }
        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}

export const ExportToText = (build) =>{
    const url = `${window.location.origin}/products/` //http://localhost:5173/products/cpu/ee865c82-f43d-4a0c-abbc-1f0f810d6227
    return `Build Name: ${build.name || 'Custom Build'}

**CPU**: ${build.cpu?.name || 'N/A'} ${build.cpu?.name? `[${url}cpu/${build.cpu?.id}]` : "" }
**Motherboard**: ${build.motherboard?.name || 'N/A'} ${build.motherboard.name? `[${url}motherboard/${build.motherboard?.id}]` : "" }
**GPU**: ${build.gpu?.name || 'N/A'} ${build.gpu.name? `[${url}gpu/${build.gpu?.id}]` : "" }
**RAM**: ${build.ram?.name || 'N/A'} ${build.ram.name? `[${url}ram/${build.ram?.id}]` : "" }
**Storage**: ${build.storage?.name || 'N/A'} ${build.storage.name? `[${url}storage/${build.storage?.id}]` : "" }
**CPU Cooler**: ${build.cpucooler?.name || 'N/A'} ${build.cpucooler.name? `[${url}cpucooler/${build.cpucooler?.id}]` : "" }
**Case**: ${build.case?.name || 'N/A'} ${build.case.name? `[${url}case/${build.case?.id}]` : "" }
**Power Supply**: ${build.powersupply?.name || 'N/A'} ${build.powersupply.name? `[${url}powersupply/${build.powersupply?.id}]` : "" }

Total Price: €${build.totalPrice?.toFixed(2) || 'N/A'}
Created: ${new Date(build.createdAt).toLocaleDateString()}`
}