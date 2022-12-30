import axios from 'axios'

class httphelper {

    static async getQueueFromServer(url: string) {
        try {
            var resp = await axios({
                method: 'get',
                url: url + "/queue"
            })
            if (resp.status === 200) {
                return resp.data.queue
            }
        }
        catch (err) {
            console.log("Error occured with search request")
            console.log(err)
        }
        return []
    }

    static async getSearchResultFromServer(searchstring: string, serverurl: string) {
        try {
            var result = await axios({
                method: 'get',
                url: serverurl + '/search',
                params: {
                    // TODO: sanitize searchtext before sending to server.
                    searchstring: searchstring
                }
            })
            return result.data
        }
        catch (err) {
            console.log("Error occured with search request")
            console.log(err)
        }
        return []
    }

    static convertStringToURL(str: string) {
        return "http://" + str
    }
}

export default httphelper