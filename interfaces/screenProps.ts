export default interface screenProps <T>{
    //TODO: Give correct type for setScreenData function.
    setScreenNameAndProps: any, // this function must take a screen name and props to be sent to the new screen.
    propsObj: T
}