import axios from 'axios'

class httphelper {

    static async getQueueFromServer(url: string) {
        var resp = await axios({
            method: 'get',
            url: url + "/queue"
        })
        if (resp.status === 200) {
            return resp.data.queue
        }
        else {
            return []
        }
    }

    static async getSearchResultFromServer(searchstring: string, serverurl: string) {

        try {
            console.log('sendingRequest')
            var result = await axios({
                method: 'get',
                url: serverurl + 'search',
                params: {
                    // TODO: sanitize searchtext before sending to server.
                    searchstring: searchstring
                }
            })
            return result
        }
        catch (err) {
            console.log("Error occured with search request")
            console.log(err)
        }
        return null
    }
    
    static convertStringToURL(str: string){
        return "http://" + str
    }
}

export default httphelper