import { screenNames } from "../constants"
import queueScreenProps from "../screens/queue/propsInterface"
import welcomeScreenProps from "../screens/welcome/propsInterface"
import searchScreenProps from "../screens/search/propsInterface"
import serverConnectionScreenProps from "../screens/server_connection/propsInterface"
import screenNavigationData from "../interfaces/screenNavigationData"

type screenPropTypes = queueScreenProps & welcomeScreenProps & searchScreenProps & serverConnectionScreenProps

class navigationHelper{
    contextDictionary: Map<string, any>
    constructor(){
        this.contextDictionary = new Map()
        Object.values(screenNames).map((value) => {
            this.contextDictionary.set(value,{})
        })
    }
    getContextDictionaryKeys(){
        return Array.from(this.contextDictionary.keys())
    }
    saveContext(screenname:string,context:any){
        try{
            var keys = this.getContextDictionaryKeys()
            if(keys.includes(screenname)){
                this.contextDictionary.set(screenname,context)
                return true
            }
        }
        catch(err){
            console.log('error')
        }
        return false
    }
    getContext(screenname: string){
        try{
            return this.contextDictionary.get(screenname)
        }
        catch(err){
            console.log('error')
        }
    }
    printContexts(){
        var keys = this.getContextDictionaryKeys()
        keys.map((key) => {
            console.log(key, this.contextDictionary.get(key))
        })
    }
    // TODO: Remove any type for argument navigateScreenProps
    navigate(currentScreenName: string, contextToSave: any, navigateScreenName: string, navigateScreenProps: any, navigationFunction: React.Dispatch<React.SetStateAction<screenNavigationData | undefined>>){
        try{
            var contextSaved = this.saveContext(currentScreenName,contextToSave)
            if(contextSaved){
                var previousContextForNavigationScreen = this.getContext(navigateScreenName)
                var temp = {...previousContextForNavigationScreen}
                Object.keys(navigateScreenProps).map((key) => {
                    temp[key] = navigateScreenProps[key]
                })
                var navigationDataObject: screenNavigationData = {
                    screenName: navigateScreenName,
                    props: temp
                }
                navigationFunction(navigationDataObject)
            }
            else{
                console.log("context not saved")
            }
        }
        catch(err){
            console.log(err)
        }

    }
}

export default new navigationHelper()