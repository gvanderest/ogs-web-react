class OGSApi {
    static setApiUrl(url) {
        console.log('OGSApi URL set to', url);
        this.API_URL = url;
    }
}

OGSApi.API_URL = 'https://api.opengamingsolutions.com';


export default OGSApi;
