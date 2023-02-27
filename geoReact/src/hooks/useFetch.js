import React, { useEffect, useState } from 'react'

const useFetch = (initialUrl, initialOptions) => {

    const [url, setUrl] = useState(initialUrl);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const reRender = () => {
        setRefresh(!refresh)
    }

    async function fetchData() {
        try {
            const res = await fetch(url, options);
            const json = await res.json();
            setData(json);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        setError(undefined);
        fetchData();
    }, [url, options,refresh]);

    return { data, error, loading, setUrl, setOptions,reRender };
    
}

export default useFetch