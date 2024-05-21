import { $authHost, $host } from './index'

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const removeOneType = async (typeId) => {
    const { data } = await $authHost.delete('api/type/' + typeId)
    return data

}
export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}
export const removeOneBrand = async (brandId) => {
    const { data } = await $authHost.delete('api/brand/' + brandId)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}
export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}
export const deleteDevice = async (id) => {
    const { data } = await $authHost.delete('api/device/' + id)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

export const addToBasket = async (deviceId) => {
    const { data } = await $authHost.post('api/basket', deviceId)
    return data
}


export const getBasket = async () => {
    const { data } = await $authHost.get('api/basket')
    return data
}

export const removeFromBasket = async (deviceId) => {
    const { data } = await $authHost.delete('api/basket/' + deviceId)
    return data

}

export const removeTheBasket = async () => {
    const { data } = await $authHost.delete('api/basket' )
    return data

}