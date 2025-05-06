export const normalizeImagePath = (imagePath) => {
    imagePath.replace(/\\/g, '/');
    return imagePath = `http://localhost:5059/${imagePath}`
}



export const GetallProducts = async (build, category, page, pageSize, sortBy, sortDir,search,minPrice,maxPrice,manufacturer,socket,coolertype,ramtype,formfactor,minFrequency,maxFrequency,minCapacity,maxCapacity,storagetype,minStorage,maxStorage,modular,minWattage,maxWattage,color,glasspanel) => {
    try {
        let url = `https://localhost:7099/api/${category}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&search=${search}`;
        if (minPrice) {
            url += `&minPrice=${minPrice}`;
            }
        if (maxPrice) {
            url += `&maxPrice=${maxPrice}`;
            }
        if(manufacturer){
            url += `&Manufacturer=${manufacturer}`
        }
        if(socket){
            url += `&Socket=${socket}`
        }
        if(coolertype){
            url += `&Type=${coolertype}`
        }
        if(ramtype){
            url += `&RamType=${ramtype}`
        }
        if(formfactor){
            url += `&FormFactor=${formfactor}`
        }
        if (minFrequency) {
            url += `&MinSpeed=${minFrequency}`;
            }
        if (maxFrequency) {
            url += `&MaxSpeed=${maxFrequency}`;
            }
        if (minCapacity) {
            url += `&MinCapacity=${minCapacity}`;
            }
        if (maxCapacity) {
            url += `&MaxCapacity=${maxCapacity}`;
            }
        if (storagetype) {
            url += `&storagetype=${storagetype}`;
            }
        if (minStorage) {
            url += `&MinStorage=${minStorage}`;
            }
        if (maxStorage) {
            url += `&MaxStorage=${maxStorage}`;
            }
        if (modular) {
            url += `&Modular=${modular}`;
            }
        if (minWattage) {
            url += `&MinWattage=${minWattage}`;
            }
        if (maxWattage) {
            url += `&MaxWattage=${maxWattage}`;
            }
        if (color) {
            url += `&Color=${color}`;
            }   
        if (glasspanel) {
            url += `&GlassPanel=${glasspanel}`;
            }       
        switch (category) {
            case "cpu":
                if(build.motherboard?.id){
                    url += `&CkSocket=${build.motherboard.id}`;
                }
                break;
            case "cpucooler":
                if(build.cpu?.id){
                    url += `&CkSocketCpu=${build.cpu.id}`;
                }
                if(build.motherboard?.id){
                    url += `&CkSocketMobo=${build.motherboard.id}`;
                }
                break;
            case "motherboard":
                if(build.cpu?.id){
                    url += `&CkSocket=${build.cpu.id}`;
                }
                if(build.ram?.id){
                    url += `&CkRamType=${build.ram.id}`;
                }
                if(build.case?.id){
                    url += `&CkFormFactor=${build.case.id}`;
                }
                break;
            case "ram":
                if(build.motherboard?.id){
                    url += `&CkRamType=${build.motherboard.id}`;
                }
                break;
            case "gpu":
                break;
            case "storage":
                break;
            case "case":
                if(build.motherboard?.id){
                    url += `&CkFormFactor=${build.motherboard.id}`;
                }
                break;
            case "powersupply":
                if(build.requiredWattage != null){
                    url += `&CkWattage=${build.requiredWattage}`;
                }
                break;
            default:
                console.warn("Categoria non gestita:", category);
                throw new Error("Invalid Category")
        }

        const response = await fetch(url,{
            method:"GET",
        })
        if(!response.ok){
            throw new Error("Error While Fetching products");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}


export const GetSingleProduct= async(category, id) => {
try {
    let url = `https://localhost:7099/api/${category}/detail?id=${id}`;
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