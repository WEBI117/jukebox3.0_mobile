import screenNavigationData from "./screenNavigationData"

export default interface screenProps <T>{
    //TODO: Give correct type for setScreenData function.
    setScreenNameAndProps: React.Dispatch<React.SetStateAction<screenNavigationData | undefined>>
    , // this function must take a screen name and props to be sent to the new screen.
    propsObj: T
}