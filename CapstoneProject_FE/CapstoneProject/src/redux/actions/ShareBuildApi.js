import { GetBearerToken } from "./AccountApi";

export const ShareNewBuild = async (buildId , formdata)=>{
    try {
        const url = `https://localhost:7099/api/SharedBuild?buildId=${buildId}`;
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
            body : formdata
        });
        if(!response.ok){
            throw new Error("Error while sharing a build")
        }
        else
        return true;

    } catch (error) {
        console.log("Error", error);
        return false;
    }
}

export const GetAllSharedBuilds= async() => {
    try {
        let url = `https://localhost:7099/api/SharedBuild`;
        const response = await fetch(url,{
            method:"GET"
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

export const GetShareBuildDetail= async(buildId) => {
    try {
        let url = `https://localhost:7099/api/SharedBuild/details?buildId=${buildId}`;
        const response = await fetch(url,{
            method:"GET"
        })
        if(!response.ok){
            throw new Error("Error While Fetching details");
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const RemoveOwnShare = async (buildId) =>{
    const url = `https://localhost:7099/api/SharedBuild/mybuild?id=${buildId}`
    try {
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
        });
        if(!response.ok){throw new Error("Error while removing a shared build ")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}
export const RemoveShareByAdmin = async (buildId) =>{
    const url = `https://localhost:7099/api/SharedBuild/admin?id=${buildId}`
    try {
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Authorization": "Bearer " + GetBearerToken()
            },
        });
        if(!response.ok){throw new Error("Error while forcing removal by Admin")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}
export const SetOrRemoveFeatured = async (buildId, bool ) =>{
    const url = `https://localhost:7099/api/SharedBuild/featured?id=${buildId}`
    try {
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + GetBearerToken()
            },
            body: JSON.stringify(bool)
        });
        if(!response.ok){throw new Error("Error while removing a shared build ")}

        return true;
    } catch (error) {
        console.log("Error", error)
        return false;
    }
}