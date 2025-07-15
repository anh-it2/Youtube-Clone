export const API_KEY = 'AIzaSyDdfJ1W4rTErlCD7xXeQiIXVFD4jf0LaOg';

export const value_converter = (value) =>{
    if(value >= 1000000){
        return Math.floor(value/1000000) + 'M';
    } else if(value  >= 1000){
        return Math.floor(value/1000) + 'K'
    } else{
        return value
    }
}