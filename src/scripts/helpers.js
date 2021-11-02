export default { 
    auth() {
        var auth_data = window.localStorage.getItem('auth')
        if(auth_data)
        {
            auth_data = JSON.parse(auth_data)
            var base64Url = auth_data.data.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            var data = JSON.parse(jsonPayload);
            return data
        }

        return false
    },
    updateAuthData(new_auth_data){
        var auth_data = window.localStorage.getItem('auth')
        if(auth_data)
        {
            auth_data = JSON.parse(auth_data)
            auth_data.data = new_auth_data
            window.localStorage.setItem('auth',JSON.stringify(auth_data))
        }
    },
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    },
    distanceBetweenEarthCoordinates(coor1, coor2) {
        var earthRadius = 6371;
        
        var dLat = this.degreesToRadians(coor2.lat-coor1.lat);
        var dLon = this.degreesToRadians(coor2.lng-coor1.lng);
        
        var lat1 = this.degreesToRadians(coor1.lat);
        var lat2 = this.degreesToRadians(coor2.lat);
        
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(coor1.lat) * Math.cos(coor2.lat); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadius * 1000 * c;
    }
}