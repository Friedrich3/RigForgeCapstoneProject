
import { calculateTotalWattage } from "../actions/BuildApi";

const initialObject = {
  buildId: null,
  name: "My Custom Build",
  cpu: null,
  motherboard: null,
  gpu: null,
  ram: null,
  storage: null,
  powersupply: null,
  case: null,
  cpucooler: null,
  maxBuildWattage: 0,
  totalPrice: 0,
  requiredWattage : null
}

const initialState = {
  data: initialObject
}


const buildReducer = (state = initialState, action) => {

  switch (action.type) {

    case "ADD_BUILD_ITEM": {
      const updatedBuild = {
        ...state.data,
        [action.payload.category]: action.payload.product,
      };
      updatedBuild.requiredWattage = calculateTotalWattage(updatedBuild);
      updatedBuild.maxBuildWattage = updatedBuild.powersupply? updatedBuild.powersupply.wattage : 0;
      localStorage.setItem("localBuild", JSON.stringify(updatedBuild)); // salvataggio
      return {
        ...state,
        data: updatedBuild,
      };
    };

    case "REMOVE_BUILD_ITEM": {
      const updatedBuild = {
        ...state.data,
        [action.payload]: null
      }
      updatedBuild.requiredWattage = calculateTotalWattage(updatedBuild);
      localStorage.setItem("localBuild", JSON.stringify(updatedBuild));
      return {
        ...state,
        data: updatedBuild
      };
    }

    case "STARTUP_LOAD_FROM_STORAGE":{
      const savedBuild = JSON.parse(localStorage.getItem("localBuild"));

        return {
          ...state,
          data: savedBuild? savedBuild : initialObject
        }
    }
    case "RESET_BUILD":
      localStorage.setItem("localBuild", JSON.stringify(initialObject));
      return {
        ...state,
        data : initialObject
      }
      
      case "CLONE_BUILD_LOCAL":{  
        const UpdatelocalBuild = {
            buildId: action.payload.userBuildId,
            name: action.payload.buildName + "- (Copia)",
            cpu: action.payload.cpu,
            motherboard: action.payload.motherboard,
            gpu: action.payload.gpu,
            ram: action.payload.ram,
            storage: action.payload.storage,
            powersupply: action.payload.powersupply,
            case: action.payload.case,
            cpucooler: action.payload.cpucooler,
            maxBuildWattage: action.payload.maxBuildWattage,
            totalPrice: action.payload.totalPrice,
            requiredWattage : action.payload.requiredWattage
          }
          localStorage.setItem("localBuild",JSON.stringify(UpdatelocalBuild));
          return {
            ...state,
            data: UpdatelocalBuild
          }
        };
      
      //SE UTENTE LOGGATO      
      case "ADD_BUILD_FROM_API":{
        localStorage.setItem("localBuild", JSON.stringify(action.payload))
          return {
            ...state,
            data: action.payload.data
          }
      }

    default:
      return state
  }


};

export default buildReducer;