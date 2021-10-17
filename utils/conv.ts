

export function asArray<T>(data : T | T[]){
    if(Array.isArray(data)){
        return data
    }else{
        return [data]
    }
}


export function asRegexp(data : string | RegExp){
    if(typeof data == "string"){
        return new RegExp(`^${data}$`)
    }else{
        return data
    }
}